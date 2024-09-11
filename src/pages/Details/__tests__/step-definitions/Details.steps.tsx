import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import DetailsView from "../../DetailsView";
import PokemonImg from "../../../../components/PokemonImg";

const mockedProps = {
    id: 1,
    name: "bulbasaur",
    abilities: [{ ability: { name: "overgrow" } }],
    types: [{ type: { name: "grass" } }],
    stats: [{ stat: { name: "speed" }, base_stat: 45 }],
};

const feature = loadFeature(
 "./src/pages/Details/__tests__/features/Details-scenario.feature"
);

defineFeature(feature, (test) => {
 let DetailsViewWrapper: ShallowWrapper;
 let mockFetch: jest.Mock;

 beforeEach(() => {
  jest.resetModules();
 });

 test("DetailsView", ({ given, when, then }) => {
  given("I am on the DetailsView page", () => {
    const mockResponse = {
      ok: true,
      status: 200,
      statusText: "OK",
      headers: {
        get: () => "application/json",
      },
      redirected: false,
      type: "basic",
      url: "",
      clone: jest.fn(),
      body: null,
      bodyUsed: false,
      json: () => Promise.resolve(mockedProps),
      text: jest.fn(),
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
    };

    mockFetch = jest.fn(() => Promise.resolve(mockResponse as any));
    global.fetch = mockFetch;
  });

  when("the user requests Pokémon data from the API", async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
    const data = await response.json();

    DetailsViewWrapper = shallow(<DetailsView {...data} />);
  });

  then("User will see the Pokémon's image", () => {
    const de = shallow(
      <PokemonImg maxSize={500} id={1} />
    );
    expect(de.find("img").exists()).toBe(true);
  });

  then("User will see the Pokémon's name", () => {
    const nameElement = DetailsViewWrapper.find('[data-test-id="pokemon-name"]');
    expect(nameElement.text()).toBe("bulbasaur");
  });

  then("User will see the Pokémon's ability", () => {
    const abilityElement = DetailsViewWrapper.find(".ability").first();
    expect(abilityElement.text()).toContain("Ability");
  });

  then("User will see the Pokémon's types", () => {
    const typesElement = DetailsViewWrapper.find(".types").first();
    expect(typesElement.text()).toContain("Types");
  });

  then("User will see the Pokémon's stats", () => {
    const statsElement = DetailsViewWrapper.find(".stats").first();
    expect(statsElement.text()).toContain("Stats");
  });
 });
});

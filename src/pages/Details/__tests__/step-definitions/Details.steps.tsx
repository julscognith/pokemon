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
 let DetailsViewErrorWrapper: ShallowWrapper;
 let mockFetch: jest.Mock;
 let mockFetchError: jest.Mock;

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
      json: () => Promise.resolve(mockedProps),
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

 test("User views Pokémon details and API fails", ({ given, when, then }) => {
  given("I am on the DetailsView page with error data", () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: "Not Found",
      headers: {
        get: () => "application/json",
      },
      json: () => Promise.resolve({ error: "Error: Pokémon not found.", loading: false }),

    };

    mockFetchError = jest.fn(() => Promise.resolve(mockResponse as any));
    global.fetch = mockFetchError;
  });

  when("the user requests Pokémon data from the API", async () => {
    let data;
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/9999"); 
      data = await response.json();
    } catch (error) {
      data = { error: "Error: Pokémon not found.", loading: false }
    }
    console.log(data, "Asdasdasdashdklasss")
    DetailsViewErrorWrapper = shallow(<DetailsView {...data} />);
    DetailsViewErrorWrapper.setState({ loading: false, error: "Error: Pokémon not found." }); 
  });

  then("User will see an error message", () => {
    const errorMessage = DetailsViewErrorWrapper.find(".error-message").first();
    console.log(DetailsViewErrorWrapper.debug() ,errorMessage.debug())
    expect(errorMessage.text()).toBe("Error: Pokémon not found.");
  });
});
});

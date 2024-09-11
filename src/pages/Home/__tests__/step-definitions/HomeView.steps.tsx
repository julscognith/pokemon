/* eslint-disable jest/no-mocks-import */
import React from "react";
import { mount, shallow } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import HomeView from "../../HomeView";
import "../../../../__mocks__/intersectionObserverMock";
import { MemoryRouter } from "react-router-dom";
import PokemonCard from "../../../../components/PokemonCard";

const mockedProps = {};

const feature = loadFeature(
 "./src/pages/Home/__tests__/features/HomeView-scenario.feature"
);

defineFeature(feature, (test) => {
 let wrapper: any;

 test("Fetches data from the Pokémon API", ({ given, when, then }) => {
  let data: any;
  let mockFetch: jest.Mock;

  given("the Pokémon API returns a successful response", () => {
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
    json: () =>
     Promise.resolve({
      results: [
       { name: "bulbasaur", id: "1" },
       { name: "ivysaur", id: "2" },
      ],
     }),
    text: jest.fn(),
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
   };
   mockFetch = jest.fn(() => Promise.resolve(mockResponse as any));
   global.fetch = mockFetch;
  });

  when("the user requests Pokémon data from the API", async () => {
   const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=2&offset=0"
   );
   data = await response.json();
  });

  then("the user should receive a list of 2 Pokémon", () => {
   expect(data.results.length).toBe(2);
   expect(data.results[0].name).toBe("bulbasaur");
   expect(data.results[1].name).toBe("ivysaur");
  });
 });

 test("API returns an error", ({ given, when, then }) => {
  let error: any;
  let mockFetch: jest.Mock;

  given("the Pokémon API returns an error response", () => {
   mockFetch = jest.fn(() =>
    Promise.reject(new Error("Failed to fetch Pokémon data"))
   );
   global.fetch = mockFetch;
  });

  when("the user requests Pokémon data from the API", async () => {
   try {
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=2&offset=0");
   } catch (err) {
    error = err;
   }
  });

  then("the user should see an error message", () => {
   expect(error).toBeDefined();
   expect(error.message).toBe("Failed to fetch Pokémon data");
  });
 });

 test("Displaying a list of Pokemon", ({ given, then }) => {
  given("I am on the Pokemon list page", () => {
   wrapper = mount(
    <MemoryRouter>
     <HomeView {...mockedProps} />
    </MemoryRouter>
   );

   wrapper.setState({
    loading: false,
   });

   wrapper.update();
  });

  then("I should see a load more button", async () => {
   const loadMore = wrapper.find("#loadmore").first();
   expect(loadMore.text()).toContain("Load More");
  });

  then("I should see a list of Pokemon with name bulbasaur", () => {
   const pokemonNames = shallow(
    <PokemonCard
     name="bulbasaur"
     id={1}
    />
   );
   const heading = pokemonNames.find(".pokemon-name").first().text();
   expect(heading).toBe("bulbasaur");
  });
 });
});

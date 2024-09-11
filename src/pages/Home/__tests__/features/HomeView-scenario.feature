Feature: Pokemon List Page

  Scenario: Fetches data from the Pokémon API
    Given the Pokémon API returns a successful response
    When the user requests Pokémon data from the API
    Then the user should receive a list of 2 Pokémon

  Scenario: API returns an error
    Given the Pokémon API returns an error response
    When the user requests Pokémon data from the API
    Then the user should see an error message

  Scenario: Displaying a list of Pokemon
    Given I am on the Pokemon list page
    Then I should see a load more button
    Then I should see a list of Pokemon with name bulbasaur
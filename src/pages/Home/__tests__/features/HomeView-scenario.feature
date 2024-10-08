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

  Scenario: Successful Pokemon Search
    Given I am on the Pokemon search page
    When I enter "bulbasaur" into the search field
    Then I should see a list of Pokemon that includes Bulbasaur

  Scenario: No Results Found
    Given I am on the Pokemon search page
    When I enter "XYZ" into the search field and click the search button
    Then I should see a message indicating "No results found"
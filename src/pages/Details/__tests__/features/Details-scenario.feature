Feature: Display Pokémon details on the DetailsView

  Scenario: DetailsView
    Given I am on the DetailsView page
    When the user requests Pokémon data from the API
    Then User will see the Pokémon's image
    Then User will see the Pokémon's name
    Then User will see the Pokémon's ability
    Then User will see the Pokémon's types
    Then User will see the Pokémon's stats
Feature: User API

  Scenario: Create a new user
    Given I have user creation data
    When I send a POST request to "/users" with the user creation data
    Then I should receive a response with status code 200
    Then I should receive the response containing the created user information
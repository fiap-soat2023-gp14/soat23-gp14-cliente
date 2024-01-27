Feature: User API

  Scenario: Create a new user successfully 
    Given I have user creation data
    When I send a POST request to "/users" with the user creation data
    Then I should receive a response with status code 200
    Then I should receive the response containing the created user information

  Scenario: Not allow to create an user that already exists
    Given I have an user creation data with already registered CPF
    When I send a POST request to "/users" with the user creation data
    Then I should receive a response with status code 409 and message "User already exists"

  Scenario: List all users
    Given I dont have any filter param
    When I send a GET request to "/users" without filter param
    Then I should receive a list off all users

  Scenario: List users with when pass CPF as param
    Given I have a CPF param
    When I send a GET request to "/users" with a CPF filter
    Then I should receive the respective filtered user

  Scenario: Get user by existent identifier
    Given I have an ID to search an User
    When I sent a GET request to "/users" with an existent identifier
    Then I should receive the respective user

  Scenario Outline: Get user by non-existent identifier
    Given I have a non-existent ID to search an User
    When I sent a GET request to "/users" with a non-existent identifier
    Then I should receive a response with status code 404 and message "User with id <id> not found"

  Examples:
  | id |

  | 3255ca79-f972-452b-8a90-9690f510b3gc |

  Scenario: Update successfully an User
    Given I have an existent User and I want to alter some data
    When I sent a PUT request to "/users" with an existent identifier and the data to update
    Then I should receive a response with status code 200 for successfully update


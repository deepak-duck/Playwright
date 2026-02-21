Feature: Automation Exercise - User Account Management (TC001 to TC005)

  Background:
    Given I am on the Automation Exercise home page

  Scenario: TC001 Register User
    When I register a new user with name "RegisterTC001"
    Then I should be logged in as "RegisterTC001"
    When I delete my account
    Then account should be deleted successfully

  Scenario: TC002 Login User with correct email and password
    When I register a new user with name "LoginTC002"
    And I logout
    When I login with the registered email and password
    Then I should be logged in as "LoginTC002"
    When I delete my account
    Then account should be deleted successfully

  Scenario: TC003 Login User with incorrect email and password
    When I try to login with email "wrong@yopmail.com" and password "wrongpass"
    Then I should see error "Your email or password is incorrect!"

  Scenario: TC004 Logout User
    When I register a new user with name "LogoutTC004"
    And I logout
    Then I should see Signup / Login link

  Scenario: TC005 Register User with existing email
    When I register a new user with name "ExistingTC005"
    And I logout
    When I try to register again with the same email
    Then I should see error "Email Address already exist!"
Feature: Login

  As a admin
  I want to login
  So that I can admin sth

  Background: a site is running
    Given I have already created an account

  Scenario: Login after register
    Given I have already in login page
    When I login with my username and password
    Then I am able to access admin page

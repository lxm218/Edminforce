Feature: Login

  As a admin
  I want to login
  So that I can admin sth

  Background: a site is running
    Given I am on the site
    And I am not logined
  Scenario: Login using exist user info
    When I input my login info and submit
    Then I am able to access admin page

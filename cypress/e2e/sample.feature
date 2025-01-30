@regression
Feature: Sample feature
Background: 
      Given open sample application
@smoke @sanity
Scenario: Home Page
    When I log in as Followings
      |userName| password |
      |mercury| mercury |
    Then click on submit button
    And Screen should display 'Login Successfully'
   

Scenario: verifying the title 
    When I log in as Followings
      |userName| password |
      |mercury| mercury |
    Then click on submit button
    And Screen should display 'Login Successfully'
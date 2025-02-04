Feature: Automation Practice
Background:
Given Open Automation Practice application

  Scenario: Selecting Radio Buttons
    When I select Radio1
    Then Radio1 should be selected
    Then Radio2 and Radio3 should not be selected

  Scenario: Selecting Radio2 and verifying others are unselected
    When I select Radio2
    Then Radio2 should be selected
   Then Radio1 and Radio3 should not be selected

  Scenario: Selecting Radio3 and verifying others are unselected
    When I select Radio3
    Then Radio3 should be selected
   Then Radio2 and Radio1 should not be selected
 
Scenario: Searching query in dynamic dropDown
    When I search for "India" in query
    Then Check for "India" in dropdown and click on it
    Then Validate the search field

Scenario: Handling dropDrown with select 
    When I click on "option1" in dropdown
    Then Input should contain the "option1"

Scenario: Handling select with checkboxes
 When I select the first and last checkbox
 Then Both should be selected
 Then Middle box should not be selected

 Scenario: Verifying the alert message on screen
  When I type "Abhinav" and click on alert button
  Then The screen should alert me with msg "Hello Abhinav, share this practice page and share your knowledge"
  Then I type "Abhinav" and click on confirm button
  Then The screen should ask confirmation as "Hello Abhinav, Are you sure you want to confirm?"

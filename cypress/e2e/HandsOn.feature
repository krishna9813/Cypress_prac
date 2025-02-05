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
 
  Scenario: Handling the visibility of an Element 
   When I Click on hide button 
   Then input field should not be visible
   Then I Click on Show button input is visible

  Scenario: Switch to a new tab and validate content
    When I click the button to open a new tab
    Then I switch to the new tab and validate the url
    Then Validate the content in the new tab

  Scenario: Handling mouseover events 
     When I move the mouse over the MouseOver button
      Then I validate the visibility of the element below
      Then I move the cursor away and validate the visibility of the element again
  
  Scenario: Count rows and columns and read data from a table
      When I visit the page with the table
      Then I count the number of rows and columns in the table
      Then I read the data from all rows and columns
      Then I visit the table with fixed header 
      Then read through each cell data
      Then validate Total amount collected

  Scenario: Handling elements inside Iframe
      When I enter into Iframe Example
      Then I click on courses to check the validation
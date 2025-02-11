Feature: MakeMyTrip automation


Scenario: Search for one-way flights

     Given open makemytrip application
     When selecting and validating the departure city
    Then entering and validating the destination city
    Then Click on the departure and select the given date 
    Then Choose the no of passengers and the class
    Then Including any special fares and clicking on search


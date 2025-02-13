Feature:Online Shopping automation

Background:
Given Open flipkart applications

Scenario:Search for mobiles 
  When I search for "Mobiles" and click enter
  Then corresponding results should be displayed 
  Then I should be able to filter based on configurations
  Then I should be able to paginate to find the gadget
  Then Add the item to cart and navigate back to home page
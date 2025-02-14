Feature:Online Shopping automation

Background:
Given Open flipkart applications

Scenario: Search for Mobiles and Electronics
    When I search for "Mobiles" and click Enter
    Then I should see the relevant search results displayed
    Then I should be able to apply filters based on various configurations
    Then I should be able to paginate through the results to find the desired product
    Then I should add the item to the cart and navigate back to the homepage
    When I search for "Electronics" and press Enter
    Then I should see a page displaying electronics-related results
    Then I should be able to filter the results by the "Home & Kitchen" category and validate it
    Then I should paginate through the results to find the specific product and click on it
    Then I should add the product to the cart and return to the homepage
    Then Validate the items added to the cart 
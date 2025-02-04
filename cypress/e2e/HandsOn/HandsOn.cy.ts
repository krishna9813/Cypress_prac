import { Given, When,Then, Before} from '@badeball/cypress-cucumber-preprocessor';
Before(()=>{

    cy.reload()
})
Given('Open Automation Practice application',()=>{
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
})
/////  ****** RADIO BUTTONS *******
When('I select Radio1',()=>{
    cy.get("input[value='radio1']").check()
})
Then('Radio1 should be selected',()=>{
    cy.get("input[value='radio1']")
    .should('be.checked')
})
Then('Radio2 and Radio3 should not be selected',()=>{
    cy.get("input[value='radio2']")
    .should('be.not.checked')
    cy.get("input[value='radio3']")
    .should('be.not.checked')
})
When('I select Radio2',()=>{
    cy.get("input[value='radio2']").check()
})
Then('Radio2 should be selected',()=>{
    cy.get("input[value='radio2']")
    .should('be.checked')
})
Then('Radio1 and Radio3 should not be selected',()=>{
    cy.get("input[value='radio1']")
    .should('be.not.checked')
    cy.get("input[value='radio3']")
    .should('be.not.checked')
})
When('I select Radio3',()=>{
    cy.get("input[value='radio3']").check()
})
Then('Radio3 should be selected',()=>{
    cy.get("input[value='radio3']")
    .should('be.checked')
})
Then('Radio2 and Radio1 should not be selected',()=>{
    cy.get("input[value='radio1']")
    .should('be.not.checked')
    cy.get("input[value='radio2']")
    .should('be.not.checked')
})
  ////// **** dROP DOWNS *******
   ///  Dynamic dropdown
When('I search for {string} in query',(country:string)=>{
    cy.get("input[class='inputs ui-autocomplete-input']").type(country)
})

Then('Check for {string} in dropdown and click on it',(country:string)=>{
    cy.get("ul[class='ui-menu ui-widget ui-widget-content ui-autocomplete ui-front']>li>div")
    .each(($el,index,$list)=>{
        if($el.text()==country){
            cy.wrap($el).click()
        }
    })
})
Then('Validate the search field',()=>{
    cy.get("input[class='inputs ui-autocomplete-input']")
    .should('have.value','India')
})
  /// Simple select

When('I click on {string} in dropdown',(ref:string)=>{
    cy.get('#dropdown-class-example').select(ref)
})
Then('Input should contain the {string}',(ref:string)=>{
    cy.get('#dropdown-class-example')
    .should('have.value',ref)
})
 
////// ****** checkboxes ********

When('I select the first and last checkbox',()=>{
    cy.get('#checkbox-example>fieldset>label>input').first().check()
    cy.get('#checkbox-example>fieldset>label>input').last().check()
})
Then('Both should be selected',()=>{
    cy.get('#checkBoxOption1').should('be.checked')
    cy.get('#checkBoxOption3').should('be.checked')
})
Then('Middle box should not be selected',()=>{
    cy.get('#checkBoxOption2').should('be.not.checked')
})
 
////// ************** ALERTS JS *************

When('I type {string} and click on alert button',(name:string)=>{
    cy.get(".pull-right>input[id='name']").type(name)
    cy.get(".pull-right>input[id='alertbtn']").click()
})
Then('The screen should alert me with msg {string}',(alertMsg:string)=>{
    cy.on('window:alert',(t)=>{
        expect(t).to.include(alertMsg)
    })
})
Then('I type {string} and click on confirm button',(name:string)=>{
    cy.get(".pull-right>input[id='name']").type(name)
    cy.get(".pull-right>input[id='confirmbtn']").click()
})
Then('The screen should ask confirmation as {string}',(confirmMsg:string)=>{
    cy.on("window:confirm",(t)=>{
        cy.log(t)
        expect(t).to.include(confirmMsg)

    })
    cy.on('window:confirm',()=>false);
})
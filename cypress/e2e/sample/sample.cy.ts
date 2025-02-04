import { Given, When,Then, Before} from '@badeball/cypress-cucumber-preprocessor';
Before(()=>{

    cy.wait(1000)
})
after(()=>{
    cy.wait(1000)
})

Given("open sample application",()=>{
    cy.visit("https://demo.guru99.com/test/newtours")
})

//When("provide valid username and password",()=>{
 //  cy.get("input[name='userName']").type('mercury')
 //  cy.get("input[name='password']").type('mercury')
//})
When("I log in as Followings",(datatable:any)=>{
    datatable.hashes().forEach(element => {
        cy.get("input[name='userName']").type(element.userName)
        cy.get("input[name='password']").type(element.password)
    });
})

Then("click on submit button",()=>{
    cy.get("[name=submit]").click()
   
})
Then("Screen should display {string}",(title)=>{
    cy.get('table>tbody>tr>td>h3').should('have.text',title)

})
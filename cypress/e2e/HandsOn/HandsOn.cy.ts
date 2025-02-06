import 'cypress-iframe';
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
    cy.get('#checkbox-example input').first().check()
    cy.get('#checkbox-example input').last().check()
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
////// ****** BUTTON TOOGLE VISIBILITY VALIDATION ******
When('I Click on hide button',()=>{
    cy.get("input#hide-textbox").click()
})
Then('input field should not be visible',()=>{
    cy.get("#displayed-text").should('not.be.visible')
})
Then('I Click on Show button input is visible',()=>{
  cy.get("input#show-textbox").click()
    cy.get("#displayed-text").should('be.visible')
})

//////******   VALIDATION OF SWITCHING NEW TABS
When('I click the button to open a new tab',()=>{
    cy.get('.switch-tab~#opentab').invoke('removeAttr','target').click()
   
})
Then('I switch to the new tab and validate the url',()=>{
    cy.url().should('include','https://www.qaclickacademy.com/')
})
Then('Validate the content in the new tab',()=>{
    cy.reload()
  cy.get(".header-contact li:nth-child(2) span").should('have.text','info@qaclickacademy.com')
})

// /////// *** MOUSE OVER EFFECTS *******
// When('I move the mouse over the MouseOver button',()=>{
//     cy.get('#mousehover').scrollIntoView().trigger('mouseover').click()
// })
// Then('I validate the visibility of the element below',()=>{
//     cy.get('.mouse-hover-content>a').should('be.visible')
// })
// Then('I move the cursor away and validate the visibility of the element again',()=>{

//     cy.get('#mousehover').trigger('mouseout')
//     cy.get('.mouse-hover-content').should('not.be.visible')
// })

////// **********  TABLE HANDLING WITH DIFF HEADER *******

When('I visit the page with the table',()=>{
    cy.get('body>div:nth-child(5)>.left-align legend').should('have.text','Web Table Example')
})
Then('I count the number of rows and columns in the table',()=>{
    cy.get('.left-align #product tr').should('have.length','11') // rows
    cy.get('.left-align #product tr>th').should('have.length','3') // cols
})
Then('I read the data from all rows and columns', () => {
    cy.get('.left-align #product tr').each(($row, rowIndex, $rows) => {
      cy.wrap($row).within(() => {
        cy.get('th, td').each(($col, colIndex, $cols) => {
          cy.log($col.text());
        });
      });
    });
  });
  Then('I visit the table with fixed header',()=>{
    cy.get('.right-align>fieldset:nth-child(2)>legend').should('have.text','Web Table Fixed header')
  })
  Then('read through each cell data', () => {
    cy.get(".tableFixHead tbody>tr").each(($row, rowIndex, $rows) => {
      cy.wrap($row).within(() => {
        cy.get("td").each(($col, colIndex, $cols) => {
          cy.log(`Row ${rowIndex + 1}, Column ${colIndex + 1}: ${$col.text()}`);
        });
      });
    });
  });
  Then('validate Total amount collected', () => {
  let totalAmount = 0;

  cy.get(".tableFixHead tbody>tr").each(($row, rowIndex, $rows) => {
    cy.wrap($row).within(() => {
      cy.get("td").each(($col, colIndex, $cols) => {
        if (colIndex === 3) {
          const amount = parseFloat($col.text());
          totalAmount += amount;
        }
      });
    });
  }).then(() => {
    cy.log(`Total Amount Collected: ${totalAmount}`);
    cy.get('div.totalAmount').should('have.text', ` Total Amount Collected: ${totalAmount} `);
  });
});
 
///////// ********** IFRAME HANGLING *********

When('I enter into Iframe Example',()=>{
cy.frameLoaded('#courses-iframe');

})
Then('I click on access plans to check the validation',()=>{
    cy.iframe('#courses-iframe').find('.header-upper li.dropdown>a').click()
})
Then('I click on the More dropdown and select contact',()=>{ 
     cy.iframe('#courses-iframe').find('div.header-upper li.current a').click({force:true})
            
    })
    Then('Send an message and submit it', (datatable:any) => {
        cy.wait(1000);
        const data = datatable.hashes();
        data.forEach(element => {
      
          cy.iframe('#courses-iframe').find('input#username')
            .should('be.visible') 
            .type(element.name);
          
          cy.iframe('#courses-iframe').find('input#mobileno')
            .should('be.visible') 
            .type(element.mobileno);
      
          cy.iframe('#courses-iframe').find('input#country')
            .should('be.visible')
            .type(element.country);
      
          cy.iframe('#courses-iframe').find('input#email')
            .should('be.visible') 
            .type(element.email);
      
          cy.iframe('#courses-iframe').find('textarea#message')
            .should('be.visible') 
            .type(element.message);
        });
        cy.iframe('#courses-iframe').find('select#subject')
          .should('be.visible') 
          .select('Online Courses');
      

        cy.iframe('#courses-iframe').find('form#contactUsForm button')
          .should('be.visible') 
          .click();
      });


import { Given, When,Then, Before} from '@badeball/cypress-cucumber-preprocessor';
Before(()=>{
  cy.reload();
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore all uncaught exceptions
    return false;
  });
})
Given('open makemytrip application',()=>{
    
    cy.visit("https://www.ixigo.com/flights?utm_source=Google_Search&utm_medium=paid_search_google_sweet16&utm_campaign=Generic_Search_Desktop_Sept&gad_source=1&gclid=CjwKCAiA5Ka9BhB5EiwA1ZVtvO7zzPDG99yW4cTndhHfvHqzmsjvXW_R_5nJ4286UaZflWVdtF-DkRoCPqQQAvD_BwE");
});
   


When('selecting and validating the departure city',()=>{
    cy.get("div.rounded-l-10 .px-15").click();
    cy.get('div.rounded-l-10 input').type('madurai');
    cy.wait(2000);
    cy.get('div.rounded-l-10  span.text-primary')
    .each(($el,index,$list)=>{
        if($el.text()=='IXM'){
            cy.wrap($el).click();
        }
    })
    cy.get("div.rounded-l-10 p.body-lg").should('have.text','IXM - Madurai')
})
Then('entering and validating the destination city',()=>{
    cy.get("div.undefined div.relative.flex-1>div:nth-child(2) .px-15").click();
    cy.get("div.undefined div.relative.flex-1>div:nth-child(2) input").type('chennai');
 cy.wait(1000);
 cy.get("div.undefined div.relative.flex-1>div:nth-child(2) span.text-sm")
 .each(($el,index,$list)=>{
      if($el.text()=='MAA'){
        cy.wrap($el).click();
      }
 })
 cy.get("div.undefined div.relative.flex-1>div:nth-child(2) p.body-lg")
 .should('have.text','MAA - Chennai');
})
Then('Click on the departure and select the given date',()=>{
  let month:string[]=['January','February','March','April','May','June','July','August','September','October','November','December'];
  let obj=new Date();
  let BookData:string='13/08/2025';
  let BookMonth:number=parseInt(BookData.substring(3,5));
 
  let i=obj.getUTCMonth();
 
  let flag:number=0;
  for(let k=0;k<12;k++){
    cy.get("p[data-testid='departureDate']").click();
    cy.get('div.react-calendar__navigation span.react-calendar__navigation__label__labelText')
    .each(($el,outerIndex,$list)=>{
      if(flag==1)return;
         let text:string=$el.text();
         let len:number=month[i].length;
         if(month[BookMonth-1]==text.substring(0,len)){
          cy.get(`div.react-calendar__month-view:nth-child(${outerIndex+1}) div.react-calendar__month-view__days abbr`)
          .each(($el,innerIndex,$list)=>{
            if($el.text()==BookData.substring(0,2)){
            cy.get(`div.react-calendar__month-view:nth-child(${outerIndex+1}) div.react-calendar__month-view__days button`)
            .eq(innerIndex).scrollIntoView().click({force:true});
            cy.wrap(null).then(() => {
              flag = 1;
              return;
            });
          };
  
          });
         };
         if(outerIndex!=1) i++;
    });
   
    cy.then(() => {
      if (flag == 1) {
        return;
      }
    else{
      cy.wait(1000);
      cy.get("button.react-calendar__navigation__next-button").click({force:true});
    } 
  });

  }
})

Then('Choose the no of passengers and the class',()=>{
  let adultCount:string='4';
  let childrenCount:string='3';
  cy.wait(1000);
  cy.get("p[data-testid='pax']").click();
  cy.get("[class='xl:h-[352px] xl:overflow-y-scroll xl:no-scrollbar']>div:nth-child(1) button").should('be.visible')
  .each(($el,index,$list)=>{
    if($el.text().trim()==adultCount) cy.wrap($el).click();
    
  })
  cy.get("[class='xl:h-[352px] xl:overflow-y-scroll xl:no-scrollbar']>div:nth-child(2) button")
  .each(($el,index,$list)=>{
    if($el.text().trim()==childrenCount) cy.wrap($el).click();
  })
  cy.get("div[class='flex justify-between bottom-0 gap-5 pt-[9px] pb-10 px-20 border-t border-neutral-100 w-full xl:justify-end relative'] button").click();
  
})
Then('Including any special fares and clicking on search',()=>{
  // let specialFare:string='Armed Forces';
  // cy.get("div.overflow-x-scroll span").each(($el,index,$list)=>{
  //     if($el.text().trim()==specialFare) cy.wrap($el).click();
  // })
  cy.get("[class='relative overflow-visible']+button").click();
})
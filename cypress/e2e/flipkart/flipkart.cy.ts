import { Given, When,Then, Before} from '@badeball/cypress-cucumber-preprocessor';
Before(()=>{
    cy.reload();
})
Given('Open flipkart applications',()=>{
    cy.visit("https://www.flipkart.com/");
})
When('I search for {string} and click enter',(mobile:string)=>{
    cy.get("input[class='Pke_EE']").type(`${mobile}{enter}`);
})
Then('corresponding results should be displayed',()=>{
cy.get("span[class='BUOuZu'] span").should('have.text','Mobiles');

})
Then('I should be able to filter based on configurations',()=>{
    let mobileModel:{
        name:string,
        minPrice:string,
        Ram:string,
        internalStorage:string,
         batteryCapacity:string}={
      name:"SAMSUNG",
      minPrice:"₹10000",
      Ram:"8 GB and Above",
      internalStorage:"128 - 255.9 GB",
      batteryCapacity:"5000 - 5999 mAh"
    };
    cy.get("div[class='suthUA'] select[class='Gn+jFg']")
    .select(`${mobileModel.minPrice}`);
    cy.get("input[class='XPD6hh']").type(`${mobileModel.name}`);
    cy.get(`div[title='${mobileModel.name}' i] input`).check({force:true}).should('be.checked');
    cy.get("div[class='_6i1qKy']").each(($el,index)=>{
         if($el.text().trim()==mobileModel.Ram){
      cy.wrap($el).click();
         }
    })
cy.get("div[class='fxf7w6 rgHxCQ']").each(($el,outerIndex)=>{
    if($el.text().trim()=='Internal Storage'){
        cy.wrap($el).click();
    }
})
cy.get("div[class='_6i1qKy']").each(($el,index)=>{
    if($el.text().trim()==mobileModel.internalStorage){
      cy.wrap($el).click();
      return;
    }
})
cy.get("div[class='fxf7w6 rgHxCQ']").each(($el,outerIndex)=>{
    if($el.text().trim()=='Battery Capacity'){
        cy.wrap($el).click();
    }
})
cy.get("div[class='_6i1qKy']").each(($el,index)=>{
    if($el.text().trim()==mobileModel.batteryCapacity){
      cy.wrap($el).click();
      return;
    }
})
})
Then('I should be able to paginate to find the gadget', () => {
    let ItemIndex:number=10000;
    cy.wrap({ ItemIndex }).as('state');
    let finder:string="SAMSUNG Galaxy M55 5G (Denim Black / Black, 128 GB)";
    cy.get("nav[class='WSL9JP']>a").each(($el, index) => {
              cy.get('@state').then((state)=>{
                cy.log(`${state.ItemIndex}---${index}`);
                cy.get("@state").then(($ele) => {
                        cy.log($ele);
                    });
                
                    cy.wrap($el).click();
                    cy.wait(1000);
                
              })
            cy.log("hiii")
            cy.get("div[class='KzDlHZ']").each(($productEl, productIndex) => {
                if ($productEl.text().trim() ===finder) {
                    cy.get("div[class='tUxRFH'] a").eq(productIndex).invoke('removeAttr', 'target').click();
                    cy.get("span[class='VU-ZEz']").contains(finder);
                    cy.get('@state').then((state) => {
                        state.ItemIndex = index;
                        cy.wrap(state).as('state'); 
                    });
                    return false;
                   
                }
               
            })  
    });
});

Then('Add the item to cart and navigate back to home page', () => {
    cy.wait(1000);
    cy.get("div[class*='_1ri+WN']")
        .should('be.visible')  
        .invoke('attr', 'class')  
                .then((className) => {
            if (className.includes('_1ri+WN lwANdH')) {
                cy.log('Button has class _1ri+WN lwANdH');
                cy.get("div[class='_1ri+WN lwANdH'] li:nth-child(1) button").click({ force: true }); 
                       }
            else if (className.includes('_1ri+WN')) {
                cy.log('Button has class _1ri+WN');
                cy.get("div[class='_1ri+WN'] li:nth-child(1) button") 
                    .click({ force: true });  
            } else {
                cy.log('Button does not have the expected classes');
            }
        });
});


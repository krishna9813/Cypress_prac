import { Given, When,Then, Before} from '@badeball/cypress-cucumber-preprocessor';
import { threadId } from 'worker_threads';
Before(()=>{
    cy.reload();
})
Given('Open flipkart applications',()=>{
    cy.viewport(1920, 1080);
    cy.visit("https://www.flipkart.com/");
})
When('I search for {string} and click Enter',(mobile:string)=>{
    cy.get("input[class='Pke_EE']").type(`${mobile}{enter}`);
})
Then('I should see the relevant search results displayed',()=>{
cy.get("span[class='BUOuZu'] span").should('have.text','Mobiles');

})
Then('I should be able to apply filters based on various configurations',()=>{
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
Then('I should be able to paginate through the results to find the desired product', () => {
    let ItemIndex:number=10000;
    let found:boolean=false;
    cy.wrap({ ItemIndex,found}).as('state');
    let finder:string="SAMSUNG Galaxy M55 5G (Denim Black / Black, 128 GB)";
    cy.get("nav[class='WSL9JP']>a").each(($el, index) => {
              cy.get('@state').then((state)=>{
                if((state.ItemIndex)<index) 
                    {
                        state.found=true;
                        cy.wrap(state).as('state'); 
                        return false;}
                else{
                    cy.wrap($el).click();
                    cy.wait(1000);
                }
              });
             cy.get('@state').then(($el)=>{
                if(!$el.found){
                    cy.get("div[class='KzDlHZ']").each(($productEl, productIndex) => {

                        if ($productEl.text().trim() ===finder) {
                            cy.get("div[class='tUxRFH'] a").eq(productIndex).invoke('removeAttr', 'target').click();
                            cy.get("span[class='VU-ZEz']").contains(finder);
                            cy.get('@state').then((state) => {
                                state.ItemIndex = index;
                                cy.wrap(state).as('state'); 
                            });
                      return false;
                             };    
                    });  
                }
                else {
                    return false;
                }
            
             });    
    });
});

Then('I should add the item to the cart and navigate back to the homepage', () => {
    cy.wait(5000);
    cy.get("[class='AFOXgu']").type("515001");
    cy.get("[class='i40dM4']").click();
    cy.wait(1000);
//    cy.get("[class = 'QqFHMw vslbG+ In9uk2'],[class='QqFHMw vslbG+ In9uk2 JTo6b7']").click({force:true});
   cy.get("[class='vvkYxW _0N6ruS']+div button").click();
   cy.go('back');
   cy.get("[class='_3Owiq+']>.aOfogh>span").click();
   cy.visit("https://www.flipkart.com/");
   cy.get("span._30XB9F").click();
});
When('I search for {string} and press Enter',(electronics:string)=>{
    cy.wait(1000);
    cy.get("input[class='Pke_EE']").type(`${electronics}{enter}`);

});
Then('I should see a page displaying electronics-related results',()=>{
    cy.get("span[class='BUOuZu'] span").should('have.text','Electronics');
});
Then('I should be able to filter the results by the {string} category and validate it',(Category:string)=>{
      cy.get(".esFpML a").each(($el,index)=>{
        if($el.text().trim()===Category){
            cy.wrap($el).click();
        }
      });
      cy.get(".esFpML a").should('have.text',Category);
});
Then('I should paginate through the results to find the specific product and click on it',()=>{
    let ItemIndex:number=10000;
    cy.wrap({ ItemIndex}).as('state');
    let ElectronicItem:string='Pigeon 1800 W Induction Cooktop Touch Panel';
    cy.get(".WSL9JP>A").each(($el,index)=>{
        cy.get('@state').then((state)=>{
            if((state.ItemIndex)<index) 
                {
                    cy.wrap(state).as('state'); 
                    return false;}
            else{
                cy.wrap($el).click();
                cy.wait(1000);
            }
          });
          
        cy.get("[class='DOjaWF gdgoEp'] a.wjcEIp").each(($ElecList, ElecIndex) => {
            const anchorText = $ElecList.text().trim(); 
            if (anchorText === ElectronicItem) {
                cy.wrap($ElecList).invoke('removeAttr','target').click();
                cy.get('@state').then((state) => {
                    state.ItemIndex = index;
                    cy.wrap(state).as('state'); 
                });
                return false;
            } 
        });
        
    });
})
Then('I should add the product to the cart and return to the homepage',()=>{
    cy.wait(1000);
    cy.get("[class='AFOXgu']").type("515001");
    cy.get("[class='i40dM4']").click();
    // cy.get("[class = 'QqFHMw vslbG+ In9uk2'],[class='QqFHMw vslbG+ In9uk2 JTo6b7']").click({force:true});
    cy.get("[class='QqFHMw cNEU5Q J9Kkbj _7Pd1Fp']").click();
    cy.wait(1000);
    cy.visit('https://www.flipkart.com/');
})
Then('Validate the items added to the cart',()=>{
    cy.wait(1000);
    let finder:string="SAMSUNG Galaxy M55 5G (Denim Black / Black, 128 GB)";
    let ElectronicItem:string='Pigeon 1800 W Induction Cooktop Touch Panel';
    cy.get("span._2U7eDE").invoke("text").then((text:string)=>{
        cy.get("a._3CowY2").click();
        cy.get(".gE4Hlh a").contains(finder).should('be.visible');
        cy.get(".gE4Hlh a").contains(ElectronicItem).should('be.visible');
        cy.get(".gE4Hlh a").should('have.length',text);
    })

  
});
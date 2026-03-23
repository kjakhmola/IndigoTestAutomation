export class Addons {
    constructor(page) {
        this.page = page;
        this.mealsLink = page.locator('//div[text()="Meals"]');
        this.mealAddBtn = page.locator('(//div[@class="skyplus-button skyplus-meal-card__btn-add"])[1]');
        this.nxtBtn = page.locator('//button[text()="Next"]');
        this.skipPopUp = page.locator('//*[text()="Skip"]');
        this.returnTab = page.locator('(//*[@role="tab"])[3]');

    }

    async addMeal() {

        await this.mealsLink.click();
        await this.mealAddBtn.click();
        await this.nxtBtn.click();
    }

    async addMealReturnTab() {

        await this.addMeal();        
        //await this.skipPopUp.click();  
        await this.handleSkipPopup();      
        await this.nxtBtn.click();

        // Handle return journey (if UI switches)
        await this.returnTab.click();
        await this.addMeal();        

    }
    async handleSkipPopup() {
        try {
            // Wait for skip button (short timeout)
            if (await this.skipBtn.isVisible({ timeout: 3000 })) {
                await this.skipBtn.click();
            }
        } catch (e) {
            // Popup didn't appear → ignore
            console.log("Skip popup not shown");
        }
    }


}
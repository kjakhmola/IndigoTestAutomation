import { expect } from "@playwright/test";

export class Addons {
    constructor(page) {
        this.page = page;
        this.mealsLink = page.locator('//div[text()="Meals"]');
        this.mealAddBtn = page.locator('(//div[@class="skyplus-button skyplus-meal-card__btn-add"])[1]');
        this.nxtBtn = page.locator('//button[text()="Next"]');
        this.skipPopUp = page.locator('//*[text()="Skip"]');
        this.skipPopUp3 = page.locator("");
        this.skipPopUp2 = page.locator('(//div[@class="skyplus-button "])[1]');//button[contains(@class,'skyplus-button--small')][normalize-space()='Skip']
        this.returnTab = page.locator('(//*[@role="tab"])[3]');
        this.chooseNowBtn = page.getByRole("button", {name: 'Choose now'})
        this.addReturnMealBtn = page.locator('(//button[@class="skyplus-button--outline skyplus-button--outline-primary skyplus-button--medium "])[1]');

    }

    async addMeal() {

        await this.mealsLink.click();
        await this.mealAddBtn.click();
        await this.nxtBtn.click();

        if (await this.skipPopUp.isVisible()) {

            await this.skipPopUp.click();
            await this.nxtBtn.click();
            await this.chooseNowBtn.click();            
            await this.addReturnMealBtn.first().click();
            await this.nxtBtn.click();

        }

    }


}




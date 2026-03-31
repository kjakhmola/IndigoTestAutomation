import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class Addons extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.mealsLink = '//div[text()="Meals"]';
        this.mealAddBtn = '(//div[@class="skyplus-button skyplus-meal-card__btn-add"])[1]';
        this.nxtBtn = '//button[text()="Next"]';
        this.skipPopUp = '//*[text()="Skip"]';
        this.returnTab = '(//*[@role="tab"])[3]';
        this.chooseNowBtn = '//button[text()="Choose now"]';
        this.addReturnMealBtn = '(//button[@class="skyplus-button--outline skyplus-button--outline-primary skyplus-button--medium "])[1]';

    }

    async addMeal() {

        await this.click(this.mealsLink);
        await this.click(this.mealAddBtn);
        await this.click(this.nxtBtn);

        if (await this.isVisible(this.skipPopUp)) {
            await this.click(this.skipPopUp);
            await this.click(this.nxtBtn);
            await this.click(this.chooseNowBtn);
            await this.click(this.addReturnMealBtn);
            await this.click(this.nxtBtn);

        }

    }


}






export class Addons{
    constructor(page){
        this.page=page;
        this.mealsLink = page.locator('//div[text()="Meals"]');
        this.mealAddBtn = page.locator('(//div[@class="skyplus-button skyplus-meal-card__btn-add"])[1]');
        this.nxtBtn = page.locator('//button[text()="Next"]');

    }

    async addMeal(){
        await this.mealsLink.click();
        await this.mealAddBtn.click();
        await this.nxtBtn.click();
    }

    
}
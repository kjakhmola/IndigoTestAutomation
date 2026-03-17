export class SearchResultpage {

    constructor(page){
        this.page = page;

        this.economyList = page.locator('//*[@class="skyplus-text selected-fare__fare-price sh3"]')
        this.saverFare = page.locator('//*[text()="Saver fare"]');
        this.flexiFare = page.locator('//*[text()="Flexi plus fare"]');
        this.super6EFare = page.locator('//*[text()="IndiGo UpFront"]');

        this.nextButton = page.locator('//button[text()="Next"]');
    }

    async selectEconomyFlight(fareType){

        await this.economyList.nth(0).click();

        switch(fareType){

            case "saver":
                await this.saverFare.click();
                break;

            case "flexi":
                await this.flexiFare.click();
                break;

            case "super6E":
                await this.super6EFare.click();
                break;

            default:
                throw new Error(`Invalid fare type: ${fareType}`);
        }

        await this.nextButton.click();
    }

}
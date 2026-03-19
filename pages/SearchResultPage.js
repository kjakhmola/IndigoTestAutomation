export class SearchResultpage {

    constructor(page) {
        this.page = page;

        this.economyList = page.locator('//*[@class="skyplus-text selected-fare__fare-price sh3"]');

        this.saverFare = page.locator('//*[text()="Saver fare"]');
        this.flexiFare = page.locator('//*[text()="Flexi plus fare"]');
        this.super6EFare = page.locator('//*[text()="IndiGo UpFront"]');

        this.returnLegTab = page.locator('(//*[@class="flight-journey-tab-container__leg"])[2]');

        this.nextButton = page.locator('//button[text()="Next"]');
    }

    async selectFare(fareType) {

        switch (fareType.toLowerCase()) {

            case "saver":
                await this.saverFare.click();
                break;

            case "flexi":
                await this.flexiFare.click();
                break;

            case "indigoupfront":
                await this.super6EFare.click();
                break;

            default:
                throw new Error(`Invalid fare type: ${fareType}`);
        }
    }

    async selectEconomyFlight(tripType, fareType) {

        // 🔹 Departure Flight
        await this.economyList.first().click();
        await this.selectFare(fareType);
        await this.nextButton.click();

        // 🔹 If roundtrip → handle return
        if (tripType.toLowerCase() === "roundtrip") {

            await this.returnLegTab.waitFor({ state: 'visible' });
            await this.returnLegTab.click();

            await this.economyList.first().click();
            await this.selectFare(fareType);
            await this.nextButton.click();
        }
    }
}
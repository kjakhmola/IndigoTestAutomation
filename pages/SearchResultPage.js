import { BasePage } from "./BasePage";

export class SearchResultpage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;

        this.economyList = '//*[@class="skyplus-text selected-fare__fare-price sh3"]';
        this.saverFare = '//*[text()="Saver fare"]';
        this.flexiFare = '//*[text()="Flexi plus fare"]';
        this.super6EFare = '//*[text()="IndiGo UpFront"]';
        this.returnLegTab = '(//*[@class="flight-journey-tab-container__leg"])[2]';
        this.nextButton = '//button[text()="Next"]';
    }

    async selectFare(fareType) {

        switch (fareType.toLowerCase()) {

            case "saver":
                await this.click(this.saverFare);
                break;

            case "flexi":
                await this.click(this.flexiFare);
                break;

            case "indigoupfront":
                await this.click(this.super6EFare);
                break;

            default:
                throw new Error(`Invalid fare type: ${fareType}`);
        }
    }

    async selectEconomyFlight(tripType, fareType) {

        // 🔹 Departure Flight
        const flightOptionsCount = await this.getCount(this.economyList);
        for (let i = 0; i < flightOptionsCount; i++) {
            await this.click(this.flightOptionsCount, i);
        }
        await this.selectFare(fareType);
        await this.click(this.nextButton);

        //Return Flight
        if (tripType.toLowerCase() === "roundtrip") {

            //await this.page.locator(this.returnLegTab).waitFor({ state: 'visible' });

            await this.click(this.returnLegTab);

            const returnFlights = await this.getCount(this.economyList);

            for (let i = 0; i < returnFlights; i++) {
                await this.click(this.economyList, i);
                break;
            }
            await this.selectFare(fareType);
            await this.click(this.nextButton);
        }
    }
}
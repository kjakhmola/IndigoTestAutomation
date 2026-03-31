import { BasePage } from "./BasePage";


export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.fromTextLocator = '//*[contains(@aria-label,"sourceCity")]//div//span';
        this.sourceInput = '(//input[@placeholder="Start typing.."])[1]';
        this.sourcesSuggestions = '(//*[@class="city-selection__list-item gap-6"])[1]';
        this.toText = '//span[text()="To"]';
        this.destinationInput = '(//input[@placeholder="Start typing.."])[2]';
        this.destinationSuggestions = '(//div[@class="city-selection__list-item gap-6"])[1]';
        this.departureDateField = '//span[text()="Departure"]';
        this.monthYear = '(//*[@class="rdrMonthName"])[1]';
        this.allDates = "//button[contains(@class, 'rdrDay') and not(contains(@class, 'rdrDayPassive')) and not(contains(@class, 'rdrDayDisabled'))]//span[@class='date']";
        this.arrowBtn = '//button[contains(@class,"rdrNextButton")]';
        this.passengerField = '//label[text()="Passengers"]/following-sibling::div';
        this.increaseAdult = '//button[@aria-label="Increase Adult"]';
        this.passengerContinueBtn = '//button[text()="Continue"]';
        this.searchBtn = '//button[text()="Search"]';
        this.roundTripRadioBtn = '//*[text()="Round Trip"]';
        this.returnDateField = '//*[text()="Return"]';
        this.flightTabBookingWidget = '[class = "bookingmf-container__tabs--item active"]';


    }


    async gotoHomePage() {
        await this.navigatetoHomePage();
    }


    async selectTripDetails(tripType, sourceCity, destinationCity, departureTargetDate, departureTargetMonthYear, returnTargetDate, returnTargetMonthYear
    ) {

        if (tripType.toLowerCase() === "oneway") {

            await this.selectSource(sourceCity);
            await this.selectDestination(destinationCity);
            await this.selectDepartureDate(departureTargetDate, departureTargetMonthYear);

        } else if (tripType.toLowerCase() === "roundtrip") {

            await this.click(this.roundTripRadioBtn);

            await this.selectSource(sourceCity);
            await this.selectDestination(destinationCity);
            await this.selectDepartureDate(departureTargetDate, departureTargetMonthYear);
            await this.selectReturnDate(returnTargetDate, returnTargetMonthYear);

        } else {
            throw new Error("Invalid trip type. Use 'oneway' or 'roundtrip'");
        }
    }

    async selectSource(city) {

        await this.click(this.fromTextLocator);
        await this.fill(this.sourceInput, city);
        await this.click(this.sourcesSuggestions);


    }

    async selectDestination(city) {
        await this.click(this.toText);
        await this.fill(this.destinationInput, city);
        await this.click(this.destinationSuggestions);

    }

    async selectDepartureDate(departureTargetDate, departureTargetMonthYear) {
        await this.click(this.departureDateField);

        await this.selectDepartureMonth(departureTargetMonthYear);
        const count = await this.getCount(this.allDates);

        for (let i = 0; i < count; i++) {
            //const date = this.allDates.nth(i);
            const text = await this.getText(this.allDates, i);

            if (text.trim() === departureTargetDate) {
                await this.click(this.allDates, i);
                break;
            }
        }

    }

    async selectDepartureMonth(departureTargetMonthYear) {
        const currentMonthYear = await this.getText(this.monthYear);

        if (currentMonthYear == departureTargetMonthYear) {
            return;
        }
        await this.clickPseudoBefore(this.arrowBtn);
        await this.selectDepartureMonth(departureTargetMonthYear);
    }


    async selectReturnDate(returnTargetDate, returnTargetMonthYear) {

        await this.click(this.returnDateField);

        await this.selectReturnMonth(returnTargetMonthYear); // ✅ correct

        const count = await this.getCount(this.allDates);

        for (let i = 0; i < count; i++) {

            const text = await this.getText(this.allDates, i);

            if (text === returnTargetDate) {
                await this.click(this.allDates, i);
                break;
            }
        }
    }

    async selectReturnMonth(returnTargetMonthYear) {
        const currentMonthYear = await this.getText(this.monthYear);

        if (currentMonthYear == returnTargetMonthYear) {
            return;
        }
        await this.clickPseudoBefore(this.arrowBtn);
        await this.selectReturnMonth(returnTargetMonthYear);
    }



    async clickSearch() {
        await this.click(this.searchBtn);
    }


    async bookingWidgetFightText() {
        return await this.getText(this.flightTabBookingWidget);
    }

    async fromText(){
        return await this.getText(this.fromTextLocator);
    }


}
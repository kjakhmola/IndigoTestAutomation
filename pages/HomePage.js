import { BasePage } from "./BasePage";


export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.fromText = '//span[text()="From"]';
        this.sourceInput = '(//input[@placeholder="Start typing.."])[1]';
        this.sourcesSuggestions = '(//*[@class="city-selection__list-item gap-6"])[1]';
        this.toText = '//span[text()="To"]';
        this.destinationInput ='(//input[@placeholder="Start typing.."])[2]';
        this.destinationSuggestions ='(//div[@class="city-selection__list-item gap-6"])[1]';
        this.departureDateField ='//span[text()="Departure"]';


        this.monthYear = page.locator('(//*[@class="rdrMonthName"])[1]');
        this.allDates = page.locator("//button[contains(@class, 'rdrDay') and not(contains(@class, 'rdrDayPassive')) and not(contains(@class, 'rdrDayDisabled'))]//span[@class='date']");
        this.arrowBtn = page.locator('//button[contains(@class,"rdrNextButton")]').first();
        this.passengerField = '//label[text()="Passengers"]/following-sibling::div';
        this.increaseAdult ='//button[@aria-label="Increase Adult"]';
        this.passengerContinueBtn ='//button[text()="Continue"]';
        this.searchBtn = '//button[text()="Search"]';

        this.roundTripRadioBtn = '//*[text()="Round Trip"]';
        this.returnDateField = '//*[text()="Return"]';


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

        await this.click(this.fromText);
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
        const count = await this.allDates.count();

        for (let i = 0; i < count; i++) {
            const date = this.allDates.nth(i);
            const text = await date.textContent();

            if (text.trim() === departureTargetDate) {
                await date.click();
                break;
            }
        }

    }

    async selectDepartureMonth(departureTargetMonthYear) {
        const currentMonthYear = await this.monthYear.textContent();
        
        if (currentMonthYear == departureTargetMonthYear) {
            return;
        }
        await this.clickPseudoBefore(this.arrowBtn);
        await this.selectDepartureMonth(departureTargetMonthYear);
    }




    async selectReturnDate(returnTargetDate, returnTargetMonthYear) {

        await this.click(this.returnDateField);

        await this.selectReturnMonth(returnTargetMonthYear); // ✅ correct

        const count = await this.allDates.count();

        for (let i = 0; i < count; i++) {

            const text = (await this.allDates.nth(i).textContent())?.trim();

            if (text === returnTargetDate) {
                await this.allDates.nth(i).click();
                break;
            }
        }
    }

    async selectReturnMonth(returnTargetMonthYear) {
        const currentMonthYear = await this.monthYear.textContent();
        
        if (currentMonthYear == returnTargetMonthYear) {
            return;
        }
        await this.clickPseudoBefore(this.arrowBtn);
        await this.selectReturnMonth(returnTargetMonthYear);
    }

    async clickPseudoBefore(Locator) {
        const locator = Locator;
        await locator.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            const before = window.getComputedStyle(el, '::before');

            const toPx = (v) => {
                if (!v) return 0;
                const n = parseFloat(v);
                return Number.isFinite(n) ? n : 0;
            };

            const left = toPx(before.left);
            const top = toPx(before.top);

            const x = rect.left + window.scrollX + left;
            const y = rect.top + window.scrollY + top;

            if (!Number.isFinite(x) || !Number.isFinite(y)) {
                throw new Error(`Non-finite coords for ::before. left=${before.left}, top=${before.top}`);
            }

            const evt = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: x,
                clientY: y
            });

            el.dispatchEvent(evt);
        });
    }





    async clickSearch() {
        await this.click(this.searchBtn);
    }


}
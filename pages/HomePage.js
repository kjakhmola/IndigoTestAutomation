

export class HomePage {
    constructor(page) {
        this.page = page;
        this.fromText = page.locator('//span[text()="From"]');
        this.sourceInput = page.locator('(//input[@placeholder="Start typing.."])[1]');
        this.sourcesSuggestions = page.locator('(//*[@class="city-selection__list-item gap-6"])[1]');
        this.toText = page.locator('//span[text()="To"]');
        this.destinationInput = page.locator('(//input[@placeholder="Start typing.."])[2]');
        this.destinationSuggestions = page.locator('(//div[@class="city-selection__list-item gap-6"])[1]');
        this.departureDateField = page.locator('//span[text()="Departure"]');
        this.returnDateField = page.locator('//*[text()="Return"]');

        this.monthYear = page.locator('(//*[@class="rdrMonthName"])[1]');
        //this.allDates = page.locator('(//div[@class="rdrDays"])[1]');
        this.allDates = page.locator("//button[contains(@class, 'rdrDay') and not(contains(@class, 'rdrDayPassive')) and not(contains(@class, 'rdrDayDisabled'))]//span[@class='date']");
        //this.arrowBtn = page.locator('//button[@class="rdrNextPrevButton rdrNextButton"]//i');
        this.arrowBtn = page.locator('//button[contains(@class,"rdrNextButton")]').first();
        //this.arrowBtn = page.locator('//*[contains(@class,"In6e2")]//*[contains(@class, "skyplus-calendar")]//*[contains(@class, "rdrNextButton")]//i');

        this.passengerField = page.locator('//label[text()="Passengers"]/following-sibling::div');
        this.increaseAdult = page.locator('//button[@aria-label="Increase Adult"]');
        this.passengerContinueBtn = page.locator('//button[text()="Continue"]');
        this.searchBtn = page.locator('//button[text()="Search"]');

        this.roundTripRadioBtn = page.locator('//*[text()="Round Trip"]');
        

    }


    async gotoHomePage() {
        await this.page.goto('https://www.goindigo.in/');
    }


    async selectTripDetails(tripType, departureTargetDate, departureTargetMonthYear,returnTargetDate, returnTargetMonthYear) {
    if (type.toLowerCase() === "oneway") {
        await this.selectSource(city);
        await this.selectDestination(city);
        await this.selectDepartureDate(departureTargetDate, departureTargetMonthYear);
        
    } else if (type.toLowerCase() === "roundtrip") {
        await this.roundTripRadioBtn.click();
        
        await this.selectSource(city);
        await this.selectDestination(city);
        await this.selectDepartureDate(departureTargetDate, departureTargetMonthYear);
        await selectReturnDate(returnTargetDate, returnTargetMonthYear);
        

    } else {
        throw new Error("Invalid trip type. Use 'oneway' or 'roundtrip'");
    }
    }

    async selectSource(city) {
        
        await this.fromText.click();
        await this.sourceInput.fill(city);
        await this.sourcesSuggestions.click();


    }


    async selectDestination(city) {
        await this.toText.click();
        await this.destinationInput.fill(city);
        await this.destinationSuggestions.click();





    }

    

    async selectDepartureDate(departureTargetDate, departureTargetMonthYear) {
        await this.departureDateField.click();

        await this.selectMonth(departureTargetMonthYear);
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
        //march 2026
        // console.log(currentMonthYear, "This is value of website");

        // console.log(targetMonthYear, "This is value of test data");
        if (currentMonthYear == departureTargetMonthYear) {
            return;
        }
        await this.clickPseudoBefore(this.arrowBtn);
        await this.selectMonth(departureTargetMonthYear);
    }

    async selectReturnDate(returnTargetDate, returnTargetMonthYear) {
        await this.returnDateField.click();

        await this.selectMonth(returnTargetMonthYear);
        const count = await this.allDates.count();

        for (let i = 0; i < count; i++) {
            const date = this.allDates.nth(i);
            const text = await date.textContent();

            if (text.trim() === returnTargetDate) {
                await date.click();
                break;
            }
        }

    }

    async selectReturnMonth(returnTargetMonthYear) {
        const currentMonthYear = await this.monthYear.textContent();
        //march 2026
        // console.log(currentMonthYear, "This is value of website");

        // console.log(targetMonthYear, "This is value of test data");
        if (currentMonthYear == returnTargetMonthYear) {
            return;
        }
        await this.clickPseudoBefore(this.arrowBtn);
        await this.selectMonth(targetMonthYear);
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
        await this.searchBtn.click();
    }   


}
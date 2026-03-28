export class seatSelectionPage {

    constructor(page) {
        this.page = page;
        //this.availableSeat = page.locator('[data-availability="true"]').first();
        this.availableSeat = page.getByRole('gridcell', { name: /available/i }).first();
        this.nextBtn = page.getByText('Next');
        this.roundTripToggle = page.locator('.destination-toggle--2');
        this.returnTab = page.locator('(//button[contains(@class,"skyplus-button")])[2]');
    }

    async selectSeat() {

        
        await this.availableSeat.scrollIntoViewIfNeeded();
        //await this.availableSeat.waitFor({ state: 'visible' });
        await this.availableSeat.click();
        await this.nextBtn.click();

        
        if (await this.roundTripToggle.isVisible()) {

            //await this.returnTab.click();

            await this.availableSeat.waitFor({ state: 'visible' });
            await this.availableSeat.click();
            await this.nextBtn.click();
        }
    }
}
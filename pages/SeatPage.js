export class seatSelectionPage{

    constructor(page){
        this.page = page;
        this.availableSeat = page.locator('(//*[@class="seatmap-seat  " and @data-availability="true"])[1]');
        this.nextBtn = page.locator('//*[text()="Next"]');
    }

    async selectSeat(){
        await this.availableSeat.scrollIntoViewIfNeeded();
        this.availableSeat.click();
        this.nextBtn.click();
    }
}
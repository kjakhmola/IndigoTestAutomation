export class seatSelectionPage{

    constructor(page){
        this.page = page;
        this.availableSeat = page.locator('(//*[@class="seatmap-seat  " and @data-availability="true"])[1]');
        this.nextBtn = page.locator('//*[text()="Next"]');
    }

    async selectSeat(fareType){
        //await this.availableSeat.scrollIntoViewIfNeeded();
        switch(fareType){
            case "saver":
                this.nextBtn.click();
                break;
            
            case "flexi":
                this.availableSeat.click();
                this.nextBtn.click();
                break;
                
            case "indigoupfront":
                this.availableSeat.click();
                this.nextBtn.click();
                break;

        }
        
    }
}
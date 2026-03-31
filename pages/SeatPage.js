import { log } from "node:console";
import { BasePage } from "./BasePage";


export class seatSelectionPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.availableSeat = '//button[@class="seatmap-seat  " or @class="seatmap-seat free "]';
        this.nextBtn = '//button[text()="Next"]';
        this.flights = '//*[contains(@class,"destination-segment")]';
        
    }

    async selectSeat() {

        //seat selection in departure leg
        await this.click(this.availableSeat,0);

        //seat selection in return leg
        const flight = await this.getCount(this.flights);
        for (let i = 0; i <= flight; i++) {
            await this.click(this.availableSeat, 0);
        }

        await this.click(this.nextBtn);
    }

}
import { BasePage } from './BasePage.js';

export class passengerDetailPage extends BasePage{

    constructor(page) {

        super(page);
        this.page = page;
        this.gender = '//*[@value="Male"]';
        this.firstName = '//*[@placeholder="First and Middle Name"]';
        this.lastName = '//*[@placeholder="Last Name"]';
        this.primaryContact = '(//input[@name="primaryContact"])[2]';
        this.emailId = '(//input[@name="email"])[1]';
        this.privacyPolicyCheckBox = '#privacyPolicy-label';
        this.whatsAppCheckbox = '//*[@id="whatsapp-label"]';
        this.nextBtn = '//*[text()="Next"]';

    }

    async enterPassengerDetails(fname, lname, contact, email) {
        await this.click(this.gender);
        await this.fill(this.firstName, fname);
        await this.fill(this.lastName, lname);
        await this.scrollIntoViewIfNeeded(this.primaryContact);
        await this.click(this.primaryContact);
        await this.fill(this.primaryContact, contact);
        await this.click(this.emailId);
        await this.fill(this.emailId, email);
        await this.click(this.whatsAppCheckbox);
        await this.click(this.nextBtn);
    }



}
import { BasePage } from './BasePage.js';

export class passengerDetailPage extends BasePage{

    constructor(page) {

        super(page);
        this.page = page;
        this.gender = page.locator('//*[@value="Male"]');
        this.firstName = page.locator('//*[@placeholder="First and Middle Name"]');
        this.lastName = page.locator('//*[@placeholder="Last Name"]');
        this.primaryContact = page.locator('(//input[@name="primaryContact"])[2]');
        this.emailId = page.locator('(//input[@name="email"])[1]');
        this.privacyPolicyCheckBox = page.locator('#privacyPolicy-label');
        this.whatsAppCheckbox = page.locator('//*[@id="whatsapp-label"]');
        this.nextBtn = page.locator('//*[text()="Next"]');

    }

    async enterPassengerDetails(fname, lname, contact, email) {
        await this.gender.click();
        await this.firstName.fill(fname);
        await this.lastName.fill(lname);
        await this.primaryContact.scrollIntoViewIfNeeded();
        await this.primaryContact.click();
        await this.primaryContact.fill(contact);
        await this.emailId.click();
        await this.emailId.fill(email);
        await this.whatsAppCheckbox.click();
        await this.nextBtn.click();
    }



}
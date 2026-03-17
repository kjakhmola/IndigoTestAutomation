export class paymentPage {
    constructor(page) {
        this.page = page;

        const frame = '//iframe[@id="indigo-payment-iframe"]';

        this.netBanking = this.page.frameLocator(frame)
            .locator('//*[text()="All major banks available"]');

        this.netBankingBankSelection = this.page.frameLocator(frame)
            .locator('(//*[@alt="radiobuttonicon"])[1]');

        this.payBtn = this.page.frameLocator(frame)
            .locator('(//div/article[text()="Pay "])[1]');
    }

    async toSelectPaymentMethod() {

        await this.netBanking.click();
        await this.netBankingBankSelection.click();

        const [paymentWindow] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.payBtn.click()
        ]);

        await paymentWindow.waitForLoadState();

        await paymentWindow.locator('#username').fill('test');
        await paymentWindow.locator('//input[@placeholder="Password"]').fill('test');
        await paymentWindow.locator('//input[@value="Login"]').click();
    }
}
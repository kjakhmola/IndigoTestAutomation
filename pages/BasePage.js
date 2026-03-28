export class BasePage {
    constructor(page) {
        this.page = page;
    }

     async navigatetoHomePage() {
        await this.page.goto("/");
    }


    async click(locator) {
        await this.page.locator(locator).click();
    }

    async fill(locator, value) {
        await this.page.locator(locator).fill(value);
    }

    async getText(locator) {
        return await this.page.locator(locator).textContent();
    }

    async isVisible(locator) {
        return await this.page.locator.isVisible();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async waitForSelector(selector) {
        await this.page.waitForSelector(selector);
    }

    async clickByText(text) {
        await this.page.getByText(text).click();
    }
}
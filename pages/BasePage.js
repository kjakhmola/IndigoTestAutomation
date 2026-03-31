export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigatetoHomePage() {
        await this.page.goto("/");
    }


    async click(locator, nth=0) {
        await this.page.locator(locator).nth(nth).click();
    }

 
    async fill(locator, value) {
        await this.page.locator(locator).fill(value);
    }

    async getText(locator, nth = 0) {
        return await this.page.locator(locator).nth(nth).textContent();
    }

    async isVisible(locator) {
        return await this.page.locator(locator).isVisible();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async waitForSelector(selector) {
        await this.page.waitForSelector(selector);
    }

    async scrollIntoViewIfNeeded(locator) {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
    }

    async getCount(Locator) {
        return await this.page.locator(Locator).count();
    }

    async clickPseudoBefore(Locator, nth = 0) {
        const locator = await this.page.locator(Locator).nth(nth);
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
}
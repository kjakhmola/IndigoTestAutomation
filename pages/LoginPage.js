export class Login {
    constructor(page) {
        this.page = page;
        this.loginCta = page.locator("#loginButton");
        this.customerCta = page.locator('//a[contains(@title, "Customer")]');
        this.usernameInputField = page.locator("#input-userInput");
        this.otpInputField = page.locator("(//input[@inputmethod='numeric'])[1]");
    }



    async getOtpFromYopmail(page, inbox) {
        // Open Yopmail
        await page.goto(`https://yopmail.com/en/?login=${inbox}`);

        // Wait for inbox frame
        const inboxFrame = page.frameLocator('#ifinbox');

        // Click latest email
        await inboxFrame.locator('.m').first().click();

        // Switch to mail content frame
        const mailFrame = page.frameLocator('#ifmail');

        // Get email text
        const bodyText = await mailFrame.locator('body').innerText();

        // Extract OTP (6-digit)
        const otpMatch = bodyText.match(/\b\d{6}\b/);

        if (!otpMatch) throw new Error('OTP not found');

        return otpMatch[0];
    }

    test('Login with Yopmail OTP', async ({ browser }) => {
        const page = await browser.newPage();

        const email = 'testuser@yopmail.com';

        await page.goto('https://example.com/login');

        // Trigger OTP
        await page.fill('#email', email);
        await page.click('#send-otp');

        // Wait for email to arrive
        await page.waitForTimeout(5000);

        // Open new tab for Yopmail
        const yopmailPage = await browser.newPage();

        const otp = await getOtpFromYopmail(yopmailPage, 'testuser');

        console.log('OTP:', otp);

        // Enter OTP
        await page.fill('#otp', otp);
        await page.click('#verify');

        await expect(page).toHaveURL(/dashboard/);
    });

}

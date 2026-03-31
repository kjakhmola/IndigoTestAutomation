import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";



let homePage;
test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.gotoHomePage();
});

test('verify booking widget is visble', async ({ page }) => {

    await expect(await homePage.bookingWidgetFightText()).toBe('Flights');
    await expect(await homePage.fromText()).toContain('Delhi');

});

test('verify user is able to fill departure city', async ({ page }) => {
    await homePage.selectSource('mumbai');

    await expect(await homePage.fromText()).toContain('Mumbai');


})
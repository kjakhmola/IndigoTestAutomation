import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import {SearchResultpage} from '../pages/SearchResultPage';
import {passengerDetailPage} from '../pages/PassengerDetailPage';
import {Addons} from '../pages/AddonsPage';
import { seatSelectionPage } from '../pages/SeatPage';
import {paymentPage} from '../pages/PaymentPage';



test('Guest Booking Flow', async ({ page }) => {

    const homepage = new HomePage(page);
    const searchResultPage = new SearchResultpage(page);
    const passengerDetails = new passengerDetailPage(page);
    const AddMeal = new Addons(page);
    const selectSeat = new seatSelectionPage(page);
    const paymentMethod = new paymentPage(page);

    await homepage.gotoHomePage();

    //await homepage.selectSource('Pune');

    //await homepage.selectDestination('hyderabad');   

    //await homepage.selectDate("25", "July 2026");
    await homepage.selectTripDetails("roundtrip", "25", "July 2026", "29", "July 2026");

    await homepage.clickSearch();

    await searchResultPage.selectEconomyFlight('saver');

    await passengerDetails.enterPassengerDetails("Ankit", "Test", "9411598504", "ankit.x.jakhmola@goindigo.in");

    await AddMeal.addMeal();

    await selectSeat.selectSeat();

    await paymentMethod.toSelectPaymentMethod()


    await page.pause();

});
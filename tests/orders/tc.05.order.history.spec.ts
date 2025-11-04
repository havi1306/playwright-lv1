import { placeOrder as test } from '../../fixtures/order.fixture';

const username = process.env.USER!;
const password = process.env.PASSWORD!;

test('TC05 | Verify orders appear in order history', async ({ homePage, myAccountPage, placeOrder }) => {
    await homePage.navigateToHomePage();
    await homePage.goToMyAccount();
    await myAccountPage.logIn(username, password);

    const firstOrderNumber = await placeOrder();
    const secondOrderNumber = await placeOrder();

    await homePage.goToMyAccount();
    await myAccountPage.goToOrders();
    await myAccountPage.shouldOrderDisplayed(firstOrderNumber);
    await myAccountPage.shouldOrderDisplayed(secondOrderNumber);
})

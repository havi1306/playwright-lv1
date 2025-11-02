import { test } from '../../fixtures/base.fixture';
import { OrderHelper } from '../../utils/order.helper';

const username = process.env.USER!;
const password = process.env.PASSWORD!;

test('TC05 | Verify orders appear in order history', async ({ homePage, myAccountPage, productCategoryPage, productDetailPage, cartPage, checkoutPage, orderStatusPage }) => {
    await homePage.navigateToHomePage();
    await homePage.goToMyAccount();
    await myAccountPage.logIn(username, password);

    const orderHelper = new OrderHelper(homePage, productCategoryPage, cartPage, checkoutPage, productDetailPage, orderStatusPage);
    const firstOrderNumber = await orderHelper.placeOrder();
    const secondOrderNumber = await orderHelper.placeOrder();

    await homePage.goToMyAccount();
    await myAccountPage.goToOrders();
    await myAccountPage.shouldOrderDisplayed(firstOrderNumber);
    await myAccountPage.shouldOrderDisplayed(secondOrderNumber);
})

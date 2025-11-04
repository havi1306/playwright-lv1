import { test } from '../../fixtures/base.fixture';

const username = process.env.USER!;
const password = process.env.PASSWORD!;

test('TC02 | Verify users can buy multiple item successfully', async ({ homePage, myAccountPage, productCategoryPage, cartPage, checkoutPage, orderStatusPage }) => {
    await homePage.navigateToHomePage();
    await homePage.goToMyAccount();
    await myAccountPage.logIn(username, password);
    const products = await productCategoryPage.addMutipleProducts(3);
    await homePage.goToCart();
    await cartPage.shouldMutipleProductDetailsCorrect(products);
    await cartPage.proceedToCheckout();
    await checkoutPage.placeOrder();
    await orderStatusPage.shouldOrderDetailsDisplayed(products);
    await orderStatusPage.shouldConfirmationMessageDisplayed()
})
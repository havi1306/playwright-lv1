import { test } from '../../fixtures/base.fixture';

const username = process.env.USER!;
const password = process.env.PASSWORD!;

const paymentMethods = [
    "Direct bank transfer",
    "Check payments",
    "Cash on delivery"
]

for (const data of paymentMethods) {
    test(`TC03 | Verify users can buy an item using ${data} payment method`, async ({ homePage, myAccountPage, productCategoryPage, productDetailPage, cartPage, checkoutPage, orderStatusPage }) => {
        await homePage.navigateToHomePage();
        await homePage.goToMyAccount();
        await myAccountPage.logIn(username, password);
        await homePage.goToShopPage();
        await productCategoryPage.selectRandomProduct();
        await productDetailPage.addToCart();
        await homePage.goToCart();
        await cartPage.proceedToCheckout();
        await checkoutPage.selectPaymentMethod(data);
        await checkoutPage.placeOrder();
        await orderStatusPage.shouldConfirmationMessageDisplayed();
    })
}
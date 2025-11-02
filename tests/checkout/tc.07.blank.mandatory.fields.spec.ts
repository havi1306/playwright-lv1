import { test } from '../../fixtures/base.fixture';
const username = process.env.USER!;
const password = process.env.PASSWORD!;
const billingDetails = {
    firstName: '',
    lastName: '',
    companyName: 'Agest',
    country: 'United States (US)',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    emailAddress: ''
};

test('TC07 | Ensure proper error handling when mandatory fields are blank', async ({ homePage, myAccountPage, productCategoryPage, productDetailPage, cartPage, checkoutPage, orderStatusPage }) => {
    await homePage.navigateToHomePage();
    await homePage.goToMyAccount();
    await myAccountPage.logIn(username, password);
    await homePage.goToShopPage();
    await productCategoryPage.selectRandomProduct();
    await productDetailPage.addToCart();
    await homePage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInBillingDetails(billingDetails);
    await checkoutPage.placeOrder();
    await checkoutPage.shouldRequiredFieldShowErrorMessages(billingDetails);
    await checkoutPage.shouldRequiredFieldHighlighted(billingDetails);
})
import { test } from '../../fixtures/base.fixture';

const billingDetails = {
    firstName: 'Ha',
    lastName: 'Vi',
    companyName: 'Agest',
    country: 'United States (US)',
    streetAddress: '123 TQT',
    city: 'Da Nang',
    state: 'California',
    zipCode: '',
    phoneNumber: '123-456-7890',
    emailAddress: 'vi.pham@agest.vn'
};

test('TC06 | Verify users try to buy an item without logging in (As a guest)', async ({ homePage, productCategoryPage, productDetailPage, cartPage, checkoutPage, orderStatusPage }) => {
    await homePage.navigateToHomePage();
    await homePage.goToShopPage();
    await productCategoryPage.selectRandomProduct();
    await productDetailPage.addToCart();
    await homePage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInBillingDetails(billingDetails);
    await checkoutPage.placeOrder();
    await orderStatusPage.shouldConfirmationMessageDisplayed();
})
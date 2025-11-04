import { test } from '../../fixtures/base.fixture';

const username = process.env.USER!;
const password = process.env.PASSWORD!;
const billingDetails = {
    firstName: 'Ha',
    lastName: 'Vi',
    companyName: 'Agest',
    country: 'United States (US)',
    streetAddress: '123 TQT',
    city: 'Da Nang',
    state: 'California',
    zipCode: '12345',
    phoneNumber: '123-456-7890',
    emailAddress: 'vi.pham@agest.vn'
};

test('TC01 | Verify users can buy an item successfully', async ({ homePage, myAccountPage, productCategoryPage, productDetailPage, cartPage, checkoutPage, orderStatusPage }) => {
    await homePage.navigateToHomePage();
    await homePage.goToMyAccount();
    await myAccountPage.logIn(username, password);
    await homePage.selectElectronicComponentsCategory();
    await productCategoryPage.shouldGridViewDisplayed();
    await productCategoryPage.switchViewTo('List');
    await productCategoryPage.shouldListViewDisplayed();
    await productCategoryPage.selectRandomProduct();
    await productDetailPage.addToCart();
    const product = await productDetailPage.getProduct();
    await homePage.goToCart();
    await cartPage.shouldProductDetailsCorrect(product);
    await cartPage.proceedToCheckout();
    await checkoutPage.shouldCheckoutPageDisplayed();
    await checkoutPage.fillInBillingDetails(billingDetails);
    await checkoutPage.placeOrder();
    await orderStatusPage.shouldOrderStatusPageDisplayed();
    await orderStatusPage.shouldOrderDetailsCorrect(product);
    await orderStatusPage.shouldConfirmationMessageDisplayed()
    await orderStatusPage.shouldBillingDetailsCorrect(billingDetails);
})
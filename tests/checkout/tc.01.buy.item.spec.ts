import { test } from '../../fixtures/base.fixture';

test('TC01 | Verify users can buy an item successfully', async ({ homePage, myAccountPage, productCategoryPage, productDetailPage, cartPage, checkoutPage, orderStatusPage }) => {
    await homePage.navigateToHomePage();
    await homePage.goToMyAccount();
    await myAccountPage.logIn('vi.pham@agest.vn', 'havi123');
    await homePage.selectElectronicComponentsCategory();
    await productCategoryPage.shouldGridViewDisplayed();
    await productCategoryPage.clickListView();
    await productCategoryPage.shouldListViewDisplayed();
    await productCategoryPage.selectRandomProduct();
    await productDetailPage.addToCart();
    const product = await productDetailPage.getProduct();
    await homePage.goToCart();
    await cartPage.shouldProductDetailsCorrect(product);
    await cartPage.proceedToCheckout();
    await checkoutPage.shouldCheckoutPageDisplayed();
    const billingDetails = await checkoutPage.getBillingDetails();
    await orderStatusPage.placeOrder();
    await orderStatusPage.shouldOrderStatusPageDisplayed();
    await orderStatusPage.shouldOrderDetailsCorrect(product);
    await orderStatusPage.shouldConfirmationMessageDisplayed()
    await orderStatusPage.shouldBillingDetailsCorrect(billingDetails);
})
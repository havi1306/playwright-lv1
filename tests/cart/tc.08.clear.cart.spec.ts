import { test } from '../../fixtures/base.fixture';

const username = process.env.USER!;
const password = process.env.PASSWORD!;

test('TC08 | Verify users can clear the cart', async ({ homePage, myAccountPage, productCategoryPage, productDetailPage, cartPage }) => {
    await homePage.navigateToHomePage();
    await homePage.goToMyAccount();
    await myAccountPage.logIn(username, password);
    await homePage.goToShopPage();
    await productCategoryPage.selectRandomProduct();
    await productDetailPage.addToCart();
    const product = await productDetailPage.getProduct();
    await homePage.goToCart();
    await cartPage.shouldProductDetailsCorrect(product);
    await cartPage.clearShoppingCart();
    await cartPage.shouldCartEmptyMessageDisplayed();
})
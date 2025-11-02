import { test } from '../../fixtures/base.fixture';

const username = process.env.USER!;
const password = process.env.PASSWORD!;

test('TC09 | Verify users can update quantity of product in cart', async ({ homePage, myAccountPage, productCategoryPage, productDetailPage, cartPage }) => {
    await homePage.navigateToHomePage();
    await homePage.goToMyAccount();
    await myAccountPage.logIn(username, password);
    await homePage.goToShopPage();
    await productCategoryPage.selectRandomProduct();
    await productDetailPage.addToCart();
    const product = await productDetailPage.getProduct();
    await homePage.goToCart();
    await cartPage.shouldQuantityAndSubTotalCorrect(product);
    await cartPage.plusProduct(product);
    await cartPage.shouldQuantityAndSubTotalCorrect(product);
    await cartPage.enterQuantityTextbox(product, 4);
    await cartPage.minusProduct(product);
    await cartPage.shouldQuantityAndSubTotalCorrect(product);
})
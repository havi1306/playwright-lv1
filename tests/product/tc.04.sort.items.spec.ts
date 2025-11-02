import { SortType } from '../../data/sort-type.enum';
import { test } from '../../fixtures/base.fixture';

const username = process.env.USER!;
const password = process.env.PASSWORD!;

test('TC04 | Verify users can sort items by price', async ({ homePage, myAccountPage, productCategoryPage, productDetailPage, cartPage, checkoutPage, orderStatusPage }) => {
    await homePage.navigateToHomePage();
    await homePage.goToMyAccount();
    await myAccountPage.logIn(username, password);
    await homePage.goToShopPage();
    await productCategoryPage.switchViewTo('List');
    await productCategoryPage.sortBy(SortType.PRICE_LOW_TO_HIGH);
    await productCategoryPage.shouldOrderOfItemsSortCorrect(SortType.PRICE_LOW_TO_HIGH);
    await productCategoryPage.sortBy(SortType.PRICE_HIGH_TO_LOW);
    await productCategoryPage.shouldOrderOfItemsSortCorrect(SortType.PRICE_HIGH_TO_LOW);
})
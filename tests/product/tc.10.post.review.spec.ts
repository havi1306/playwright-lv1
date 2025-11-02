import { test } from '../../fixtures/base.fixture';
import { randomInt, randomText } from '../../utils/utils';

const username = process.env.USER!;
const password = process.env.PASSWORD!;

test('TC10 | Verify users can post a review', async ({ homePage, myAccountPage, productCategoryPage, productDetailPage }) => {
    await homePage.navigateToHomePage();
    await homePage.goToMyAccount();
    await myAccountPage.logIn(username, password);
    await homePage.goToShopPage();
    await productCategoryPage.selectRandomProduct();
    await productDetailPage.goToReview();
    const numberOfReviews = await productDetailPage.getNumberOfReviews();
    const reviewContent = await randomText(10);
    const ratingStar = await randomInt(1, 5);
    await productDetailPage.submitReview(reviewContent, ratingStar);
    await productDetailPage.goToReview();
    await productDetailPage.shouldReviewSuccessfullyDisplayed(reviewContent, ratingStar);
    await productDetailPage.shouldNumberOfReviewsCorrect(numberOfReviews + 1);
})
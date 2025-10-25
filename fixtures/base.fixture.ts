import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { MyAccountPage } from '../pages/my-account.page';
import { ProductCategoryPage } from '../pages/product-category.page';
import { ProductDetailPage } from '../pages/product-detail.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { OrderStatusPage } from '../pages/order-status.page';

type Pages = {
    homePage: HomePage;
    myAccountPage: MyAccountPage;
    productCategoryPage: ProductCategoryPage;
    productDetailPage: ProductDetailPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    orderStatusPage: OrderStatusPage;
}

export const test = baseTest.extend<Pages>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },
    productCategoryPage: async ({ page }, use) => {
        await use(new ProductCategoryPage(page));
    },
    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    orderStatusPage: async ({ page }, use) => {
        await use(new OrderStatusPage(page));
    }
});
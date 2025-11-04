import { test as base } from './base.fixture';

type OrderFixtures = {
    placeOrder: () => Promise<string>;
}

const placeOrder = base.extend<OrderFixtures>({
    placeOrder: async ({ homePage, productCategoryPage, productDetailPage, cartPage, checkoutPage, orderStatusPage }, use) => {
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

        const placedOrder = async (): Promise<string> => {
            await homePage.goToShopPage();
            await productCategoryPage.selectRandomProduct();
            await productDetailPage.addToCart();
            await homePage.goToCart();
            await cartPage.proceedToCheckout();
            await checkoutPage.fillInBillingDetails(billingDetails);
            await checkoutPage.placeOrder();
            return await orderStatusPage.getOrderNumber();
        };

        await use(placedOrder);
    }
});

export { placeOrder }



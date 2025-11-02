import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { HomePage } from "../pages/home.page";
import { OrderStatusPage } from "../pages/order-status.page";
import { ProductCategoryPage } from "../pages/product-category.page";
import { ProductDetailPage } from "../pages/product-detail.page";

const billingDetails = {
    firstName: 'Ha',
    lastName: 'Vi',
    companyName: 'Agest',
    streetAddress: '123 TQT',
    city: 'Da Nang',
    phoneNumber: '123-456-7890',
    emailAddress: 'vi.pham@agest.vn'
};

class OrderHelper {
    readonly homePage: HomePage;
    readonly productCategoryPage: ProductCategoryPage;
    readonly cartPage: CartPage;
    readonly checkoutPage: CheckoutPage;
    readonly productDetailPage: ProductDetailPage;
    readonly orderStatusPage: OrderStatusPage;

    constructor(
        homePage: HomePage,
        productCategoryPage: ProductCategoryPage,
        cartPage: CartPage,
        checkoutPage: CheckoutPage,
        productDetailPage: ProductDetailPage,
        orderStatusPage: OrderStatusPage
    ) {
        this.homePage = homePage;
        this.checkoutPage = checkoutPage;
        this.cartPage = cartPage;
        this.productCategoryPage = productCategoryPage;
        this.productDetailPage = productDetailPage;
        this.orderStatusPage = orderStatusPage;
    }

    async placeOrder(): Promise<string> {
        await this.homePage.goToShopPage();
        await this.productCategoryPage.selectRandomProduct();
        await this.productDetailPage.addToCart();
        await this.homePage.goToCart();
        await this.cartPage.proceedToCheckout();
        await this.checkoutPage.fillInBillingDetails(billingDetails);
        await this.checkoutPage.placeOrder();
        return await this.orderStatusPage.getOrderNumber();
    }
}

export { OrderHelper }


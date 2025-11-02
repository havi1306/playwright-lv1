class Product {
    readonly productTitle: string;
    readonly productPrice: string;
    private productQuantity_: number;

    constructor(title: string, price: string) {
        this.productTitle = title;
        this.productPrice = price;
        this.productQuantity_ = 1;
    }
    get productQuantity(): number {
        return this.productQuantity_;
    }
    set productQuantity(quantity: number) {
        this.productQuantity_ = quantity;
    }

    getSubTotal(): string {
        const priceNumber = parseFloat(this.productPrice.replace('$', ''));
        const subtotal = priceNumber * this.productQuantity_;
        return `$${subtotal.toFixed(2)}`;
    }
}
export { Product };
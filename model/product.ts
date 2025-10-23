class Product {
    readonly productTitle: string;
    readonly productPrice: string;

    constructor(title: string, price: string) {
        this.productTitle = title;
        this.productPrice = price;
    }
}
export { Product };
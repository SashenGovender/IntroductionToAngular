export class Product {
    productName: string
    category: string
    freshness: string
    price: number
    comment: string
    date: Date
    id!: number

    constructor(productName: string, category: string, freshness: string, price: number, comment: string, date: Date) {
        this.productName = productName;
        this.category = category;
        this.freshness = freshness;
        this.price = price;
        this.comment = comment;
        this.date = date;
    }

}

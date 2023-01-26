export function discountHandler(discount: number, price: number): number {
    if (discount > 0) {
        const discountPrice = price - (price * (discount / 100))
        return discountPrice
    }
    return price
}
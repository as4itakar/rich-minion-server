import { returnProduct } from "src/products/dto/return-product"

export const returnOrderItems = {
    id: true,
    quantity: true,
    price: true,
    product: {
        select: returnProduct
    }
}

export const returnOrder = {
    id: true,
    status: true,
    items: {
        select: returnOrderItems
    }
}
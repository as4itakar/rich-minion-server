import { returnProduct } from "../../products/dto/return-product";

export const returnProfile = {
    id: true,
    name: true,
    phone: true,
    city: true, 
    address: true,
    image: true,
    select: {
        favorites: {
            select: {
                product: returnProduct
            }
        }
    }
}
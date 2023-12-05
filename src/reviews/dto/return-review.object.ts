export const returnReview = {
    id: true,
    rating: true,
    text: true,
    user: {
        select: {
            email: true
        }
    }
}
export async function load({ params }) {
    const ID = params.restaurantId
    return {
        id: {
            restaurantID: ID
        }
    }
}
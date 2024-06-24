
export interface IRestaurantSearchRequest {
    time: Date,
    eaters: string[]
}

export interface IRestaurantSearchResponse {
    restaurants: string[]
}
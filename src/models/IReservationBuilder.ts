
export interface IReservationBuilder {

    getAvailableRestaurants(time: Date, eaters: string[]): Promise<String[]>

}
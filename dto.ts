
export interface HotelQuery {
    hotel_id? : number|number[];
    hotel_name?: string|object,
    hotel_type?: string|object,
    hotel_location?: string|object
}

export interface SearchQuery extends HotelQuery {
    check_in_date_start: string,
    check_in_date_end: string,
}


export interface YanoljaHotel {
    hotel_id: number,
    hotel_name: string,
    hotel_type?: string,
    hotel_location?: string,
    hotel_star?: number
}

export interface YanolJaRoomPrice{
    key : string,
    series_key : string,
    hotel_id : number,
    room_id : number,
    search_datetime : string,
    check_in_date : string,
    check_out_date : string,
    price : number,
    original_price : number,
    sale_price : number,
}
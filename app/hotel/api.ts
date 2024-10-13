import clientPromise from "../../lib/mongodb";

interface HotelQuery {
    hotel_name?: string,
    hotel_type?: string,
    hotel_location?: string
}

interface YanoljaHotel {
    hotel_id: number,
    hotel_name: string,
    hotel_type?: string,
    hotel_location?: string,
    hotel_star?: number
}

export async function fetchHotel(query: HotelQuery): Promise<YanoljaHotel[]> {
    if (query === null) query = {}
    const client = await clientPromise
    const data = await client.db("yanolja").collection<YanoljaHotel>("yanolja_hotel").find(query).toArray();
    return data.map(hotel => (
        {
            ...hotel,
            _id: hotel.hotel_id,
        }
    ))
}
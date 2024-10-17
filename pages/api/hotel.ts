import clientPromise from "../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import * as dto from "../../dto"


export async function getHotel(hotelQuery: dto.HotelQuery): Promise<dto.YanoljaHotel[]> {
    const client = await clientPromise;
    const query : object = {}

    if(hotelQuery.hotel_name !== undefined && hotelQuery.hotel_name !== null){
        query["hotel_name"] = {$regex: hotelQuery.hotel_name}
    }
    if(hotelQuery.hotel_type !== undefined && hotelQuery.hotel_type !== null){
        query["hotel_type"] = {$regex: hotelQuery.hotel_type}
    }
    if (hotelQuery.hotel_location !== undefined && hotelQuery.hotel_location !== null){
        query["hotel_location"] = {$regex: hotelQuery.hotel_location}
    }

    const data = await client.db("yanolja").collection<dto.YanoljaHotel>("yanolja_hotel").find(query, {projection : {_id : 0}}).toArray();
    return data.map(hotel => (
        {
            ...hotel,
            _id: hotel.hotel_id,
        }
    ))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        const data = await getHotel(req.query);
        res.status(200).json(data);
    }
    if (req.method == "POST") {

    }
}
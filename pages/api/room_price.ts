import {NextApiRequest, NextApiResponse} from "next";
import * as dto from "../../dto"
import clientPromise from "@/lib/mongodb";
import{getHotel} from "./hotel"
import {Filter} from "mongodb";
import {YanolJaRoomPrice} from "../../dto";
export async function getYanolJaRoomPrice(searchQuery: dto.SearchQuery): Promise<dto.YanolJaRoomPrice> {
    const client = await clientPromise;

    const hotel_list = (await getHotel(searchQuery)).map((hotel)=>hotel.hotel_id);
    const query : Filter<dto.YanolJaRoomPrice> = {
        hotel_id :{ $in : hotel_list },
        check_in_date : {$gte : searchQuery.check_in_date_start, $lte : searchQuery.check_in_date_end},
    }
    if(hotel_list.length > 0){
        delete query.hotel_id
    }

    const data :YanolJaRoomPrice[] = await client
        .db("yanolja").collection<dto.YanolJaRoomPrice>("yanolja_room_price")
        .find(query, { projection: { _id: 0 } }).toArray()

    return data;

}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
            const data = await getYanolJaRoomPrice(req.query);
        res.status(200).json(data)
    }


}
import {NextApiRequest, NextApiResponse} from "next";
import * as dto from "../../dto"
import clientPromise from "@/lib/mongodb";
import {Filter} from "mongodb";
import {YanolJaRoomPrice} from "../../dto";

export async function getYanolJaRoomPrice(searchQuery: dto.SearchQuery): Promise<YanolJaRoomPrice[]> {
    if(!searchQuery || searchQuery.hotel_id_list === undefined || searchQuery.hotel_id_list.length === null ) {
        return [];
    }

    searchQuery.hotel_id_list = searchQuery.hotel_id_list.split(",");
    const client = await clientPromise;

    const query: Filter<dto.YanolJaRoomPrice> = {
        hotel_id: {$in: searchQuery.hotel_id_list},
        check_in_date: {$gte: searchQuery.check_in_date_start, $lte: searchQuery.check_in_date_end},
    }

    if (searchQuery.hotel_id_list === undefined || searchQuery.hotel_id_list === null || searchQuery.hotel_id_list.length == 0) {
        delete query.hotel_id
    }

    const data: YanolJaRoomPrice[] = await client
        .db("yanolja").collection<dto.YanolJaRoomPrice>("yanolja_room_price")
        .find(query, {projection: {_id: 0}}).sort({search_datetime : -1}).toArray()

    return data;

}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        const data = await getYanolJaRoomPrice(req.query);
        res.status(200).json(data)
    }

}
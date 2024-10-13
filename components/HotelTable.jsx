
import {Table} from "antd";

import clientPromise from "../lib/mongodb"

// export interface YanoljaHotel {
//     hotel_id: number,
//     hotel_name: string,
//     hotel_type: string,
//     hotel_location: string
// }

let columns = [
    // {name: "hotel_id", dataIndex: "hotel_id", key: "hotel_id"},
    // {name: "hotel_name", dataIndex: "hotel_name", key: "hotel_name"},
    // {name: "hotel_type", dataIndex: "hotel_type", key: "hotel_type"},
    // {name: "hotel_location", dataIndex: "hotel_location", key: "hotel_location"},
    {name : "name", dataIndex : "name", key: "name" },
]

export default async function HotelTable() {

    const client = await clientPromise;
    const db = client.db("yanolja")
    const hotelList = await db
        .collection("yanolja_hotel")
        .find({}).toArray()

    const dataSource= hotelList.map((hotel) => ({
                name : `[${hotel.hotel_type}]${hotel.hotel_name}`,
            })
        );

    return (
        <>
            <Table dataSource={dataSource} columns={columns}>
            </Table>
        </>
    )
}

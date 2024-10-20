import YanolJaRoomPrice from "../dto"
import {Table} from "antd";
import React from "react";

interface Props {
    roomPriceList: YanolJaRoomPrice[]
}

const roomPriceColumns = [
    {key: "hotel_id", title: "hotel_id", dataIndex: "hotel_id"},
    {key: "room_id", title: "room_id", dataIndex: "room_id"},
    {key: "check_in_date", title: "check_in_date", dataIndex: "check_in_date"},
    {key: "series_key", title: "series_key", dataIndex: "series_key"},
    {key: "search_datetime", title: "search_datetime", dataIndex: "search_datetime"},
    {key: "price", title: "price", dataIndex: "price"},
    {key: "sold_out", title: "sold_out", dataIndex: "sold_out"},
]

const RoomPriceTable: React.FC<Props> = ({roomPriceList}) => {

    return (
        <>
            <Table columns={roomPriceColumns} dataSource={roomPriceList}>

            </Table>
        </>
    )

}

export default RoomPriceTable;
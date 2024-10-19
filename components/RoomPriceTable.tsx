import YanolJaRoomPrice from "../dto"
import {Table} from "antd";
import React from "react";

interface Props {
    roomPriceList: YanolJaRoomPrice[]
}

const roomPriceColumns = [
    {key: "series_key", name: "series_key", dataIndex: "series_key"},
    {key: "search_datetime", name: "search_datetime", dataIndex: "search_datetime"},
    {key: "check_in_date", name: "check_in_date", dataIndex: "check_in_date"},
    {key: "price", name: "price", dataIndex: "price"},
    {key: "sold_out", name: "sold_out", dataIndex: "sold_out"},
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

import {Table, message} from "antd";
import {useEffect, useState} from "react";

const columns = [
    {name: "name", dataIndex: "name", key: "name"},
]

export default function HotelTable() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onRow = (record) => {
        return {
            onClick: (event) => {
                message.info("클릭성공");
            }
        }
    }
    let [dataSource, setDataSource] = useState([]);
    useEffect( () => {
        const fetchHotel = async () =>{
            const response = await fetch("/api/hotel", {
                method: "GET",
                headers : {
                    "Content-Type": "application/json",
                }
            })
            const hotelList = await response.json();
            dataSource = hotelList.map((hotel) => ({
                    name: `[${hotel.hotel_type}]${hotel.hotel_name}`,
                    key: hotel.hotel_id,
                    dataIndex: hotel.hotel_id
                })
            );
            setDataSource(dataSource);
        }
        fetchHotel()
    }, []);

    return (
        <>
            <Table dataSource={dataSource} columns={columns} onRow={onRow}>
            </Table>
        </>
    )
}

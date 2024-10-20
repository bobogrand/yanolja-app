import React, {useEffect} from "react";
import {Button, Card, Col, DatePicker, Layout, message, Row, Select, Space} from "antd"
import {SearchQuery} from "@/dto";
import {YanoljaHotel, YanolJaRoomPrice} from "../dto"
import RoomPriceTable from "@/components/RoomPriceTable";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;


const IndexPage: React.FC = () => {
    const [sideOpen, setSideOpen] = React.useState(false);

    const [searchQuery, setSearchQuery] = React.useState<SearchQuery>({
        hotel_id_list : [], check_in_date_end: null, check_in_date_start: null
    })
    const [hotelList, setHotelList] = React.useState<YanoljaHotel[]>([])
    const [roomPriceList, setRoomPriceList] = React.useState<YanolJaRoomPrice[]>([])

    const onChangeRangePicker = (dateList: Date[], dateStrings: [string, string]) => {
        // let query = Object.assign(searchQuery)
        setSearchQuery((value) => ({
            ...value,
            check_in_date_start: dateStrings[0],
            check_in_date_end: dateStrings[1],
        }))
    }
    const onClickSearchButton = () => {
        let query = new URLSearchParams(searchQuery)
        var loading = message.loading("검색중")
        fetch(`/api/room_price?${query}`)
            .then(res => {
                if(res.status !== 200)
                    throw new Error("HTTP IS NOT 200")
                return res.json()
            })
            .then(json => {
                setRoomPriceList(json)
                message.info(json.length + "개 검색되었습니다.", 1000)
            }).finally(error=>{
                message.error(error)
            })
            .finally(()=>{
                loading()
            })

    }
    const onChangeSelectOption = (hotel_id_list: number[]) => {
        setSearchQuery(value => (
            {
                ...value,
                hotel_id_list: hotel_id_list
            }
        ));
    }

    useEffect(() => {
        fetch("/api/hotel")
            .then(response => response.json())
            .then(json => {
                setHotelList(json)
            })
    }, []);

    useEffect(() => {
        fetch("/api/room_price")
            .then(response => response.json())
            .then(json => {
                setRoomPriceList(json)
            })
    }, [searchQuery]);

    return (
        <>
            <Layout hasSider={true}>
                <Layout.Content>
                    <RoomPriceTable roomPriceList={roomPriceList}>

                    </RoomPriceTable>
                </Layout.Content>
                <Layout.Sider collapsible collapsed={sideOpen} onCollapse={() => setSideOpen(!sideOpen)}
                              style={{backgroundColor: "white"}} width={'350px'}>
                    <Space direction="vertical">
                        <Card title={"검색영역"} extra={(<Button type={"primary"} onClick={onClickSearchButton}>검색</Button>)}>
                            <Space direction={"vertical"}>
                                <div>체크인</div>
                                <DatePicker.RangePicker onChange={onChangeRangePicker}/>

                                <Select
                                    onChange={onChangeSelectOption}
                                    mode={"multiple"} style={{width: '100%', maxWidth: '292px'}} allowClear={true}>
                                    {hotelList.map((item: YanoljaHotel, index: number) => (
                                        <Select.Option key={index} value={item.hotel_id}>
                                            {`[${item.hotel_type}] ${item.hotel_name}`}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>
                        </Card>
                    </Space>
                </Layout.Sider>
            </Layout>
        </>
    )
}

export default IndexPage;
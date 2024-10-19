import React, {useEffect} from "react";
import {Button, Card, Col, DatePicker, Layout, List, Row, Space, Table} from "antd"
import {SearchQuery} from "@/dto";
import {YanoljaHotel, YanolJaRoomPrice} from "../dto"


const IndexPage: React.FC = () => {
    const [sideOpen, setSideOpen] = React.useState(false);

    const [searchQuery, setSearchQuery] = React.useState<SearchQuery>({})
    const [hotelList, setHotelList] = React.useState<YanoljaHotel[]>([])
    const [roomPriceList, setRoomPriceList] = React.useState<YanolJaRoomPrice[]>([])

    const onChangeRangePicker = (start: Date, end: Date) => {
        // let query = Object.assign(searchQuery)
        searchQuery.check_in_date_start = start
        searchQuery.check_in_date_end = end
        setSearchQuery(searchQuery)
    }

    const onClickSearchButton = () => {
        let query = new URLSearchParams(searchQuery)
        fetch(`/api/room_price?${query}`)
            .then(res => res.json())
            .then(json => {
                setRoomPriceList(json)
            })
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


                </Layout.Content>
                <Layout.Sider collapsible collapsed={sideOpen} onCollapse={() => setSideOpen(!sideOpen)}
                              style={{backgroundColor: "white"}} width={"350px"}>
                    <Card title={"검색영역"} extra={(<Button type={"primary"}>검색</Button>)}>
                        <Col>
                            <Space direction={"vertical"}>
                            <Row gutter={[16, 16]}>
                                <DatePicker.RangePicker>
                                </DatePicker.RangePicker>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <List size={"small"}>
                                    {
                                        hotelList.map(hotel =>
                                            <List.Item key={hotel.hotel_id}>
                                                {`[${hotel.hotel_type}] ${hotel.hotel_name}`}
                                            </List.Item>
                                        )
                                    }
                                </List>
                            </Row>
                            </Space>
                        </Col>
                    </Card>

                </Layout.Sider>
            </Layout>
        </>
    )
}

export default IndexPage;
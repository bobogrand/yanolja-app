import HotelTable from "@/components/HotelTable";
import {Col, Row} from "antd";

export default function Home() {
    return (<>
        <Row>
            <Col span={20}></Col>
            <Col span={4}>
                <HotelTable></HotelTable>
            </Col>
        </Row>
        </>
    );
}

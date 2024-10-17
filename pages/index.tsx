import React from "react";
import {Layout} from "antd"
import HotelTable from "@/components/HotelTable";

const IndexPage : React.FC = () =>{
    return (
        <>
            {/*야옹이다옹*/}
        <Layout hasSider={true}>
             <Layout.Content><h1>컨텐트</h1></Layout.Content>
             <Layout.Sider>
                 <HotelTable></HotelTable>
             </Layout.Sider>
         </Layout>
        </>
    )
}

export default IndexPage;
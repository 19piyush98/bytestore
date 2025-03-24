import React from "react";
import { Layout, Row, Col, Typography, Divider } from "antd";
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, InstagramOutlined } from "@ant-design/icons";
import logo from "../assets/logo.jpeg";

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterComponent = () => {
  return (
    <Footer style={{ backgroundColor: "#001529", color: "white", padding: "40px 20px" }}>
      <Row justify="center" gutter={[32, 32]}>
        {/* Logo Section */}
        <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
          <img src={logo} alt="Bytestore Logo" style={{ width: "120px" }} />
        </Col>

        {/* Solutions */}
        <Col xs={12} sm={6} md={4}>
          <Title level={5} style={{ color: "white" }}>Solutions</Title>
          <Text style={{ display: "block", color: "#ccc" }}>Marketing</Text>
          <Text style={{ display: "block", color: "#ccc" }}>Analytics</Text>
          <Text style={{ display: "block", color: "#ccc" }}>Automation</Text>
          <Text style={{ display: "block", color: "#ccc" }}>Commerce</Text>
          <Text style={{ display: "block", color: "#ccc" }}>Insights</Text>
        </Col>

        {/* Support */}
        <Col xs={12} sm={6} md={4}>
          <Title level={5} style={{ color: "white" }}>Support</Title>
          <Text style={{ display: "block", color: "#ccc" }}>Submit ticket</Text>
          <Text style={{ display: "block", color: "#ccc" }}>Documentation</Text>
          <Text style={{ display: "block", color: "#ccc" }}>Guides</Text>
        </Col>

        {/* Company */}
        <Col xs={12} sm={6} md={4}>
          <Title level={5} style={{ color: "white" }}>Company</Title>
          <Text style={{ display: "block", color: "#ccc" }}>About</Text>
          <Text style={{ display: "block", color: "#ccc" }}>Blog</Text>
          <Text style={{ display: "block", color: "#ccc" }}>Jobs</Text>
          <Text style={{ display: "block", color: "#ccc" }}>Press</Text>
        </Col>

        {/* Legal */}
        <Col xs={12} sm={6} md={4}>
          <Title level={5} style={{ color: "white" }}>Legal</Title>
          <Text style={{ display: "block", color: "#ccc" }}>Terms of service</Text>
          <Text style={{ display: "block", color: "#ccc" }}>Privacy policy</Text>
          <Text style={{ display: "block", color: "#ccc" }}>License</Text>
        </Col>
      </Row>

      {/* Divider */}
      <Divider style={{ borderColor: "#444" }} />

      {/* Bottom Section */}
      <Row justify="center" align="middle">
        <Col span={24} style={{ textAlign: "center" }}>
          <Text style={{ color: "#ccc" }}>&copy; 2025 ByteStore, Inc. All rights reserved.</Text>
        </Col>
      </Row>

      {/* Social Media Icons */}
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col>
          <FacebookOutlined style={{ fontSize: "24px", color: "white", margin: "0 15px", cursor: "pointer" }} />
          <TwitterOutlined style={{ fontSize: "24px", color: "white", margin: "0 15px", cursor: "pointer" }} />
          <LinkedinOutlined style={{ fontSize: "24px", color: "white", margin: "0 15px", cursor: "pointer" }} />
          <InstagramOutlined style={{ fontSize: "24px", color: "white", margin: "0 15px", cursor: "pointer" }} />
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;

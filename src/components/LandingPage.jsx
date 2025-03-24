import React, { useState } from "react";
import { Layout, Menu, Button, Modal, Typography } from "antd";
import { HomeOutlined, PhoneOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import AuthPage from "./AuthPage";
import logo from "../assets/logo.jpeg"; 

const { Header, Content } = Layout;
const { Title } = Typography;

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "#", icon: <HomeOutlined /> },
    { name: "Contact", href: "#", icon: <PhoneOutlined /> },
    { name: "About", href: "#", icon: <InfoCircleOutlined /> }
  ];

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          backgroundColor: "#001529"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="ByteStore Logo" style={{ height: 50, marginRight: 10 }}/>
          <Title level={3} style={{ color: "white", margin: 0 }}>
            ByteStore
          </Title>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          style={{ flex: 1, justifyContent: "center" }}
          items={navigation.map((item, index) => ({
            key: index,
            icon: item.icon,
            label: <a href={item.href} style={{ color: "white" }}>{item.name}</a>
          }))}
        />

        <Button type="primary" size="large" onClick={() => setIsOpen(true)}>
          Login
        </Button>
      </Header>

      <Content style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
        <HeroSection setIsOpen={setIsOpen} />
      </Content>

      <Footer />

      <Modal
        title="Login"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        centered
      >
        <AuthPage setIsOpen={setIsOpen} />
      </Modal>
    </Layout>
  );
};

export default LandingPage;

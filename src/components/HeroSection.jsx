import { Button, Typography, Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import logo from "../assets/logo.jpeg";
import '../css/LandingPage.css'


const { Title, Paragraph, Text } = Typography;

const HeroSection = ({ setIsOpen }) => {
  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "60px 20px" }}>
      <Row justify="center" align="middle" gutter={[32, 32]}>
        {/* Left Section - Text Content */}
        <Col xs={24} md={12}>
          <Title level={2} style={{ color: "#333" }}>
            Boost Your Productivity
          </Title>
          <Title level={4} style={{ color: "#666" }}>
            Start using Bytestore today.
          </Title>
          <Paragraph style={{ fontSize: "16px", color: "#555", maxWidth: "500px" }}>
            Bytestore is a powerful data management and analysis platform that helps you easily organize, understand, and extract value from your data.
            Transform raw data into actionable insights with Bytestore's intuitive interface and advanced features.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() => setIsOpen(true)}
            style={{ marginTop: "15px" }}
          >
            Sign Up Today
          </Button>
        </Col>

        {/* Right Section - Logo */}
        <Col xs={24} md={12} style={{ textAlign: "center" }}>
          <img src={logo} alt="ByteStore Logo" className="logo-image" />

        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col>
          <Text strong style={{ color: "#888", fontSize: "16px" }}>
            Made with ❤️ by Priyanshu & Harsh
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default HeroSection;

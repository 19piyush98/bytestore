import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import logo from "../../assets/logo.jpeg";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  ApartmentOutlined,
  AuditOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Typography, Avatar } from "antd";
import AllUsers from "./AllUsers";
import AllProducts from "./AllProducts";
import Organisation from "./Organisation";
import AuditLogs from "./AuditLogs";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [userName, setUserName] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = location.state?.userId;
        if (!userId) throw new Error("User ID is missing.");

        const response = await fetch(
          `https://bytestore-backend-production.up.railway.app/byteStore/users/get/${userId}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user data");
        }

        const data = await response.json();
        setData(data);
        setUserName(data.user.userName);
        setError(null);

        navigate("/dashboard", {
          state: { ...location.state, orgName: data.orgName },
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      }
    };

    fetchUserData();
  }, [reload, location.state?.userId]);

  useEffect(() => {
    if (selectedKey === "7") {
      navigate("/", { replace: true });
      window.history.replaceState(null, "", "/");
    }
  }, [selectedKey]);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ background: "#001529", height: "100vh" }}
      >
        <div style={{ textAlign: "center", padding: "16px" }}>
          <Avatar size={collapsed ? 40 : 64} icon={<UserOutlined />} />
          {!collapsed && (
            <Title level={5} style={{ color: "#fff", marginTop: "10px" }}>
              {userName}
            </Title>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleMenuClick}
          items={[
            { key: "1", icon: <UserOutlined />, label: "Dashboard" },
            { key: "2", icon: <ShoppingCartOutlined />, label: "Products" }, // Added Products
            { key: "3", icon: <AuditOutlined />, label: "Audit Logs" },
            { key: "4", icon: <UsergroupAddOutlined />, label: "Members" },
            { key: "5", icon: <ApartmentOutlined />, label: "Organization" },
            { key: "6", icon: <SettingOutlined />, label: "Settings" },
            { key: "7", icon: <LogoutOutlined />, label: "Logout" },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: "0 20px", background: "#fff", display: "flex", alignItems: "center" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", marginRight: "16px" }}
          />
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}> {/* Centered the logo */}
            <img src={logo} alt="Bytestore Logo" style={{ height: "40px" }} />
          </div>
        </Header>

        <Content style={{ margin: "24px", padding: "24px", background: "#fff", borderRadius: "8px" }}>
          {selectedKey === "1" && data && <UserDetails data={data} setReload={setReload} reload={reload} />}
          {selectedKey === "2" && <AllProducts />}
          {selectedKey === "3" && <AuditLogs />}
          {selectedKey === "4" && <AllUsers />}
          {selectedKey === "5" && <Organisation />}
          {selectedKey === "6" && <Title level={3}>Settings Page</Title>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

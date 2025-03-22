import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import logo from "../../assets/logo.jpeg";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  ProductOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  ApartmentOutlined,
  AuditOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme } from "antd";
import AllUsers from "./AllUsers";
import AllProducts from "./AllProducts";
import Organisation from "./Organisation";
import AuditLogs from "./AuditLogs";

const { Header, Sider, Content } = Layout;
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
      // Create an async function inside useEffect
      try {
        const userId = location.state?.userId; // Use optional chaining
        if (!userId) {
          throw new Error("User ID is missing.");
        }

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
        setError(null); // Clear any previous errors

        const locationState = location.state;
        locationState.orgName = data.orgName;
        navigate("/dashboard", {
          // Redirection ALWAYS happens on successful signup
          state: locationState,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      }
    };

    fetchUserData(); // Call the function
  }, [reload, location.state?.userId]);

  useEffect(() => {
    if (selectedKey === "7") {
      navigate("/", { replace: true });

      // Remove previous history entries
      window.history.replaceState(null, "", "/");
    }
  }, [selectedKey]);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div className="demo-logo-vertical" />
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ flexGrow: 1 }}
            onClick={handleMenuClick}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: `${userName}`,
              },
              {
                key: "2",
                icon: <ProductOutlined />,
                label: "Product",
              },
              {
                key: "3",
                icon: <SettingOutlined />,
                label: "Setting",
              },
              {
                key: "4",
                icon: <AuditOutlined />,
                label: "Audit",
              },
              {
                key: "5",
                icon: <UsergroupAddOutlined />,
                label: "Members",
              },
              {
                key: "6",
                icon: <ApartmentOutlined />,
                label: "Orgnisation",
              },
              {
                key: "7",
                icon: <LogoutOutlined />,
                label: "Logout",
              },
            ]}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            flexDirection: "row",
            alignItems: "center", // Vertically center content
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
          >
            {" "}
            <img src={logo} alt="Bytestore Logo" className="w-15" />
          </div>
        </Header>
        {selectedKey == "1" && data != null && (
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <UserDetails data={data} setReload={setReload} reload={reload} />
          </Content>
        )}
        {selectedKey == "2" && (
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <AllProducts />
          </Content>
        )}
        {selectedKey == "3" && (
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            This is Setting Page
          </Content>
        )}
        {selectedKey == "4" && (
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <AuditLogs />
          </Content>
        )}
        {selectedKey == "5" && (
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <AllUsers />
          </Content>
        )}
        {selectedKey == "6" && (
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Organisation />
          </Content>
        )}
      </Layout>
    </Layout>
  );
};

export default Dashboard;

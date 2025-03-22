import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Row, Col, Input, Button, Alert } from "antd";

const UserDetails = (props) => {
  const [state, setState] = useState({ expand: true });
  const [userData, setUserData] = useState(props.data);
  const [user, setUser] = useState(props.data.user);
  const [tel, setTel] = useState(props.data.user.phoneNo);
  const [children, setChildren] = useState([]);
  const [loyaltyPoint, setloyaltyPoint] = useState(
    props.data.user.userInfo.loyaltyPoints
  );
  const [preferredLanguage, setPreferredLanguage] = useState(
    props.data.user.userInfo.preferredLanguage
  );
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const lastUpdatedAt = new Date(userData.lastUpdatedAt);

  const getRequestData = () => {
    const requestData = {
      orgTokenId: location.state.orgTokenId,
      sessionToken: location.state.sessionToken,
      userId: location.state.userId,
      userDetails: {
        userInfo: {
          preferredLanguage: preferredLanguage,
          joinedDate: user.userInfo.joinedDate,
          loyaltyPoints: loyaltyPoint,
        },
        userName: user.userName,
        email: user.email,
        phoneNo: tel,
      },
    };
    return requestData;
  };
  const handleTelUpdate = (e) => {
    setTel(parseInt(e.target.value));
  };

  const handleLangUpdate = (e) => {
    setPreferredLanguage(e.target.value);
  };

  const handleLPUpdate = (e) => {
    setloyaltyPoint(parseInt(e.target.value));
  };

  const getFields = () => {
    const count = state.expand ? 10 : 4;
    const children = [];
    const date = new Date(user.userInfo.joinedDate);

    children.push(
      <Col span={10} key="name" style={{ display: "block" }}>
        <Form.Item label="Name">
          <Input placeholder={user.userName} disabled />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col span={10} key="phoneno" style={{ display: "block" }}>
        <Form.Item label="Tel">
          <Input
            placeholder={user.phoneNo}
            onChange={handleTelUpdate}
            type="number"
          />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col span={10} key="email" style={{ display: "block" }}>
        <Form.Item label="E-Mail">
          <Input placeholder={user.email} disabled />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col span={10} key="orgName" style={{ display: "block" }}>
        <Form.Item label="Org Name">
          <Input placeholder={userData.orgName} disabled />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col
        span={10}
        key="preferredLanguage"
        style={{ display: count == 4 ? "block" : "none" }}
      >
        <Form.Item label="Preferred Language">
          <Input
            placeholder={user.userInfo.preferredLanguage}
            onChange={handleLangUpdate}
          />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col
        span={10}
        key="loyaltyPoints"
        style={{ display: count == 4 ? "block" : "none" }}
      >
        <Form.Item label="Loyalty Points">
          <Input
            placeholder={user.userInfo.loyaltyPoints}
            type="number"
            onChange={handleLPUpdate}
          />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col
        span={10}
        key="joinedDate"
        style={{ display: count == 4 ? "block" : "none" }}
      >
        <Form.Item label="Joined On">
          <Input
            placeholder={date.toLocaleDateString("en-IN", options)}
            disabled
          />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col
        span={10}
        key="userId"
        style={{ display: count == 4 ? "block" : "none" }}
      >
        <Form.Item label="User Id">
          <Input placeholder={location.state?.userId} disabled />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col
        span={10}
        key="unit"
        style={{ display: count == 4 ? "block" : "none" }}
      >
        <Form.Item label="Unit">
          <Input placeholder={userData.unit} disabled />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col
        span={10}
        key="addedBy"
        style={{ display: count == 4 ? "block" : "none" }}
      >
        <Form.Item label="Added By">
          <Input placeholder={userData.addedBy} disabled />
        </Form.Item>
      </Col>
    );
    return children;
  };

  useEffect(()=>{
    setChildren(getFields())
  },[props.data, state])

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://bytestore-backend-production.up.railway.app/byteStore/users/updateUserInfo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(getRequestData()),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      const responseData = await response.json();
      const isSuccess = responseData.success;
      if(isSuccess){
      setSuccessMessage("User information updated successfully!");
      props.setReload(!props.reload);
      setloyaltyPoint("")
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    props.form.resetFields();
  };

  const toggle = () => {
    const { expand } = state;
    setState({ expand: !expand });
  };

  return (
    <Form className="ant-advanced-search-form" onSubmit={handleSearch}>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError("")}
        />
      )}{" "}
      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          showIcon
          closable
          onClose={() => setSuccessMessage("")}
        />
      )}{" "}
      <br />
      <Row gutter={24}>{children}</Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" onClick={handleUpdate} loading={loading} disabled = {loading}>
            Update
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            Clear
          </Button>
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={toggle}>
            {state.expand ? "Expand" : "Collapse"}
          </a>
        </Col>
        <Col span={7}></Col>
        <Col span={10} key="updatedAt">
          <aside>
            {" "}
            Last Updated At:{" "}
            {lastUpdatedAt.toLocaleDateString("en-IN", options)}
          </aside>
        </Col>
      </Row>
    </Form>
  );
};

export default UserDetails;

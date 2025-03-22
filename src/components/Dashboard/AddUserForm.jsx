import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Row, Col, Input, Button, Alert, DatePicker, Card } from "antd";
import moment from "moment";

const AddUserForm = (props) => {
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [orgName, setOrgName] = useState(null);
  const [email, setEmail] = useState(null);
  const [children, setChildren] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [unit, setUnit] = useState("");
  const [loyaltyPoint, setloyaltyPoint] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [joinedDate, setJoinedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const convertUserData = () => {
    const convertedUserData = {
      principleUserId: location.state.userId,
      orgTokenId: location.state.orgTokenId,
      sessionTokenId: location.state.sessionToken,
      email: email,
      password: password,
      unit: unit,
      userDetails: {
        userInfo: {
          preferredLanguage: preferredLanguage,
          joinedDate: joinedDate ? moment(joinedDate).valueOf() : 0,
          loyaltyPoints: parseInt(loyaltyPoint) || 0,
        },
        phoneNo: parseInt(phoneNo) || 0,
        userName: userName,
        email: email,
      },
    };
    return convertedUserData;
  };

  const handleAddUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    props.setShowAddUserForm(false);

    try {
      const apiData = convertUserData(); // No need to check for null anymore

      const response = await fetch(
        "https://bytestore-backend-production.up.railway.app/byteStore/users/addUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Add User failed");
      }

      const data = await response.json();
      const isSuccess = data.success;
      if (isSuccess) {
        props.setReload(!props.reload);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Add User error:", err);
      setError(err.message); // This will now catch both network errors and password mismatch errors
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    setOrgName(location.state?.orgName);
  }, [location.state?.orgName]);

  return (
    <>
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
              <Row gutter={24}>
                <Col span={10}>
                  <Form.Item label="UserName">
                    <Input
                      value={userName}
                      placeholder={"Name"}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="Password">
                    <Input.Password
                      name="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="OrgName">
                    <Input placeholder={orgName} disabled />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="Email">
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={email}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="Unit">
                    <Input
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="Business unit"
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="Preferred Language">
                    <Input
                      value={preferredLanguage}
                      onChange={(e) => setPreferredLanguage(e.target.value)}
                      placeholder={"Language"}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="PhoneNo">
                    <Input
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      placeholder={"Phone No"}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="Loyalty Points">
                    <Input
                      value={loyaltyPoint}
                      onChange={(e) => setloyaltyPoint(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Joined Date">
                    <DatePicker
                      value={joinedDate ? moment(joinedDate) : null}
                      onChange={(date, dateString) => setJoinedDate(dateString)}
                      format="YYYY-MM-DD"
                      placeholder="Select Date"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit" onClick={handleAddUser} disabled= {loading} loading={loading}>
                Add User
              </Button>
            </Col>
          </Row>
    </>
  );
};

export default AddUserForm;

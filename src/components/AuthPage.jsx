import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Input, Button, Checkbox } from "antd";

const AuthPage = (props) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [signUpFormData, setSignUpFormData] = useState({
    user_name: "",
    org_name: "",
    phone: "",
    unit: "",
    loyalty_points: "",
    email: "",
    password: "",
    confirm_password: "",
    checkbox: false,
  });
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const expiration = localStorage.getItem("expirationEpoch");
    if (expiration) {
      const checkExpiration = setInterval(() => {
        if (Date.now() >= expiration) {
          navigate("/", { state: {}, replace: true });
        }
      }, 10000);
      return () => clearInterval(checkExpiration);
    }
  }, []);

  const handleSignUpInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpFormData({
      ...signUpFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignInInputChange = (e) => {
    setSignInFormData({
      ...signInFormData,
      [e.target.name]: e.target.value,
    });
  };

  const convertSignUpData = (formData) => {
    if (formData.password !== formData.confirm_password) {
      throw new Error("Passwords do not match!");
    }
    return {
      userDetails: {
        userInfo: {
          preferredLanguage: "English",
          joinedDate: Date.now(),
          loyaltyPoints: parseFloat(formData.loyalty_points) || 0,
        },
        userName: formData.user_name || "",
        phoneNo: parseInt(formData.phone) || 0,
        email: formData.email || "",
      },
      orgName: formData.org_name || "",
      unit: formData.unit || "",
      email: formData.email || "",
      password: formData.password || "",
    };
  };

  const handleSignUpSubmit = async () => {
    setIsLoading(true);
    setError("");
    try {
      const apiData = convertSignUpData(signUpFormData);
      const response = await fetch(
        "https://bytestore-backend-production.up.railway.app/byteStore/users/signUp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }
      const data = await response.json();
      const isSuccess = data.success;
      if (isSuccess) {
        localStorage.setItem("orgTokenId", data.orgTokenId);
        localStorage.setItem("sessionTokenId", data.sessionToken);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("expirationEpoch", data.expirationEpoch);
        navigate("/dashboard", {
          state: {
            userId: data.userId,
            sessionToken: data.sessionToken,
            orgTokenId: data.orgTokenId,
          },
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInSubmit = async () => {
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://bytestore-backend-production.up.railway.app/byteStore/users/signIn",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signInFormData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signin failed");
      }
      const data = await response.json();
      const isSuccess = data.valid;
      if (isSuccess) {
        localStorage.setItem("sessionTokenId", data.sessionToken);
        localStorage.setItem("orgTokenId", data.orgTokenId);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("expirationEpoch", data.expirationEpoch);
        setIsLoading(false);
        navigate("/dashboard", {
          state: {
            userId: data.userId,
            sessionToken: data.sessionToken,
            orgTokenId: data.orgTokenId,
          },
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: "#0b1b40",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Signup/Login Toggle Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <Button
            type={isSignUp ? "primary" : "default"}
            onClick={() => setIsSignUp(true)}
          >
            Signup
          </Button>
          <Button
            type={!isSignUp ? "primary" : "default"}
            onClick={() => setIsSignUp(false)}
          >
            Login
          </Button>
        </div>

        {isSignUp ? (
          <Form>
            <Form.Item label="User Name">
              <Input
                name="user_name"
                placeholder="User Name"
                onChange={handleSignUpInputChange}
              />
            </Form.Item>
            <Form.Item label="Organization Name">
              <Input
                name="org_name"
                placeholder="Organization Name"
                onChange={handleSignUpInputChange}
              />
            </Form.Item>
            <Form.Item label="Phone">
              <Input
                name="phone"
                placeholder="Phone"
                onChange={handleSignUpInputChange}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleSignUpInputChange}
              />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password
                name="password"
                placeholder="Password"
                onChange={handleSignUpInputChange}
              />
            </Form.Item>
            <Form.Item label="Confirm Password">
              <Input.Password
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={handleSignUpInputChange}
              />
            </Form.Item>
            <Form.Item valuePropName="checkbox">
              <Checkbox name="checkbox" onChange={handleSignUpInputChange}>
                I agree to the terms and conditions
              </Checkbox>
            </Form.Item>

            <Row gutter={[16, 16]} justify="center">
              <Col span={12}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  disabled={isLoading}
                  loading={isLoading}
                  onClick={handleSignUpSubmit}
                >
                  Signup
                </Button>
              </Col>
              <Col span={12}>
                <Button onClick={() => props.setIsOpen(false)} block>
                  Close
                </Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <Form>
            <Form.Item label="Email">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleSignInInputChange}
              />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password
                name="password"
                placeholder="Password"
                onChange={handleSignInInputChange}
              />
            </Form.Item>

            <Row gutter={[16, 16]} justify="center">
              <Col span={12}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  disabled={isLoading}
                  loading={isLoading}
                  onClick={handleSignInSubmit}
                >
                  Login
                </Button>
              </Col>
              <Col span={12}>
                <Button onClick={() => props.setIsOpen(false)} block>
                  Close
                </Button>
              </Col>
            </Row>
          </Form>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
export default AuthPage;

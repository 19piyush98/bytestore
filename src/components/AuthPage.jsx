import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Input, Button, Checkbox } from "antd";

const AuthPage = (props) => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and sign-in
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
  const [checkLogin, setCheckLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkLogin) {
      setInterval(() => {
        const expiration = localStorage.getItem("expirationEpoch");
        const currentEpoch = Date.now();
        if (expiration <= currentEpoch) {
          navigate("/", {
            state: {},
            replace: true,
          });
        }
      }, 10000);
    }
  }, [checkLogin]);

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
    const convertedData = {
      userDetails: {
        userInfo: {
          preferredLanguage: "English", // Make dynamic if needed
          joinedDate: Date.now(), // Make dynamic if needed
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

    if (formData.password !== formData.confirm_password) {
      throw new Error("Passwords do not match!"); // Throw an error
    }
    return convertedData;
  };

  const handleSignUpSubmit = async () => {
    setError("");

    try {
      const apiData = convertSignUpData(signUpFormData); // No need to check for null anymore

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

        navigate("/dashboard", {
          // Redirection ALWAYS happens on successful signup
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
      console.error("Signup error:", err);
      setError(err.message); // This will now catch both network errors and password mismatch errors
    }
  };

  const handleSignInSubmit = async () => {
    setError("");

    try {
      setIsLoading(true);
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
        setCheckLogin(true);
        setIsLoading(false);

        navigate("/dashboard", {
          state: {
            // Use 'state' to pass props
            userId: data.userId, // Example: Pass user data
            sessionToken: data.sessionToken, // Example: Pass token
            orgTokenId: data.orgTokenId,
          },
        });
      } else {
        setError(data.message);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Signin error:", err);
      setError(err.message);
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
        <div className="flex justify-between mb-4">
          <Button
            type={isSignUp ? "primary" : "default"}
            onClick={() => {
              setIsSignUp(true);
              setError("");
            }}
          >
            Signup
          </Button>
          <Button
            type={!isSignUp ? "primary" : "default"}
            onClick={() => {
              setIsSignUp(false);
              setError("");
            }}
          >
            Login
          </Button>
        </div>
        {isSignUp ? (
          <Form onFinish={handleSignUpSubmit}>
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
            <Form.Item label="Unit">
              <Input
                name="unit"
                placeholder="Unit"
                onChange={handleSignUpInputChange}
              />
            </Form.Item>
            <Form.Item label="Loyalty Points">
              <Input
                type="number"
                name="loyalty_points"
                placeholder="Loyalty Points"
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
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block disabled= {isLoading} loading = {isLoading}>
                    Signup
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Button onClick={() => props.setIsOpen(false)} block>
                    Close
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : (
          <Form onFinish={handleSignInSubmit}>
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
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block disabled= {isLoading} loading = {isLoading}>
                    Login
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Button onClick={() => props.setIsOpen(false)} block>
                    Close
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AuthPage;

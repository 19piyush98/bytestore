import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Button, Alert, Card } from "antd";
import { useLocation } from "react-router-dom";
import { SaveOutlined, LoadingOutlined } from "@ant-design/icons";

const Organisation = () => {
  const location = useLocation();
  const [org, setOrg] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getReadableDate = (dateEpoch) => {
    const date = new Date(dateEpoch);
    return date.toLocaleDateString("en-IN", options);
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
  };
  const handleState = (e) => {
    setState(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleZipCode = (e) => {
    setZipCode(e.target.value);
  };
  const handleWebsite = (e) => {
    setWebsite(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const getRequestData = () => {
    return {
      orgTokenId: location.state?.orgTokenId,
    };
  };

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        const orgTokenId = location.state?.orgTokenId;
        if (!orgTokenId) {
          throw new Error("Org ID is missing.");
        }

        const response = await fetch(
          "https://bytestore-backend-production.up.railway.app/byteStore/organisation/getOrg",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getRequestData()),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch Org data");
        }

        const data = await response.json();
        const isSuccess = data.success;
        setLoading(false);
        if (isSuccess) {
          setOrg(data?.org);
          setError(null);
          setZipCode(data.org.zipCode);
          setCity(data.org.city);
          setCountry(data.org.country);
          setState(data.org.state);
          setWebsite(data.org.website);
          setDescription(data.org.description);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      } 
    };

    fetchOrgData(); // Call the function
  }, [location.state?.orgTokenId]);

  const getUpdateRequestData = () => {
    return {
      userId: location.state.userId,
      organisation: {
        orgTokenId: location.state.orgTokenId,
        orgName: org.orgName,
        email: org.email,
        phoneNo: org.phoneNo,
        city: city,
        state: state,
        country: country,
        zipCode: zipCode,
        website: website,
        description: description,
        status: org.status,
        createdAt: org.createdAt,
      },
    };
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setButtonLoading(true)
      const response = await fetch(
        "https://bytestore-backend-production.up.railway.app/byteStore/organisation/updateOrg",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(getUpdateRequestData()),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Updated failed");
      }

      const responseData = await response.json();
      const isSuccess = responseData.success;
      setLoading(false);
      if (isSuccess) {
        setSuccessMessage("Organisation information updated successfully!");
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setButtonLoading(false)
    }
  };

  return loading ? (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <LoadingOutlined style={{ fontSize: 48 }} spin />
    </div>
  ) : (
    <div
      style={{
        padding: "24px",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ overflowY: "auto", maxHeight: "70vh" }}>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            style={{ marginBottom: "16px" }}
          />
        )}
        {successMessage && (
          <Alert
            message={successMessage}
            type="success"
            showIcon
            closable
            style={{ marginBottom: "16px" }}
          />
        )}
        {org && (
          <Card title="Organisation Details">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Organisation Name">
                    <Input value={org.orgName} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Organisation Token ID">
                    <Input value={org.orgTokenId} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Country">
                    <Input onChange={handleCountry} value={country} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="City">
                    <Input onChange={handleCity} value={city} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="ZipCode">
                    <Input onChange={handleZipCode} value={zipCode} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Status">
                    <Input value={org.status} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="State">
                    <Input onChange={handleState} value={state} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Description">
                    <Input onChange={handleDescription} value={description} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="CreatedAt">
                    <Input value={getReadableDate(org.createdAt)} disabled/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Contact Number">
                    <Input value={org.phoneNo} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input value={org.email} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Website">
                    <Input onChange={handleWebsite} value={website} />
                  </Form.Item>
                </Col>
              </Row>
              <Button color="#001628" variant="solid" onClick={handleUpdate} disabled = {buttonLoading} loading={buttonLoading}>
                Save
                <SaveOutlined />
              </Button>
            </Form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Organisation;

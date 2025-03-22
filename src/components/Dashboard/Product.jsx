import React, { useEffect, useState } from "react";
import { Form, Row, Col, Input, Button, Alert, Collapse, Select } from "antd";
import { useLocation } from "react-router-dom";

const { Panel } = Collapse;

const Product = (props) => {
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [product, setProduct] = useState(props.product || {});
  const [formValues, setFormValues] = useState(props.product || {});
  const [updatedAt, setUpdatedAt] = useState(new Date(props.product.updatedAt));
  const [createdAt, setCreatedAt] = useState(new Date(props.product.createdAt));
  const [discount, setDiscount] = useState(props.product.discount);
  const [quantity, setQuantity] = useState(props.product.quantity);
  const [status, setStatus] = useState(props.product.status);
  const [description, setDiscription] = useState(props.product.description);
  const [productId, setProductId] = useState(props.product.productId);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getRequestData = () => {
    const requestData = {
      productId: productId,
      productModifyRequest: {
        productName: props.product.productName,
        orgTokenId: location.state?.orgTokenId,
        sessionToken: location.state?.sessionToken,
        userId: location.state?.userId,
        description: description,
        status: status,
        discount: discount,
        quantity: quantity,
        category: product.category,
        brand: product.brand,
        price: product.price,
        Subcategory: product.Subcategory,
      },
    };
    return requestData;
  };

  const handleDiscountUpdate = (e) => {
    setDiscount(parseInt(e.target.value));
  };

  const handleDiscriptionUpdate = (e) => {
    setDiscription(e.target.value);
  };

  const handleQuantityUpdate = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleStatusUpdate = (value) => {
    setStatus(value);
  };

  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://bytestore-backend-production.up.railway.app/byteStore/product/updateProduct",
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
        setSuccessMessage("Product information updated successfully!");
      }
      else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const detDeleteRequestData = () => {
    const deletedRequestData = {
      productNameToBeDeleted: props.product?.productName,
      productId: productId,
      orgTokenId: location.state?.orgTokenId,
      userId: location.state?.userId,
      sessionTokenId: location.state?.sessionTokenId,
    };
    return deletedRequestData;
  };

  const handleDelete = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://bytestore-backend-production.up.railway.app/byteStore/product/deleteProduct",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(detDeleteRequestData()),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Delete Product failed");
      }

      const responseData = await response.json();
      const isSuccess = responseData.success;
      if(isSuccess){
      setSuccessMessage("Product Deleted successfully!");
      props.setReload(!props.reload);
      } else {
       setError (responseData.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormValues(props.product || {});
    setFormValues({
      ...formValues,
      updatedAt: updatedAt.toLocaleDateString("en-IN", options),
      createdAt: createdAt.toLocaleDateString("en-IN", options),
    });
  }, [props.product, updatedAt, createdAt]);

  const handleClearProduct = (e) => {
    e.preventDefault();
  };

  const onFieldsChange = (changedFields) => {
    setFormValues({ ...formValues, ...changedFields });
  };

  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel
        header={`${props.product?.productName ?? "Product Details"} - ${
          props.product?.brand
        } (ID: ${props.product?.productId})`}
        key={props.key}
      >
        <Form
          className="ant-advanced-search-form"
          onFinish={handleClearProduct}
          initialValues={formValues}
          onFieldsChange={onFieldsChange}
        >
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={() => setError("")}
            />
          )}
          {successMessage && (
            <Alert
              message={successMessage}
              type="success"
              showIcon
              closable
              onClose={() => setSuccessMessage("")}
            />
          )}
          <br />
          <Row gutter={24}>
            {" "}
            <Col span={11}>
              <Form.Item name="productName" label="ProductName">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="brand" label="Brand">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="category" label="Category">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="quantity" label="Quantity">
                <Input onChange={handleQuantityUpdate} />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="discount" label="Discount(%)">
                <Input onChange={handleDiscountUpdate} />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="price" label="Price($)">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="Status">
                <Select onChange={handleStatusUpdate} value={status}>
                  <Select.Option value="ACTIVE">ACTIVE</Select.Option>
                  <Select.Option value="INACTIVE">INACTIVE</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="createdAt" label="Created At">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="updatedAt" label="Updated At">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item name="description" label="Description">
                <Input onChange={handleDiscriptionUpdate} />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: "right" }}>
              {" "}
              <Button type="primary" htmlType="submit" onClick={handleUpdate} loading={loading} disabled={loading}>
                Update
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleDelete} loading={loading} disabled={loading}>
                Delete
              </Button>
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default Product;

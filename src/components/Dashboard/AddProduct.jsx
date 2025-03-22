import React, { useState } from "react";
import { Form, Row, Col, Input, Button, Alert, Select } from "antd";
import { useLocation } from "react-router-dom";

const AddProduct = (props) => {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [attributes, setAttributes] = useState({});
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const convertProductData = () => {
    const convertedProductData = {
      userId: location.state.userId,
      orgTokenId: location.state.orgTokenId,
      sessionToken: location.state.sessionToken,
      productName: productName,
      description: description,
      category: category,
      subcategory: subcategory,
      brand: brand,
      price: parseFloat(price) || 0,
      quantity: parseInt(quantity) || 0,
      discount: parseFloat(discount) || 0,
      attributes: attributes,
      images: images,
      tags: tags,
      status: status,
    };
    return convertedProductData;
  };


  const handleClear = (e) => {
    e.preventDefault();
    props.setShowAddProductForm(false);
  };

  const handleAddProduct = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    try {
      const apiData = convertProductData(); // No need to check for null anymore

      const response = await fetch(
        "https://bytestore-backend-production.up.railway.app/byteStore/product/addProduct",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Add Product failed");
      }

      const data = await response.json();
      const isSuccess = data.success;
      if(isSuccess){
      props.setShowAddProductForm(false);
      props.setReload(!props.reload);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Add Product error:", err);
      setError(err.message); // This will now catch both network errors and password mismatch errors
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <Row gutter={24}></Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item label="ProductName">
                <Input
                  value={productName}
                  placeholder={"productName"}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Brand">
                <Input
                  value={brand}
                  placeholder={"brand"}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Category">
                <Input
                  value={category}
                  placeholder={"category"}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Quantity">
                <Input
                  value={quantity}
                  placeholder={"quantity"}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Price($)">
                <Input
                  value={price}
                  placeholder={"price"}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Discount(%)">
                <Input
                  value={discount}
                  placeholder={"discount"}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Status">
                <Select value={status} onChange={(value) => setStatus(value)}>
                  <Select.Option value="ACTIVE">ACTIVE</Select.Option>
                  <Select.Option value="INACTIVE">INACTIVE</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Description">
                <Input
                  value={description}
                  placeholder={"description"}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          {error && <Alert message={error} type="error" />}
          <Button type="primary" htmlType="submit" onClick={handleAddProduct} disabled={loading} loading={loading}>
            Add Product
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleClear} disabled={loading} loading={loading}>
            Clear
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddProduct;

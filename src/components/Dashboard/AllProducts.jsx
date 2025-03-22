import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingOutlined } from "@ant-design/icons";
import { Skeleton, Divider, Collapse, Row, Button, Col, Input } from "antd";
import Product from "./Product";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import AddProduct from "./AddProduct";

const AllProducts = () => {
  const [reload, setReload] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const getRequestData = () => {
    return {
      userId: location.state?.userId,
      sessionToken: location.state?.sessionToken,
      orgTokenId: location.state?.orgTokenId,
    };
  };

  const handleAddProduct = () => {
    setShowAddProductForm(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      // Create an async function inside useEffect
      try {
        const userId = location.state?.userId; // Use optional chaining
        if (!userId) {
          throw new Error("User ID is missing.");
        }

        const response = await fetch(
          "https://bytestore-backend-production.up.railway.app/byteStore/product/getAllProducts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getRequestData()),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user data");
        }

        const data = await response.json();
        const isSuccess = data.success;
        setLoading(false);
        if (isSuccess) {
          setProducts(data?.products);
          setFilteredProduct(data?.products);
          setError(null);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData(); // Call the function
  }, [reload, location.state?.orgTokenId]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();

    if (searchValue !== "") {
      setFilteredProduct(
        products.filter((product) =>
          product.productName.toLowerCase().includes(searchValue)
        )
      );
    } else {
      setFilteredProduct(products);
    }
  };
  return loading ? (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <LoadingOutlined style={{ fontSize: 48 }} spin />
    </div>
  ) : (
    <>
      {!showAddProductForm ? (
        <div
          id="scrollableDiv"
          style={{
            height: "80vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Row>
                <Col span={21}>
                  <Input
                    onChange={handleSearch}
                    placeholder="Search Products..."
                    prefix={<SearchOutlined />}
                  />
                </Col>
                <Col span={3}>
                  <Button
                    color="#001628"
                    variant="solid"
                    onClick={handleAddProduct}
                  >
                    Add Product
                    <PlusOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <InfiniteScroll
            dataLength={filteredProduct.length}
            hasMore={false}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <Collapse defaultActiveKey={["1"]} bordered={false} ghost>
              {filteredProduct.map((value, idx) => {
                return (
                  <div key={idx}>
                    <Product
                      product={value}
                      key={idx}
                      reload={reload}
                      setReload={setReload}
                    />
                  </div>
                );
              })}
            </Collapse>
          </InfiniteScroll>
        </div>
      ) : (
        <AddProduct
          setShowAddProductForm={setShowAddProductForm}
          setReload={setReload}
          reload={reload}
        />
      )}
    </>
  );
};

export default AllProducts;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Divider,
  List,
  Skeleton,
  Alert,
  Row,
  Col,
  Button,
  Tooltip,
  Input,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import AddUserForm from "./AddUserForm";
import { LoadingOutlined } from "@ant-design/icons";

const AllUsers = () => {
  const location = useLocation();
  const [allUsersData, setAllUsersData] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [reload, setReload] = useState(false);
  const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const orgTokenId = location.state?.orgTokenId;
        if (!orgTokenId) {
          throw new Error("Org ID is missing.");
        }

        const response = await fetch(
          `https://bytestore-backend-production.up.railway.app/byteStore/users/getAll/${orgTokenId}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user data");
        }

        const data = await response.json();
        const isSuccess = data.success;
        setLoading(false);
        if (isSuccess) {
          setAllUsersData(data.users);
          setFilteredUser(data.users);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [location.state?.orgTokenId, reload]);

  const addUser = () => {
    setShowAddUserForm(true);
  };

  const deleteUserData = (userId, userName) => {
    const deletedUserData = {
      principleUserId: location.state?.userId,
      userNameToBeDeleted: userName,
      userId: userId,
      orgTokenId: location.state?.orgTokenId,
      sessionTokenId: location.state?.sessionToken,
    };
    return deletedUserData;
  };

  const handleDelete = async (userId, userName) => {
    setError(null);
    setSuccessMessage(null);

    if (userId == location.state?.userId) {
      setError("User cannot delete themselves...");
      return;
    }
    try {
      const response = await fetch(
        "https://bytestore-backend-production.up.railway.app/byteStore/users/deleteUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(deleteUserData(userId, userName)),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Delete User failed");
      }

      const responseData = await response.json();
      const isSuccess = responseData.success;
      if (isSuccess) {
        setSuccessMessage("User Deleted successfully!");
        setReload(!reload);
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();

    if (searchValue !== "") {
      setFilteredUser(
        allUsersData.filter((user) =>
          user.userDetails.userName.toLowerCase().includes(searchValue)
        )
      );
    } else {
      setFilteredUser(allUsersData);
    }
  };

  return (
    <>
      {!showAddUserForm ? (
        <div>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Row>
                <Col span={21}>
                  <Input
                    onChange={handleSearch}
                    placeholder="Search User..."
                    prefix={<SearchOutlined />}
                  />
                </Col>
                <Col span={3}>
                  <Button color="#001628" variant="solid" onClick={addUser}>
                    Add User
                    <PlusOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
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
          <div
            id="scrollableDiv"
            style={{
              height: "70vh",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Skeleton loading={loading} active>
              <InfiniteScroll
                dataLength={filteredUser.length}
                hasMore={false}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={filteredUser}
                  renderItem={(item, idx) => (
                    <List.Item
                      key={idx}
                      actions={[
                        <Tooltip title="Delete">
                          <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            size="large"
                            onClick={() =>
                              handleDelete(
                                item.userId,
                                item.userDetails.userName
                              )
                            }
                            style={{
                              padding: "12px 20px",
                              border: "none",
                              background: "transparent",
                              borderRadius: "8px",
                            }}
                            className="delete-button"
                          />
                        </Tooltip>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{
                              backgroundColor: `${
                                colorList[
                                  Math.floor(Math.random() * colorList.length)
                                ]
                              }`,
                              verticalAlign: "middle",
                            }}
                            size="large"
                          >
                            {item.userDetails.userName.substring(0, 1)}
                          </Avatar>
                        }
                        title={item.userDetails.userName}
                        description={item.userDetails.email}
                      />
                      <div>
                        {item.userDetails.phoneNo}
                        <br />({item.unit})
                      </div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </Skeleton>
          </div>
        </div>
      ) : (
        <AddUserForm
          setShowAddUserForm={setShowAddUserForm}
          setReload={setReload}
          reload={reload}
        />
      )}
    </>
  );
};

export default AllUsers;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton, Divider, List, Avatar, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AuditOutlined, FileSearchOutlined } from "@ant-design/icons";

const AuditLogs = () => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Set to true for 12-hour format
  };

  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
  const location = useLocation();

  const getRequestData = (orgTokenId) => {
    return {
      orgTokenId: orgTokenId,
    };
  };
  useEffect(() => {
    const fetchLogs = async () => {
      // Create an async function inside useEffect
      try {
        const orgTokenId = location.state?.orgTokenId; // Use optional chaining
        if (!orgTokenId) {
          throw new Error("Org ID is missing.");
        }

        const response = await fetch(
          "https://bytestore-backend-production.up.railway.app/byteStore/audit/getAllAudits",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getRequestData(orgTokenId)),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch data");
        }

        const data = await response.json();
        const isSuccess = data.success;
        setLoading(false);
        if (isSuccess) {
          setLogs(
            data?.logs.sort((a, b) => a.timestamp - b.timestamp).reverse()
          );
          setFilteredLogs(
            data?.logs.sort((a, b) => a.timestamp - b.timestamp).reverse()
          );
          setError(null); // Clear any previous errors
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLogs();
  }, []);

  const getReadableDate = (dateEpoch) => {
    const date = new Date(dateEpoch);
    return date.toLocaleDateString("en-IN", options);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();

    if (searchValue !== "") {
      setFilteredLogs(
        logs.filter((log) => log.logMessage.toLowerCase().includes(searchValue))
      );
    } else {
      setFilteredLogs(logs);
    }
  };

  return (
    <>
      <Input
        onChange={handleSearch}
        placeholder="Search logs..."
        prefix={<FileSearchOutlined />}
      />
      <Divider />
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
            dataLength={filteredLogs.length}
            hasMore={false}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={filteredLogs}
              renderItem={(log, idx) => (
                <List.Item key={idx}>
                  <List.Item.Meta
                    avatar={
                      <Avatar size="large">
                        <AuditOutlined />
                      </Avatar>
                    }
                    title={log.logMessage}
                  />
                  <div>{getReadableDate(log.timestamp)}</div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Skeleton>
      </div>
    </>
  );
};

export default AuditLogs;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UserInfo = () => {
  const [data, setData] = useState(null); // Initialize to null
  const [error, setError] = useState(null); // State for errors
  const location = useLocation(); // Call useLocation at the top level

  useEffect(() => {
    const fetchUserData = async () => { // Create an async function inside useEffect
      try {
        const userId = location.state?.userId; // Use optional chaining
        if (!userId) {
          throw new Error("User ID is missing.");
        }

        const response = await fetch(
          `https://bytestore-backend-production.up.railway.app/users/get/${userId}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user data");
        }

        const data = await response.json();
        setData(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      }
    };

    fetchUserData(); // Call the function

  }, [location.state?.userId]); // Add userId to dependency array

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  if (!data) {
    return <div>Loading...</div>; // Display loading message
  }

  return <div>Hello, {data.user.userName}</div>; // Access data properties safely
};

export default UserInfo;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const apiUrl = `${import.meta.env.VITE_API_URL}/songs/${userId}`;
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((userData) => {
          setSong(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data");
        });
    }
  }, [userId]);

}

export default ProfilePage;
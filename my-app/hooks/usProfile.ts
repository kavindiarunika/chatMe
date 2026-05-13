import { useState, useEffect } from "react";

export const useProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    image: "/user.png",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.userId || payload.id;

        const res = await fetch(`/api/profile?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        setProfile({
          name: data.name || "",
          bio: data.bio || "",
          image: data.image || "/user.png",
        });
      } catch (err) {
        console.error("useProfile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, setProfile, loading };
};
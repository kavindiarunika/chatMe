"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdCheck } from "react-icons/md";
import { FaCamera } from "react-icons/fa6";
import { showToast } from "@/lib/toast";

const Bio = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("/logo.png");
  const [editName, setEditName] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // GET USER FROM TOKEN
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.userId || payload.id);
    } catch (err) {
      console.error("Token error:", err);
    }
  }, []);

  // FETCH PROFILE
  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/profile?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        setName(data.name || "");
        setBio(data.bio || "");
        setImage(data.image || "/logo.png");
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // SAVE PROFILE
  const saveProfile = async (data: any) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showToast.error("No token found. Please login again");
        return;
      }

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Server error: ${res.status}`);
      }

      showToast.success("Saved successfully");
    } catch (err) {
      console.error("Save profile error:", err);
      showToast.error(err instanceof Error ? err.message : "Failed to save");
    }
  };

  // IMAGE UPLOAD
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast.error("Max 5MB allowed");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("No URL returned from upload");
      }

      console.log("Image uploaded successfully:", data.secure_url);
      setImage(data.secure_url);
      await saveProfile({ image: data.secure_url });

      showToast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Image upload error:", err);
      showToast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-md gap-6">

      <div className="flex items-center gap-24 w-full max-w-4xl">

        {/* IMAGE */}
        <div className="relative w-48 h-48">
          <img
            src={image}
            className="w-full h-full rounded-full object-cover border-4"
          />

          <label className="absolute bottom-2 right-0 bg-blue-500 p-3 rounded-full cursor-pointer">
            <FaCamera className="text-white" />
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>

          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
              Uploading...
            </div>
          )}
        </div>

        {/* NAME + BIO */}
        <div className="flex-1">

          {/* NAME */}
          <div className="flex items-center gap-2 mb-4">
            {editName ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-b text-2xl"
              />
            ) : (
              <h1 className="text-2xl font-bold">{name}</h1>
            )}

            {editName ? (
              <MdCheck
                onClick={() => {
                  setEditName(false);
                  saveProfile({ name });
                }}
                className="text-green-600 cursor-pointer"
              />
            ) : (
              <MdEdit onClick={() => setEditName(true)} className="cursor-pointer" />
            )}
          </div>

          {/* BIO */}
          <div className="flex items-start gap-2">
            {editBio ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border-b w-full"
                rows={3}
              />
            ) : (
              <p>{bio}</p>
            )}

            {editBio ? (
              <MdCheck
                onClick={() => {
                  setEditBio(false);
                  saveProfile({ bio });
                }}
                className="text-green-600 cursor-pointer"
              />
            ) : (
              <MdEdit onClick={() => setEditBio(true)} className="cursor-pointer" />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Bio;
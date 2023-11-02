import React, { useState } from "react";
import "../styles/UploadSong.css";

function UploadSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [label, setLabel] = useState("");
  const [released, setReleased] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          artist,
          album,
          genre,
          label,
          released,
          image,
        }),
      });

      if (response.status === 201) {
        setTitle("");
        setArtist("");
        setAlbum("");
        setGenre("");
        setLabel("");
        setReleased("");
        setImage("");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while uploading the song.");
    }
  };

  return (
    <div className="upload-song-container">
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="text"
          placeholder="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Release Date"
          value={released}
          onChange={(e) => setReleased(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default UploadSong;

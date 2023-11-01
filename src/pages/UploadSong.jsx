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

  const onSubmit = (e) => {
    e.preventDefault();

    setTitle("");
    setArtist("");
    setAlbum("");
    setGenre("");
    setLabel("");
    setReleased("");
    setImage("");
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

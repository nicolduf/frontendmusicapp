import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function UploadSong() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [genre, setGenre] = useState("");
    const [label, setLabel] = useState("");
    const [released, setReleased] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const values = {
            title,
            artist,
            album,
            genre,
            label, 
            released,
            image,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const newSong = await response.json();
                navigate(`/songs/${newSong._id}`); 
            } else {
                setError("An error occurred");
            }
        } catch (error) {
            setError("An error occurred");
        }
    }

    return (
        <div>
            <h1>Upload a New Song</h1>
            <form onSubmit={onSubmit}>
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
                <button type="submit">Upload</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default UploadSong;
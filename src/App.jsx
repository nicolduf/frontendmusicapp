import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoute from "./components/PrivateRoute";
import SongDetailsPage from "./pages/SongDetailsPage";
import ArtistDetailsPage from "./pages/ArtistDetailsPage";
import ArtistsPage from "./pages/ArtistsPage";
import HomePage from "./pages/HomePage";
import SongsPage from "./pages/SongsPage";
import UploadSong from "./pages/UploadSong";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/songs/:_id" element={<SongDetailsPage />} />
        <Route path="/uploadSong" element={<UploadSong />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artists/:_id" element={<ArtistDetailsPage />} />
        <Route path="/profile/:_d" element={<ProfilePage />} />
        
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
    </>
  );
}

export default App;

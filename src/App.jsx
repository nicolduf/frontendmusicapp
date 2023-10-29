import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoute from "./components/PrivateRoute";
import SongDetailsPage from "./pages/SongDetailsPage";
import UserFavourites from "./pages/UserFavourites";
import ArtistDetailsPage from "./pages/ArtistDetailsPage";
import ArtistsPage from "./pages/ArtistsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1></h1>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/songdetails" element={<SongDetailsPage />} />
        <Route path="/favourites" element={<UserFavourites />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artistdetails" element={<ArtistDetailsPage />} />
        
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

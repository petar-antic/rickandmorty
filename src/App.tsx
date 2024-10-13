import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Characters from "./pages/Characters";
import SingleCharacter from "./pages/SingleCharacter";
import SingleEpisode from "./pages/SingleEpisode";
import SingleLocation from "./pages/SingleLocation";
import { useAuth } from "./contexts/authContext";
import Navbar from "./components/Navbar";

const App = () => {
  const { userLoggedIn } = useAuth();

  return (
    <Container maxW="1280px">
      {userLoggedIn && <Navbar />}
      <Routes>
        {!userLoggedIn ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<SingleCharacter />} />
            <Route path="/location/:id" element={<SingleLocation />} />
            <Route path="/episodes/:id" element={<SingleEpisode />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={userLoggedIn ? "/characters" : "/"} />}
        />
      </Routes>
    </Container>
  );
};

export default App;

import NavBar from "./components/Header";
import { SnackProvider } from "./hooks/useSnack";
import Main from "./components/layouts/Main";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/layouts/Login";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="App">
      <SnackProvider>
        <NavBar />
        <Box height="100vh" component="main" sx={{ bgcolor: "#eaeff1", py: 5 }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:type" element={<Login />} />
          </Routes>
        </Box>
      </SnackProvider>
    </div>
  );
}

export default App;

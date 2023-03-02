import NavBar from "./components/Header";
import { SnackProvider } from "./hooks/useSnack";
import Main from "./components/layouts/Main";

function App() {
  return (
    <div className="App">
      <SnackProvider>
        <NavBar />
        <Main />
      </SnackProvider>
    </div>
  );
}

export default App;

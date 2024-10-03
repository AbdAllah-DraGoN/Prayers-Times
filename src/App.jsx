import "./App.css";
import Container from "@mui/material/Container";
import MainContent from "./components/MainContent";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Container maxWidth="xl">
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;

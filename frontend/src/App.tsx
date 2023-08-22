import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import Header from "./components/Header";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

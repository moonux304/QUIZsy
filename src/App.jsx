import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Kuis from "./pages/Kuis"
import Resume from "./pages/Resume"

function App() {
  
  return (
    <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Kuis" element={<Kuis />} />
          <Route path="/Resume" element={<Resume />} />
        </Routes>
    </>
  )
}

export default App

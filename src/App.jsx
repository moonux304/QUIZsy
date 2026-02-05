import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Kuis from "./pages/Kuis"

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Kuis" element={<Kuis />} />
        </Routes>
    </>
  )
}

export default App

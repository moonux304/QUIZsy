import { useState } from "react"
import { useNavigate } from "react-router-dom"
import elelogin from "../assets/elelogin.jpg"

const Login = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")

  return (
    <div className="pl-22 pt-6 flex justify-center items-center gap-16">
      <div className="relative">
        <img src={elelogin} alt="elelogin" className="w-xl ml-[40px]" />
        <p className="pl-[100px] absolute left-4 z-20 text-center">
          "Testing your knowledge just got easier with <b>Quiz App</b>"
        </p>
      </div>

      <div className="mt-[70px] text-center">
        <p className="text-5xl font-bold text-[#799EFF] mb-6">
          Selamat datang!
        </p>

        <p>
          Quiz-app platform untuk belajar dan bermain kuis <br />
          serta menambah wawasan
        </p>

        <p className="pt-[75px] text-[#C52929]">
          Masuk nama lengkap untuk melanjutkan
        </p>

        <input
          type="text"
          placeholder="Nama Lengkap..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-[400px] h-[50px] border border-gray-300 rounded-[65px] mt-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => navigate("/Kuis", { state: { userName, isNewQuiz: true } })}
          disabled={!userName}
          className={`w-[400px] h-[50px] rounded-[65px] mt-6 transition-colors
            ${userName 
              ? "bg-[#799EFF] text-white hover:bg-blue-600" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Mulai kuis
        </button>
      </div>
    </div>
  )
}

export default Login

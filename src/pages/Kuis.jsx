import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Kuis = () => {
  const location = useLocation()
  const userName = location.state?.userName || "Peserta"
  const navigate = useNavigate()
  // --- STATE ---
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState({
    correct: 0,
    incorrect: 0,
    totalAnswered: 0,
  })
  const [timeLeft, setTimeLeft] = useState(900) // 15 menit
  const [loading, setLoading] = useState(true)
  const [isFinished, setIsFinished] = useState(false)
  const [error, setError] = useState(null)

  // --- FUNCTIONS ---

  // Ambil soal dari API
  const fetchQuestions = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
      )
      if (!response.ok) throw new Error("Gagal mengambil soal")

      const data = await response.json()

      const formatted = data.results.map((q) => {
        const answers = [...q.incorrect_answers, q.correct_answer]
        return {
          ...q,
          shuffled_answers: answers.sort(() => Math.random() - 0.5),
        }
      })

      setQuestions(formatted)
      localStorage.setItem("quiz_questions", JSON.stringify(formatted))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Ketika jawaban diklik
  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentIndex]
    const isCorrect = selectedAnswer === currentQuestion.correct_answer

    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
      totalAnswered: prev.totalAnswered + 1,
    }))

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  // Reset kuis
  const handleResetAndBack  = () => {
    localStorage.removeItem("quiz_progress")
    localStorage.removeItem("quiz_questions")

    setCurrentIndex(0)
    setScore({ correct: 0, incorrect: 0, totalAnswered: 0 })
    setTimeLeft(900)
    setIsFinished(false)

    fetchQuestions()
    navigate("/")
  }

  // --- EFFECTS ---

  // Effect A: Load dari LocalStorage atau fetch baru
  useEffect(() => {
    const savedProgress = localStorage.getItem("quiz_progress")
    const savedQuestions = localStorage.getItem("quiz_questions")

    if (savedProgress && savedQuestions) {
      const parsedProgress = JSON.parse(savedProgress)
      setQuestions(JSON.parse(savedQuestions))
      setCurrentIndex(parsedProgress.currentIndex)
      setScore(parsedProgress.score)
      setTimeLeft(parsedProgress.timeLeft)
      setLoading(false)
    } else {
      fetchQuestions()
    }
  }, [])

  // Effect B: Timer
  useEffect(() => {
    if (isFinished || questions.length === 0) return

    if (timeLeft === 0) {
      setIsFinished(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isFinished, questions.length])

  // Effect C: Simpan progress
  useEffect(() => {
    if (questions.length > 0 && !isFinished) {
      localStorage.setItem(
        "quiz_progress",
        JSON.stringify({ currentIndex, score, timeLeft })
      )
    }
  }, [currentIndex, score, timeLeft, questions, isFinished])

  // --- UI STATES ---
  if (loading) return <p className="p-8">Loading soal...</p>
  // if (error) return <p className="p-8 text-red-500">{error}</p>

  if (isFinished) {
    return (
      <div className="p-8 border border-gray-300 bg-[#799EFF] rounded-lg shadow-md mt-22 mx-96 text-center">
        <h2 className="text-3xl font-bold mb-7 text-white"><u>Kuis Selesai</u></h2>
        <p className="text-black font-bold">Nama peserta = {userName}</p>
        <p className="text-white my-4">Jawaban benar = {score.correct}</p>
        <p className="text-white my-4">Jawaban salah = {score.incorrect}</p>

        <button
          onClick={handleResetAndBack}
          className="mt-6 px-40 py-2 bg-white text-black rounded-xl  hover:bg-blue-600 font-bold"
        >Main Lagi</button>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-[#799EFF] text-white">
        <h1 className="font-semibold text-lg">{userName}</h1>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined">timer</span>
          <p>
            {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* Question Section */}
      <div className="p-8 border border-gray-300 rounded-lg shadow-md mt-6 mx-8">
        <h2 className="mb-4 font-medium">
          Pertanyaan {currentIndex + 1} dari {questions.length}
        </h2>

        <p
          className="mb-6 font-semibold"
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        />

        <div className="flex flex-col gap-4">
          {currentQuestion.shuffled_answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              className="border border-gray-300 rounded-lg p-3 text-left hover:bg-gray-100"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Kuis

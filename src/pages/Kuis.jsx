import React from 'react'

const Kuis = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-[#799EFF] text-white">
      <h1 className="font-semibold text-lg">Nama Peserta</h1>

      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined">timer</span>
        <p>23:00</p>
      </div>
    </div>
  )
}

export default Kuis
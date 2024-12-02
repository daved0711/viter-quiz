import React from 'react'

function Pills({isActive}) {
  return (
    <span className={`text-[8px]  px-2 py-0.5 rounded-full
     w-[50px] border text-center bg-opacity-20 ${isActive ? "bg-success border-success text-success "
      : "bg-gray-300 border-gray-600 text-gray-200"}`}>
      {isActive ? "Active ito" : "Inactive po "}
    </span>
  )
}

export default Pills

import React from 'react'

const Loadding = () => {
  return (
    <div id="preloder" className="fixed inset-0 flex justify-center items-center bg-white">
        <div className=" border-t-4 border-red-300 rounded-full w-16 h-16 animate-spin"></div>
      </div>
  )
}

export default Loadding

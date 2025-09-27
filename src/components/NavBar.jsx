import React from 'react'

function NavBar() {
  return (
    <div>
      <nav className="flex items-center justify-around text-white py-7">
        <h1 className="text-xl font-bold">LuxureDetails</h1>
        <ul className="flex items-center gap-5">
          <li className="list-none">
            <a
              href=""
              className="relative inline-block 
                         after:content-[''] after:absolute after:w-full after:h-[2px] 
                         after:bg-white after:bottom-0 after:left-0 after:origin-center 
                         after:scale-x-0 after:transition-transform after:duration-300 
                         hover:after:scale-x-100"
            >
              Services
            </a>
          </li>
          <li className="list-none">
            <a
              href=""
              className="relative inline-block 
                         after:content-[''] after:absolute after:w-full after:h-[2px] 
                         after:bg-white after:bottom-0 after:left-0 after:origin-center 
                         after:scale-x-0 after:transition-transform after:duration-300 
                         hover:after:scale-x-100"
            >
              Pricing
            </a>
          </li>
          <li className="list-none">
            <a
              href=""
              className="relative inline-block 
                         after:content-[''] after:absolute after:w-full after:h-[2px] 
                         after:bg-white after:bottom-0 after:left-0 after:origin-center 
                         after:scale-x-0 after:transition-transform after:duration-300 
                         hover:after:scale-x-100"
            >
              About
            </a>
          </li>
          <li className="list-none">
            <a
              href=""
              className="relative inline-block 
                         after:content-[''] after:absolute after:w-full after:h-[2px] 
                         after:bg-white after:bottom-0 after:left-0 after:origin-center 
                         after:scale-x-0 after:transition-transform after:duration-300 
                         hover:after:scale-x-100"
            >
              Contact
            </a>
          </li>
        </ul>
        <button className="relative overflow-hidden border border-solid p-2 rounded-md text-white hover:text-black transition-colors duration-300 before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full">
          <span className="relative z-10">Get a quote</span>
        </button>
      </nav>
    </div>
  )
}

export default NavBar

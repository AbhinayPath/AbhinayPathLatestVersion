"use client"

import type React from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/">
                <a className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-500 text-lg">Home</span>
                </a>
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              <Link href="/admissions">
                <a className="py-4 px-2 text-gray-500 font-semibold hover:text-[#2D1A54] transition-colors">
                  Admissions
                </a>
              </Link>
              <Link href="/post-opportunity">
                <a className="text-sm font-medium text-gray-700 hover:text-[#2D1A54] transition-colors">
                  Post Opportunity
                </a>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <div className="flex items-center space-x-1">
                <Link href="/profile">
                  <a className="py-4 px-2 text-gray-500 font-semibold hover:text-[#2D1A54] transition-colors">
                    Profile
                  </a>
                </Link>
                <button
                  onClick={logout}
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-[#2D1A54] transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Link href="/login">
                  <a className="py-4 px-2 text-gray-500 font-semibold hover:text-[#2D1A54] transition-colors">Login</a>
                </Link>
                <Link href="/signup">
                  <a className="py-4 px-2 text-gray-500 font-semibold hover:text-[#2D1A54] transition-colors">Signup</a>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-[#2D1A54]"
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden mobile-menu">
        <ul className="flex flex-col md:hidden">
          <li className="active">
            <Link href="/">
              <a className="flex py-2 pl-4 text-gray-500 hover:text-[#2D1A54] transition-colors">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/admissions">
              <a className="flex py-2 pl-4 text-gray-500 hover:text-[#2D1A54] transition-colors">Admissions</a>
            </Link>
          </li>
          <li>
            <Link href="/post-opportunity">
              <a className="flex py-2 pl-4 text-gray-500 hover:text-[#2D1A54] transition-colors">Post Opportunity</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/profile">
                  <a className="flex py-2 pl-4 text-gray-500 hover:text-[#2D1A54] transition-colors">Profile</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="flex py-2 pl-4 text-gray-500 hover:text-[#2D1A54] transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  <a className="flex py-2 pl-4 text-gray-500 hover:text-[#2D1A54] transition-colors">Login</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a className="flex py-2 pl-4 text-gray-500 hover:text-[#2D1A54] transition-colors">Signup</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

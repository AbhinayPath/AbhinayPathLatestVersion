import Link from "next/link"
import { User } from "lucide-react"

const Navbar = ({ user }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        {/* Logo */}
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="text-xl font-bold text-gray-800 lg:text-2xl hover:text-gray-400">Logo</a>
          </Link>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-700 rounded-md outline-none focus:outline-none">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20H3C0.790861 20 0 18.2091 0 16V8C0 5.79086 0.790861 4 3 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link href="/opportunities">
            <a className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">Opportunities</a>
          </Link>
          <Link href="/post-opportunity">
            <a className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">Post Opportunity</a>
          </Link>
          {user && (
            <Link
              href="/create-actor-profile"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <User className="h-4 w-4" />
              Create Profile
            </Link>
          )}
          {/* Other links */}
          {/* <Link href="/about">
            <a className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              About
            </a>
          </Link>
          <Link href="/contact">
            <a className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              Contact
            </a>
          </Link> */}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <ul className="flex flex-col mt-4 space-y-4">
            <li>
              <Link href="/opportunities">
                <a className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  Opportunities
                </a>
              </Link>
            </li>
            <li>
              <Link href="/post-opportunity">
                <a className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  Post Opportunity
                </a>
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  href="/create-actor-profile"
                  className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  <User className="h-4 w-4" />
                  Create Profile
                </Link>
              </li>
            )}
            {/* Other links */}
            {/* <li>
              <Link href="/about">
                <a className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  Contact
                </a>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

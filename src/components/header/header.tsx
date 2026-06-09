import { Link } from "react-router-dom"
import { useAuth } from "../../context/auth-context"

function Header() {
  const { user, logout } = useAuth()
  const HEADER_LINKS = [
    { to: '/make-new', label: 'Make new' },
    { to: '/trainings', label: 'Trainings' },
  ]
  return (
    <header className="flex items-center justify-between bg-slate-800 text-white px-6 py-4">
      <nav className="flex gap-4">
        <Link to="/">
          <img src="logo.png" alt="Logo" className="h-8" />
        </Link>
        {HEADER_LINKS.map(link => (
          !!user && (
            <Link key={link.to} to={link.to} className="hover:text-blue-400 transition">
              {link.label}
            </Link>
          )
        ))}
      </nav>
      {user && <button
        onClick={() => { logout() }}
        className="rounded bg-red-600 px-4 py-2 hover:bg-red-700 cursor-pointer">
        Logout
      </button>}
    </header>
  )
}

export default Header

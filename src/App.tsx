import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { lazy, Suspense, useEffect } from 'react'
import ProtectedRoute from './routes/protected-route'
import PublicRoute from './routes/public-route'
import { setNavigate } from './shared/utils/navigation'
import { setLocation } from './shared/utils/location'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/ru'
import dayjs from 'dayjs'
import { useAuth } from './context/auth-context'

const Login = lazy(() => import('./components/login/login'))
const Home = lazy(() => import('./components/home/home'))
const CreatingForm = lazy(() => import('./components/creating-form/creating-form'))
const TrainingsListContainer = lazy(() => import('./components/trainings-list-container/trainings-list-container'))

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  useEffect(() => {
    setNavigate(navigate)
    dayjs.extend(weekday)
    dayjs.extend(localeData)
    dayjs.locale('ru')
  }, [])

  useEffect(() => {
    setLocation(location.pathname)
  }, [location])

  return (
    <>
      <header>
        <nav>
          {user ? <Link to="/">Home</Link> : <Link to="/login">Login</Link>} |
          <Link to="/make-new">Make new</Link> |
          <Link to="/trainings">Trainings</Link>
        </nav>
      </header>

      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>

          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/make-new" element={
            <ProtectedRoute>
              <CreatingForm />
            </ProtectedRoute>
          } />

          <Route path="/trainings" element={
            <ProtectedRoute>
              <TrainingsListContainer />
            </ProtectedRoute>
          } />

          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

        </Routes>
      </Suspense>
    </>
  )
}

export default App

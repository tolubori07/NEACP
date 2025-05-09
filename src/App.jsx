import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from './error-page';
import Loading from './Loading';

const Donordashboard = lazy(() => import('./pages/profiles/donordashboard'))
const Manageappointments = lazy(() => import('./pages/Appointments/manageAppointments'))
const Profile = lazy(() => import('./pages/profiles/Profile'))
const SearchAppointment = lazy(() => import('./pages/Appointments/SearchAppointment'))
const Dlogin = lazy(() => import('./pages/Auth/Dlogin'))
const Allappointments = lazy(() => import('./pages/Appointments/Allappointments'))
const BookAppointments = lazy(() => import('./pages/Appointments/BookAppointments'))
const Confirm = lazy(() => import('./pages/Appointments/Confirm'))
const App = () => {
  return (
    <Router>
      <main className="min-h-screen bg-bg pb-12">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Donordashboard />} />
            <Route path="/manageappointment/:id" element={<Manageappointments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookappointment" element={<SearchAppointment />} />
            <Route path="/appointments" element={<Allappointments />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/dlogin" element={<Dlogin />} />
            <Route path="/book/:id" element={<BookAppointments />} />
            <Route path='/confirm/:centre/:date/:time' element={<Confirm />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  )
}

export default App

import { Component, lazy } from "solid-js"
import { Routes, Route } from "solid-app-router"
import Nav from "./components/Nav"

const PatientsPage = lazy(() => import("./pages/PatientsPage"))
const PatientPage = lazy(() => import("./pages/PatientPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const QueriesPage = lazy(() => import("./pages/QueriesPage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))

const App: Component = () => {
  return (
    <>
      <Nav/>
      <div class="container max-w-4xl flex-grow p-6">
        <Routes>
          <Route path="/" element={<PatientsPage/>}/>
          <Route path="/patients/:fiscalCode">
            <Route path="/" element={<PatientPage/>} />
          </Route>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/queries" element={<QueriesPage/>}/>
          <Route path="/*all" element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
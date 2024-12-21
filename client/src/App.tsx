import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import FormCreation from "./pages/FormCreation"
import FormView from "./pages/FormView"
import Home from "./pages/Home"
import Submissions from "./pages/Submissions"

const App = () => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/form/new" element={<FormCreation />} />
          <Route path="/submissions/:formId" element={<Submissions />} />
        </Route>
        <Route path="form/:id" element={<FormView />} />
      </Routes>
    </div>
  )
}

export default App

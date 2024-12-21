import { Link, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <header className="py-6 border-b border-b-gray-400 w-full flex items-center justify-between">
        <Link to="/" className="text-3xl font-semibold">Form Generator</Link>
        <Link to="/form/new" className="py-2 px-6 rounded-md text-white font-medium bg-yellow-600 text-sm">Create</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

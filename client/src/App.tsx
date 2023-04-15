import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Home, CreatPost } from "./pages"
import logo from './assets/logo.svg';

function App() {

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white px-4 sm:px-8 py-4 border-b">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link to="/create-post" className="font-medium rounded-md py-2 px-4 text-white bg-violet-500">
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-slate-100 min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatPost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

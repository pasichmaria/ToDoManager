import {Route, Routes} from "react-router-dom"
import {TodoPage} from "./pages"

function App() : JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoPage />}/>
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
    </>
  )
}

export default App

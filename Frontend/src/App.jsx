import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl text-amber-500'>CAMPUS-CONNECT</h1>
      <h5>An application which connects Student and faculties</h5>
    </>
  )
}

export default App

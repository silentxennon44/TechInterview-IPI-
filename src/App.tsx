import { useEffect, useState } from "react"
import "./index.css"
import supabase from './utils/supabase'
function App() {
  // const [todos, setTodos] = useState([])

  useEffect(() => {
    async function getTodos() {
      const { data } = await supabase.from('items').select()

      console.log(data)

      // if (data.length > 1) {
      //   setTodos(data)
      // }
    }

    getTodos()
  }, [])

  return (
    <>
      test app
    </>
  )
}

export default App

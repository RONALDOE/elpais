import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '@pages/Home'
import PostView from '@pages/PostView'

function App() {

  return (
    <BrowserRouter>

    <Routes>
      <Route  path='/' element={<Home/>}/> 
      <Route  path='/post/:postId' element={<PostView/>}/> 
    </Routes>
    </BrowserRouter>

  )
}

export default App

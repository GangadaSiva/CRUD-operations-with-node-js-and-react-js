
import './App.css';
import './bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Movie from './Movie';
import Create from './Create';
import Edit from './Edit';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element = {<Movie/>}></Route>
            <Route path='/create' element = {<Create/>}></Route>
            <Route path='/edit/:id' element = {<Edit/>}></Route>
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

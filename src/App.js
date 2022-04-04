import {HashRouter, Routes, Route} from "react-router-dom"
import { Link } from "react-router-dom";
import Login from "./components/Login";
import Pokedex from "./components/Pokedex";
import PokedexInfo from "./components/PokedexInfo";
import ProtectedRoutes from "./components/ProtecteRoutes";
import PokedexSettings from "./components/PokedexSettings";
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="pokeball"></div>
      <Link to={'/settings'}>
        <div className="btn-settings btn">
          <i className="fa-solid fa-gear"></i>
        </div>
      </Link>
    <div className="App container">
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/settings' element={<PokedexSettings/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path='/pokedex' element={<Pokedex/>}/>
              <Route path='/pokedex/:id' element={<PokedexInfo/>}/>
            </Route>
        </Routes>
    </div>
  </HashRouter>
  );
}

export default App;

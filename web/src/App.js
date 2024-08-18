import {Route, Routes} from "react-router-dom";
import Home from "./view/Home";
import Login from "./view/Login";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/logs"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
            </Routes>
        </>
    );
}

export default App;

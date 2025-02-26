import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/header/header";
import Hero from "./pages/hero/hero";
import Registro from "./pages/user/registro";
import Sobre from "./pages/about/sobre";
import Footer from "./pages/footer/footer";
import Login from "./pages/user/login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Registrar" element={<Registro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sobre" element={<Sobre />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

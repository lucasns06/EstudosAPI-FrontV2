import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/header/header";
import Hero from "./pages/hero/hero";
import Registro from "./pages/user/registro";
import Sobre from "./pages/about/sobre";
import Footer from "./pages/footer/footer";
import Login from "./pages/user/login";
import Categorias from "./pages/categorias/categorias";
import { UserProvider } from "./userContext";
import api from "./services/axios";
import Perfil from "./pages/user/perfil";
import Playground from "./pages/playground/Playground";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Registrar" element={<Registro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Categorias" element={<Categorias />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Playground" element={<Playground />} />
        </Routes>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

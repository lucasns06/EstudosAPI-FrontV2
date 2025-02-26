import { useState } from "react";
import api from "../../services/axios";
import { useUser } from "../../userContext";

function Login() {
    const { setUser } = useUser();
    const [erro, setErro] = useState(false);
    
    let nomeDigitado = "";
    let senhaDigitada = "";

    function Logar() {
        nomeDigitado = document.querySelector('.nomeInput').value;
        senhaDigitada = document.querySelector('.senhaInput').value;

        api.post("/usuarios/Autenticar", {
            Username: nomeDigitado,
            PasswordString: senhaDigitada
        })
            .then(function (response) {
                setUser(response.data);
                setErro(false);
            })
            .catch(function (error) {
                console.log(error + '\n' + nomeDigitado, senhaDigitada);
                setErro(true);
            });
    }

    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">Login</h1>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Nome
                        </label>
                        <input className="nomeInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-500" id="username" type="text" placeholder="Nome do usuário" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Senha
                        </label>
                        <input className="senhaInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-500 focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={() => Logar()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Logar
                        </button>
                        <a classNameName="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Esqueceu a senha?
                        </a>
                    </div>
                </form>
                {erro && (
                    <p className="text-center text-red-500">Usuario não encontrado</p>
                )}
            </div>
        </div>
    );
}
export default Login;
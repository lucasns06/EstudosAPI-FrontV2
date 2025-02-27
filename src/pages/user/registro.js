import { Link } from "react-router-dom";

function Registro() {
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">Criar Conta</h1>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Nome
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline" id="username" type="text" placeholder="Digite seu Nome" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline" id="email" type="text" placeholder="Digite seu email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Senha
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-500 focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Confirme a senha
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-500 focus:shadow-outline" id="passwordConfirm" type="password" placeholder="******************" />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-blue-500 focus:shadow-outline" type="button">
                            Criar Conta
                        </button>
                        <Link to="/Login" classNameName="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
                            Já tem uma conta?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Registro;
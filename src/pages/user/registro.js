import { Link, useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

function Registro() {
    const [passwordError, setPasswordError] = useState("");
    let [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    let senhaRegister = "";
    let nomeRegister = "";
    let senhaConfirmRegister = "";
    function Registrar() {
        nomeRegister = document.querySelector('.nomeRegister').value;
        senhaRegister = document.querySelector('.senhaRegister').value;
        senhaConfirmRegister = document.querySelector('.senhaConfirmRegister').value;

        if (senhaRegister.length == 0 && nomeRegister.length == 0 && senhaConfirmRegister.length == 0) {
            setPasswordError("Formulario vazio.");
            return
        }

        if (senhaRegister != senhaConfirmRegister) {
            setPasswordError("As senhas são diferentes.");
            return
        }

        if (senhaRegister.trim().length < 8) {
            setPasswordError("A senha tem que ter pelo menos 8 caracteres!");
            return
        }

        api.post('/Usuarios/Registrar', {
            username: nomeRegister,
            passwordString: senhaRegister
        }).then(function (response) {
            setIsOpen(true);
        }).catch(function (error) {
            console.log(error);
        })

    }
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">Criar Conta</h1>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Nome
                        </label>
                        <input onClick={() => setPasswordError("")} required className="nomeRegister shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline" id="username" type="text" placeholder="Digite seu Nome" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Senha
                        </label>
                        <input required className="senhaRegister shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-500 focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Confirme a senha
                        </label>
                        <input required className="senhaConfirmRegister shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-500 focus:shadow-outline" id="passwordConfirm" type="password" placeholder="******************" />
                    </div>
                    <p className="text-red-500 text-center">{passwordError}</p>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <button type="button" onClick={() => Registrar()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-blue-500 focus:shadow-outline" >
                            Criar Conta
                        </button>
                        <Link to="/Login" classNameName="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
                            Já tem uma conta?
                        </Link>
                    </div>
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 shadow-2xl">
                                <DialogTitle className="font-bold text-2xl text-center">Conta Criada</DialogTitle>
                                <p>Agora você pode logar!</p>
                                <div className="flex gap-4 justify-between">
                                    <button onClick={() => { setIsOpen(false); navigate('/Login') }} className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600">Logar</button>
                                    <button onClick={() => setIsOpen(false)} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">Fechar</button>
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>
                </form>
            </div>
        </div>
    );
}
export default Registro;
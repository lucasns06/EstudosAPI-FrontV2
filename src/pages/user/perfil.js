import { useNavigate } from "react-router-dom";
import { useUser } from "../../userContext"
import { WrenchIcon } from '@heroicons/react/24/outline';
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import api from "../../services/axios";

export default function Perfil() {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const [openModalConfig, setOpenModalConfig] = useState(false);
    const [openModalConfigDelete, setOpenModalConfigDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState("");

    function DeletarConta() {
        api.delete(`/Usuarios/${user.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
        ).then(function () {        
            navigate('/');

            setTimeout(() => {
                setUser(null);
                localStorage.removeItem('userData')
            }, 500);

        }).catch(function () {
            setErrorDelete("Erro ao deletar conta!")
        })
    }

    function Deslogar() {
        navigate('/');

        setTimeout(() => {
            setUser(null);
            localStorage.removeItem('userData')
        }, 500);
    }
    if (!user) {
        return (
            <div style={{ minHeight: 'calc(100vh - 68px)' }} className="mt-[72px]">
                <p className='text-4xl text-red-500 text-center'>Você precisa estar logado..</p>
            </div>
        )
    }
    return (
        <div style={{ minHeight: 'calc(100vh - 68px)' }} className="mt-[72px] flex flex-col justify-center items-center">
            <div className="text-left w-max m-auto shadow-xl p-10 rounded-xl relative">
                <WrenchIcon onClick={() => setOpenModalConfig(true)} className="absolute top-2 right-2 size-6 cursor-pointer hover:text-gray-500" />
                <Dialog open={openModalConfig} onClose={() => setOpenModalConfig(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
                        <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 shadow-2xl flex flex-col items-center">
                            <DialogTitle className="font-bold text-2xl text-center">Opções da conta</DialogTitle>
                            <button onClick={() => setOpenModalConfigDelete(true)} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">Deletar Conta</button>
                            <br />
                            <button onClick={() => setOpenModalConfig(false)} className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600">Voltar</button>
                        </DialogPanel>
                    </div>
                </Dialog>
                <h1 className="text-4xl text-center">Perfil</h1>
                <br />
                <h2 className="font-bold">Nome</h2>
                <p>{user.username}</p>
                <h2 className="font-bold">Data de acesso</h2>
                <p className="max-w-[82px] overflow-hidden text-nowrap">{user.dataAcesso}</p>
                <br />
                <button onClick={() => Deslogar()} className="bg-red-500 p-2 rounded-lg text-white shadow-xl hover:bg-red-600">Deslogar</button>
                <Dialog open={openModalConfigDelete} onClose={() => setOpenModalConfigDelete(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
                        <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 shadow-2xl flex flex-col items-center">
                            <DialogTitle className="font-bold text-2xl text-center">Tem Certeza?</DialogTitle>
                            <div className="flex w-full justify-between">
                                <button onClick={() => DeletarConta()} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">Sim</button>
                                <button onClick={() => {setOpenModalConfigDelete(false); setErrorDelete("")}} className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600">Não</button>
                            </div>
                            <p className="text-center text-red-500">{errorDelete}</p>
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}
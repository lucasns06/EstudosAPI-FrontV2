import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import api from '../../services/axios';
import { useEffect, useState } from 'react';
import { useUser } from '../../userContext';
import LoadingCircle from '../../components/loading';

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(false);
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    let [isOpen, setIsOpen] = useState(false);
    let [isOpenDelete, setIsOpenDelete] = useState(false);
    const [errorCategory, setErrorCategory] = useState("");
    let nomeDigitado = "";
    useEffect(() => {
        if (user) {
            api.get(`/Categorias/GetByUsuario/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(function (response) {
                    setCategorias(response.data);
                    setError(false);
                })
                .catch(function (error) {
                    console.log(error);
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    },);

    function CriarCategoria() {
        nomeDigitado = document.querySelector('.categoriaInput').value;
        if (nomeDigitado.trim().length < 5) {
            setErrorCategory("O Nome tem que ter pelo menos 5 caracteres!");
        } else {
            api.post('/Categorias', {
                nome: nomeDigitado,
                usuarioId: user.id
            },
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                .then(function (response) {
                    setIsOpen(false);
                    setErrorCategory("");
                })
                .catch(function (error) {

                })
        }
    }
    function DeletarCategoria(id) {
        api.delete(`/Categorias/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
    }
    if (loading && user) {
        return (
            <div style={{ minHeight: 'calc(100vh - 68px)' }} className="mt-[72px]">
                <LoadingCircle />
            </div>
        )
    }
    if (!user) {
        return (
            <div style={{ minHeight: 'calc(100vh - 68px)' }} className="mt-[72px]">
                <p className='text-4xl text-red-500 text-center'>Você precisa estar logado..</p>
            </div>
        )
    }

    if (error) {
        return (
            <div style={{ minHeight: 'calc(100vh - 68px)' }} className="mt-[72px]">
                <p className='text-4xl text-red-500 text-center'>erro ao carregar categorias..</p>
            </div>
        )
    }
    return (
        <div style={{ minHeight: 'calc(100vh - 68px)' }} className="mt-[72px]">
            <header className="flex items-center justify-center py-2 bg-white shadow-sm">
                <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white p-2 rounded-xl shadow-sm hover:bg-green-400">Criar Categoria</button>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 shadow-2xl">
                            <DialogTitle className="font-bold text-2xl text-center">Criar Categoria</DialogTitle>
                            <label className="block text-gray-700 text-sm font-bold">Nome</label>
                            <input onClick={() => setErrorCategory("")} className="categoriaInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500" type="text" placeholder="Nome da categoria" />
                            <p>{errorCategory}</p>
                            <div className="flex gap-4 justify-between">
                                <button onClick={() => CriarCategoria()} className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-600">Criar</button>
                                <button onClick={() => setIsOpen(false)} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">Cancelar</button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </header>
            <div className="flex justify-center items-start flex-wrap mt-4">
                {categorias.map((item) => (
                    <div key={item.id} className="p-4 shadow-lg m-2 w-full max-w-none min-h-32 relative sm:max-w-96">
                        <h1 className="font-bold text-xl mb-2">{item.nome}</h1>
                        {item.tarefas.map((item) => (
                            <div key={item.id} className="mb-4 relative">
                                {item.prioridade == 0 && (
                                    <p>Baixa</p>
                                )}
                                {item.prioridade == 1 && (
                                    <p className="text-blue-500">Media</p>
                                )}
                                {item.prioridade == 2 && (
                                    <p className="text-red-500">Alta</p>
                                )}
                                <p>{item.nome}</p>
                                <p>Término: <span className="rounded-full">{item.dataTermino}</span></p>
                                <div className='flex gap-2 items-center absolute top-2 right-2'>
                                    <PencilIcon aria-hidden="true" className="size-4 text-blue-500 cursor-pointer" />
                                    <TrashIcon aria-hidden="true" className="size-4 text-red-500 cursor-pointer" />
                                </div>
                            </div>
                        ))}
                        <div className='border-t-2'>
                            <PlusCircleIcon aria-hidden="true" className="size-6 text-green-500 cursor-pointer m-2" />
                        </div>
                        <div className="absolute flex gap-2 items-center top-2 right-2">
                            <PencilIcon aria-hidden="true" className="size-6 text-white bg-blue-500 rounded-full p-[2px] cursor-pointer" />
                            <TrashIcon onClick={() => setIsOpenDelete(true)} aria-hidden="true" className="size-6 text-white bg-red-500 rounded-full p-[2px] cursor-pointer" />
                            <Dialog open={isOpenDelete} onClose={() => setIsOpenDelete(false)} className="relative z-50">
                                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 shadow-2xl">
                                        <DialogTitle className="font-bold text-2xl text-center">Tem certeza?</DialogTitle>
                                        <div className="flex gap-4 justify-between">
                                            <button onClick={() => [DeletarCategoria(item.id), setIsOpenDelete(false)]} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">SIM</button>
                                            <button onClick={() => setIsOpenDelete(false)} className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600">Não</button>
                                        </div>
                                    </DialogPanel>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Categorias;
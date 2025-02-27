import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import api from '../../services/axios';
import { useEffect, useState } from 'react';
import { useUser } from '../../userContext';
import LoadingCircle from '../../components/loading';
function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(false);
    const { user } = useUser();
    const [loading, setLoading] = useState(true);

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
                    console.log(error)
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, []);

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
                <button className="bg-green-500 text-white p-2 rounded-xl shadow-sm hover:bg-green-400">Criar Categoria</button>
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
                            <TrashIcon aria-hidden="true" className="size-6 text-white bg-red-500 rounded-full p-[2px] cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Categorias;
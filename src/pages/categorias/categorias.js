import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import api from '../../services/axios';
import { useEffect, useState } from 'react';
import { useUser } from '../../userContext';
import LoadingCircle from '../../components/loading';
import ModalDatePicker from '../../components/ModalDatePicker'

function Categorias() {
    const { user } = useUser();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [buttonsActive, setButtonsActive] = useState(false);

    const [categorias, setCategorias] = useState([]);
    const [categoriaId, setCategoriaId] = useState(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [errorCategory, setErrorCategory] = useState("");
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    let [isOpen, setIsOpen] = useState(false);
    let [isOpenDelete, setIsOpenDelete] = useState(false);
    let [isOpenEdit, setIsOpenEdit] = useState(false);
    let [isOpenTarefa, setIsOpenTarefa] = useState(false);
    let [EditTarefaOpen, setEditTarefaOpen] = useState(false);
    let [isOpenDeleteTarefa, setIsOpenDeleteTarefa] = useState(false);
    const [tarefaId, setTarefaId] = useState(null);
    const [tarefaEditando, setTarefaEditando] = useState(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [DateTimeFor, setDateTimeFor] = useState("");
    const [prioridade, setPrioridade] = useState(0);

    let nomeDigitado = "";
    let nomeDigitadoTarefa = "";

    useEffect(() => {
        const buttonActiveSaved = localStorage.getItem('buttonActiveData');
        setButtonsActive(JSON.parse(buttonActiveSaved));
    }, [])

    function handleButtons() {
        const novoValor = !buttonsActive;
        setButtonsActive(novoValor);
        localStorage.setItem('buttonActiveData', JSON.stringify(novoValor));
    }
    function handleDateTime() {
        const year = selectedDate.getFullYear();
        const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
        const day = ('0' + selectedDate.getDate()).slice(-2);
        const formattedDate = `${day}-${month}-${year}`;
        setDateTimeFor(formattedDate);
    }
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
    }, [user, refreshTrigger]);

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
                    nomeDigitado = "";
                    setRefreshTrigger(prev => prev + 1);
                })
                .catch(function (error) {
                    nomeDigitado = "";
                    setErrorCategory(error);
                })
        }
    }
    function DeletarCategoria(id) {
        api.delete(`/Categorias/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(function () {
            setRefreshTrigger(prev => prev + 1);
        })
    }
    function EditarCategoria() {
        if (!categoriaEditando || categoriaEditando.nome.length < 5) {
            setErrorCategory("O Nome tem que ter pelo menos 5 caracteres!");
            return;
        }
        api.put(`/Categorias`,
            {
                id: categoriaEditando.id,
                nome: categoriaEditando.nome,
                usuarioId: user.id
            },
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
        ).then(function (response) {
            setIsOpenEdit(false);
            setCategoriaEditando(null);
            setRefreshTrigger(prev => prev + 1);
        })
            .catch(function (error) {
                setErrorCategory("erro");
            })
    }

    function CriarTarefa() {
        nomeDigitadoTarefa = document.querySelector('.tarefaInput').value;

        if (nomeDigitadoTarefa.trim().length == 0) {
            setErrorCategory("O Nome não pode estar vazio!");
            return
        }

        api.post('/Tarefas', {
            nome: nomeDigitadoTarefa,
            dataTermino: DateTimeFor,
            prioridade: prioridade,
            categoriaId: categoriaId,

        },
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then(function (response) {
                setIsOpenTarefa(false);
                setRefreshTrigger(prev => prev + 1);
            }).catch(function (error) {
                setErrorCategory("Erro");
            })

    }
    function EditarTarefa() {
        if (!tarefaEditando || tarefaEditando.nome.length < 5) {
            setErrorCategory("O Nome tem que ter pelo menos 5 caracteres!");
            return;
        }
        api.put(`/Tarefas`,
            {
                id: tarefaEditando.id,
                nome: tarefaEditando.nome,
                dataTermino: DateTimeFor,
                prioridade: prioridade,
                categoriaId: tarefaEditando.categoriaId
            },
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
        ).then(function (response) {
            setEditTarefaOpen(false);
            setTarefaEditando(null);
            setRefreshTrigger(prev => prev + 1);
            setDateTimeFor("");
        })
            .catch(function (error) {
                setErrorCategory("erro");
            })
    }
    function DeletarTarefa(id) {
        api.delete(`/Tarefas/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(function () {
            setRefreshTrigger(prev => prev + 1);
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
                <div className='flex gap-2'>
                    <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white p-2 rounded-xl shadow-sm hover:bg-green-400">Criar Categoria</button>
                    <button onClick={() => handleButtons()} className="bg-gray-500 text-white p-2 rounded-xl shadow-sm hover:bg-gray-400">{buttonsActive ? 'Mostrar Botões' : 'Esconder Botões'}</button>
                </div>
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
            <Dialog open={isOpenTarefa} onClose={() => { setIsOpenTarefa(false); setDateTimeFor(""); setPrioridade(0); }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 shadow-2xl">
                        <DialogTitle className="font-bold text-2xl text-center">Criar Tarefa</DialogTitle>
                        <p >Categoria Selecionada: <span className='font-bold'>{categoriaSelecionada}</span></p>
                        <label className="block text-gray-700 text-sm font-bold">Nome</label>
                        <input onClick={() => setErrorCategory("")} className="tarefaInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500" type="text" placeholder="Nome da tarefa" />
                        <button
                            onClick={() => setIsDatePickerOpen(true)}
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                        >
                            Selecionar Data de Término
                        </button>
                        <p>Data de Término: {DateTimeFor}</p>
                        <ModalDatePicker
                            isOpen={isDatePickerOpen}
                            onClose={() => { setIsDatePickerOpen(false); handleDateTime(); }}
                            selectedDate={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                        />
                        <div className='flex items-center gap-2 flex-wrap'>
                            <p className='font-bold'>Prioridade:</p>
                            <button onClick={() => setPrioridade(0)} className='bg-gray-500 text-white px-2 py-1 rounded-xl hover:bg-gray-600'>Baixa</button>
                            <button onClick={() => setPrioridade(1)} className='bg-blue-500 text-white px-2 py-1 rounded-xl hover:bg-blue-600'>Media</button>
                            <button onClick={() => setPrioridade(2)} className='bg-red-500 text-white px-2 py-1 rounded-xl hover:bg-red-600'>Alta</button>
                        </div>
                        {prioridade == 0 && (
                            <p>Prioridade Selecionada: Baixa</p>
                        )}
                        {prioridade == 1 && (
                            <p>Prioridade Selecionada: <span className='text-blue-500'>Media</span></p>
                        )}
                        {prioridade == 2 && (
                            <p>Prioridade Selecionada: <span className='text-red-500'>Alta</span></p>
                        )}
                        <p className='text-red-500'>{errorCategory}</p>
                        <div className="flex gap-4 justify-between">
                            <button onClick={() => { CriarTarefa(); setDateTimeFor(""); setPrioridade(0); }} className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-600">Criar</button>
                            <button onClick={() => { setIsOpenTarefa(false); setDateTimeFor(""); setPrioridade(0); }} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">Cancelar</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <Dialog open={isOpenDelete} onClose={() => setIsOpenDelete(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 shadow-2xl">
                        <DialogTitle className="font-bold text-2xl text-center">Tem certeza?</DialogTitle>
                        <div className="flex gap-4 justify-between">
                            <button onClick={() => [DeletarCategoria(categoriaId), setIsOpenDelete(false)]} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">SIM</button>
                            <button onClick={() => setIsOpenDelete(false)} className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600">Não</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <Dialog open={isOpenDeleteTarefa} onClose={() => setIsOpenDeleteTarefa(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 shadow-2xl">
                        <DialogTitle className="font-bold text-2xl text-center">Tem certeza?</DialogTitle>
                        <div className="flex gap-4 justify-between">
                            <button onClick={() => [DeletarTarefa(tarefaId), setIsOpenDeleteTarefa(false)]} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">SIM</button>
                            <button onClick={() => setIsOpenDeleteTarefa(false)} className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600">Não</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <Dialog open={isOpenEdit} onClose={() => setIsOpenEdit(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 shadow-2xl">
                        <DialogTitle className="font-bold text-2xl text-center">Editar Categoria</DialogTitle>
                        <label className="block text-gray-700 text-sm font-bold">Nome</label>
                        <input value={categoriaEditando?.nome || ""} onChange={(e) => setCategoriaEditando({ ...categoriaEditando, nome: e.target.value })} onClick={() => setErrorCategory("")} className="categoriaInputEdit shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500" type="text" placeholder="Nome da categoria" />
                        <p>{errorCategory}</p>
                        <div className="flex gap-4 justify-between">
                            <button onClick={() => EditarCategoria()} className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-600">Editar</button>
                            <button onClick={() => setIsOpenEdit(false)} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">Cancelar</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <Dialog open={EditTarefaOpen} onClose={() => setEditTarefaOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 shadow-2xl">
                        <DialogTitle className="font-bold text-2xl text-center">Editar Tarefa</DialogTitle>
                        <label className="block text-gray-700 text-sm font-bold">Nome</label>
                        <input value={tarefaEditando?.nome || ""} onChange={(e) => setTarefaEditando({ ...tarefaEditando, nome: e.target.value })} onClick={() => setErrorCategory("")} className="tarefaInputEdit shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500" type="text" placeholder="Nome da Tarefa" />
                        <button
                            onClick={() => setIsDatePickerOpen(true)}
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                        >
                            Selecionar Data de Término
                        </button>
                        <p>Data de Término: {DateTimeFor}</p>
                        <ModalDatePicker
                            isOpen={isDatePickerOpen}
                            onClose={() => { setIsDatePickerOpen(false); handleDateTime(); }}
                            selectedDate={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                        />
                        <div className='flex items-center gap-2 flex-wrap'>
                            <p className='font-bold'>Prioridade:</p>
                            <button onClick={() => setPrioridade(0)} className='bg-gray-500 text-white px-2 py-1 rounded-xl hover:bg-gray-600'>Baixa</button>
                            <button onClick={() => setPrioridade(1)} className='bg-blue-500 text-white px-2 py-1 rounded-xl hover:bg-blue-600'>Media</button>
                            <button onClick={() => setPrioridade(2)} className='bg-red-500 text-white px-2 py-1 rounded-xl hover:bg-red-600'>Alta</button>
                        </div>
                        {prioridade == 0 && (
                            <p>Prioridade Selecionada: Baixa</p>
                        )}
                        {prioridade == 1 && (
                            <p>Prioridade Selecionada: <span className='text-blue-500'>Media</span></p>
                        )}
                        {prioridade == 2 && (
                            <p>Prioridade Selecionada: <span className='text-red-500'>Alta</span></p>
                        )}
                        <p className='text-red-500'>{errorCategory}</p>
                        <div className="flex gap-4 justify-between">
                            <button onClick={() => { EditarTarefa(); }} className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-600">Editar</button>
                            <button onClick={() => { setEditTarefaOpen(false); setDateTimeFor(""); }} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">Cancelar</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <div className="flex flex-wrap justify-center items-start">
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
                                <div className={`${buttonsActive ? "hidden" : "flex"} gap-2 items-center absolute bottom-2 right-2`}>
                                    <PencilIcon onClick={() => {
                                        setEditTarefaOpen(true);
                                        setTarefaEditando(item);
                                        setPrioridade(item.prioridade);
                                        setDateTimeFor(item.dataTermino);
                                        setSelectedDate(new Date(item.dataTermino));
                                    }}
                                        aria-hidden="true" className="size-4 text-blue-500 cursor-pointer" />
                                    <TrashIcon onClick={() => { setIsOpenDeleteTarefa(true); setTarefaId(item.id) }} aria-hidden="true" className="size-4 text-red-500 cursor-pointer" />
                                </div>
                            </div>
                        ))}
                        <div className='border-t-2'>
                            <PlusCircleIcon onClick={() => { setIsOpenTarefa(true); setCategoriaId(item.id); setCategoriaSelecionada(item.nome); }} aria-hidden="true" className="size-6 text-green-500 cursor-pointer m-2" />
                        </div>
                        <div className={`${buttonsActive ? "hidden" : "flex"} absolute gap-2 items-center top-2 right-2`}>
                            <PencilIcon onClick={() => { setIsOpenEdit(true); setCategoriaEditando(item); }} aria-hidden="true" className="size-6 text-white bg-blue-500 rounded-full p-[2px] cursor-pointer" />
                            <TrashIcon onClick={() => { setIsOpenDelete(true); setCategoriaId(item.id) }} aria-hidden="true" className="size-6 text-white bg-red-500 rounded-full p-[2px] cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Categorias;
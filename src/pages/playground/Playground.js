import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useState } from 'react';
import ModalDatePicker from '../../components/ModalDatePicker';

function Playground() {
    const [categorias, setCategorias] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenAddTask, setIsOpenAddTask] = useState(false);
    const [isOpenEditTask, setIsOpenEditTask] = useState(false);
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [errorCategory, setErrorCategory] = useState("");
    const [errorTask, setErrorTask] = useState("");
    const [categoriaInput, setCategoriaInput] = useState("");
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [buttonsActive, setButtonsActive] = useState(false);

    const [newTask, setNewTask] = useState({
        name: '',
        description: '',
        dueDate: new Date()
    });
    useEffect(() => {
        const savedCategorias = JSON.parse(localStorage.getItem('categorias')) || [];
        setCategorias(savedCategorias);
    }, []);

    function handleButtons() {
        const novoValor = !buttonsActive;
        setButtonsActive(novoValor);
        localStorage.setItem('buttonActiveData', JSON.stringify(novoValor));
    }

    function salvarCategorias(novasCategorias) {
        setCategorias(novasCategorias);
        localStorage.setItem('categorias', JSON.stringify(novasCategorias));
    }

    function criarCategoria() {
        if (categoriaInput.trim().length < 5) {
            setErrorCategory("O Nome tem que ter pelo menos 5 caracteres!");
            return;
        }
        const novaCategoria = {
            id: Date.now(),
            nome: categoriaInput,
            tarefas: []
        };
        salvarCategorias([...categorias, novaCategoria]);
        setCategoriaInput("");
        setIsOpen(false);
    }

    function deletarCategoria(id) {
        salvarCategorias(categorias.filter(cat => cat.id !== id));
    }

    function editarCategoria() {
        if (!categoriaEditando || categoriaEditando.nome.length < 5) {
            setErrorCategory("O Nome tem que ter pelo menos 5 caracteres!");
            return;
        }
        salvarCategorias(categorias.map(cat =>
            cat.id === categoriaEditando.id ? categoriaEditando : cat
        ));
        setIsOpenEdit(false);
    }
 
    function addTask() {
        if (newTask.name.trim().length < 3) {
            setErrorTask("O nome da tarefa deve ter pelo menos 3 caracteres!");
            return;
        }

        const updatedCategorias = categorias.map(cat => {
            if (cat.id === selectedCategoryId) {
                return {
                    ...cat,
                    tarefas: [...cat.tarefas, { ...newTask, id: Date.now() }]
                };
            }
            return cat;
        });

        salvarCategorias(updatedCategorias);
        setIsOpenAddTask(false);
        setNewTask({ name: '', description: '', dueDate: new Date() });
    }

    function editTask() {
        if (!selectedTask || selectedTask.name.trim().length < 3) {
            setErrorTask("O nome da tarefa deve ter pelo menos 3 caracteres!");
            return;
        }

        const updatedCategorias = categorias.map(cat => {
            if (cat.id === selectedCategoryId) {
                return {
                    ...cat,
                    tarefas: cat.tarefas.map(t =>
                        t.id === selectedTask.id ? selectedTask : t
                    )
                };
            }
            return cat;
        });

        salvarCategorias(updatedCategorias);
        setIsOpenEditTask(false);
    }

    function deleteTask(taskId, categoryId) {
        salvarCategorias(categorias.map(cat =>
            cat.id === categoryId
                ? { ...cat, tarefas: cat.tarefas.filter(t => t.id !== taskId) }
                : cat
        ));
    }

    return (
        <div style={{ minHeight: 'calc(100vh - 68px)' }} className="mt-[72px]">
            <header className="flex items-center justify-center py-2 bg-white shadow-sm gap-2">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-green-500 text-white p-2 rounded-xl shadow-sm hover:bg-green-400"
                >
                    Criar Categoria
                </button>
                <button onClick={() => handleButtons()} className="bg-gray-500 text-white p-2 rounded-xl shadow-sm hover:bg-gray-400">{buttonsActive ? 'Mostrar Botões' : 'Esconder Botões'}</button>
            </header>
            {!categorias.length && (
                <div style={{ minHeight: 'calc(100vh - 128px)' }} className='flex flex-col justify-center items-center'>
                    <p className='text-5xl text-center'>Adicione uma categoria!</p>
                </div>
            )}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="max-w-lg border bg-white p-12 shadow-2xl">
                        <DialogTitle className="font-bold text-2xl text-center">Criar Categoria</DialogTitle>
                        <br />
                        <input
                            value={categoriaInput}
                            onChange={(e) => setCategoriaInput(e.target.value)}
                            className="border rounded w-full py-2 px-3"
                            type="text"
                            placeholder="Nome da categoria"
                        />
                        <p className="text-red-500">{errorCategory}</p>
                        <div className="flex gap-4 justify-between mt-4">
                            <button onClick={criarCategoria} className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-600">
                                Criar
                            </button>
                            <button onClick={() => setIsOpen(false)} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">
                                Cancelar
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <Dialog open={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="max-w-lg border bg-white p-12 shadow-2xl">
                        <DialogTitle className="font-bold text-2xl text-center">Editar Categoria</DialogTitle>
                        <input
                            value={categoriaEditando?.nome || ''}
                            onChange={(e) => setCategoriaEditando({
                                ...categoriaEditando,
                                nome: e.target.value
                            })}
                            className="border rounded w-full py-2 px-3"
                            type="text"
                            placeholder="Nome da categoria"
                        />
                        <p className="text-red-500">{errorCategory}</p>
                        <div className="flex gap-4 justify-between mt-4">
                            <button onClick={editarCategoria} className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-600">
                                Salvar
                            </button>
                            <button onClick={() => setIsOpenEdit(false)} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">
                                Cancelar
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <Dialog open={isOpenAddTask} onClose={() => setIsOpenAddTask(false)}>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="max-w-lg border bg-white p-8 shadow-2xl">
                        <DialogTitle className="font-bold text-2xl text-center mb-4">Nova Tarefa</DialogTitle>
                        <input
                            type="text"
                            placeholder="Nome da Tarefa"
                            value={newTask.name}
                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                            className="border rounded w-full py-2 px-3 mb-2"
                        />
                        <textarea
                            placeholder="Descrição"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            className="border rounded w-full py-2 px-3 mb-2"
                        />
                        <button
                            onClick={() => setIsDatePickerOpen(true)}
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                        >
                            Selecionar Data de Término
                        </button>
                        <ModalDatePicker
                            isOpen={isDatePickerOpen}
                            onClose={() => setIsDatePickerOpen(false)}
                            selectedDate={newTask.dueDate}
                            onChange={(date) => setNewTask({ ...newTask, dueDate: date })}
                        />
                        <p className="text-red-500 text-sm">{errorTask}</p>
                        <div className="flex gap-4 justify-end mt-4">
                            <button
                                onClick={addTask}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Adicionar
                            </button>
                            <button
                                onClick={() => setIsOpenAddTask(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Cancelar
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <Dialog open={isOpenEditTask} onClose={() => setIsOpenEditTask(false)}>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="max-w-lg border bg-white p-8 shadow-2xl">
                        <DialogTitle className="font-bold text-2xl text-center mb-4">Editar Tarefa</DialogTitle>
                        <input
                            type="text"
                            placeholder="Nome da Tarefa"
                            value={selectedTask?.name || ''}
                            onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
                            className="border rounded w-full py-2 px-3 mb-2"
                        />
                        <textarea
                            placeholder="Descrição"
                            value={selectedTask?.description || ''}
                            onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                            className="border rounded w-full py-2 px-3 mb-2"
                        />
                        <button
                            onClick={() => setIsDatePickerOpen(true)}
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                        >
                            Selecionar Data de Término
                        </button>
                        <ModalDatePicker
                            isOpen={isDatePickerOpen}
                            onClose={() => setIsDatePickerOpen(false)}
                            selectedDate={selectedTask?.dueDate || new Date()}
                            onChange={(date) => setSelectedTask({ ...selectedTask, dueDate: date })}
                        />
                        <p className="text-red-500 text-sm">{errorTask}</p>
                        <div className="flex gap-4 justify-end mt-4">
                            <button
                                onClick={editTask}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Salvar
                            </button>
                            <button
                                onClick={() => setIsOpenEditTask(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Cancelar
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <div className="flex flex-wrap justify-center items-start p-4">
                {categorias.map((item) => (
                    <div key={item.id} className="p-4 shadow-lg m-2 w-full max-w-sm min-h-32 relative bg-white rounded-lg">
                        <div className="flex justify-between items-start">
                            <h1 className="font-bold text-xl mb-2">{item.nome}</h1>
                            <div className={`${buttonsActive ? "hidden" : "flex"} gap-2`}>
                                <PlusCircleIcon
                                    onClick={() => {
                                        setSelectedCategoryId(item.id);
                                        setNewTask({ name: '', description: '', dueDate: new Date() });
                                        setErrorTask('');
                                        setIsOpenAddTask(true);
                                    }}
                                    className="size-6 text-green-500 cursor-pointer hover:text-green-600"
                                />
                                <PencilIcon
                                    onClick={() => {
                                        setIsOpenEdit(true);
                                        setCategoriaEditando(item);
                                        setErrorCategory("");
                                    }}
                                    className="size-6 text-blue-500 cursor-pointer hover:text-blue-600"
                                />
                                <TrashIcon
                                    onClick={() => deletarCategoria(item.id)}
                                    className="size-6 text-red-500 cursor-pointer hover:text-red-600"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            {item.tarefas.map(task => (
                                <div key={task.id} className="flex items-center justify-between p-2 border-b hover:bg-gray-50">
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{task.name}</h3>
                                        <p className="text-sm text-gray-600">{task.description}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className={`${buttonsActive ? "hidden" : "flex"} gap-2 ml-2`}>
                                        <PencilIcon
                                            onClick={() => {
                                                setSelectedTask(task);
                                                setSelectedCategoryId(item.id);
                                                setErrorTask('');
                                                setIsOpenEditTask(true);
                                            }}
                                            className="size-5 text-blue-400 cursor-pointer hover:text-blue-500"
                                        />
                                        <TrashIcon
                                            onClick={() => deleteTask(task.id, item.id)}
                                            className="size-5 text-red-400 cursor-pointer hover:text-red-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Playground;
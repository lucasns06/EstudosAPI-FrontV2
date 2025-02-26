import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
function Categorias() {
    const categorias = [
        {
            "id": 3,
            "nome": "Desenvolvimento de sistemas",
            "tarefas": [
                {
                    "id": 9,
                    "nome": "RpgApi",
                    "dataTermino": "05/12/2025",
                    "prioridade": 2,
                    "completo": true,
                    "categoriaId": 3
                },
                {
                    "id": 11,
                    "nome": "Estudos API Front",
                    "dataTermino": "11/12/2025",
                    "prioridade": 2,
                    "completo": false,
                    "categoriaId": 3
                }
            ],
            "usuarioId": 1,
            "usuario": null
        },
        {
            "id": 4,
            "nome": "PWEB2",
            "tarefas": [
                {
                    "id": 10,
                    "nome": "ComuniTec API",
                    "dataTermino": "05/12/2025",
                    "prioridade": 2,
                    "completo": true,
                    "categoriaId": 4
                },
                {
                    "id": 13,
                    "nome": "Pw-Study",
                    "dataTermino": "05/12/2025",
                    "prioridade": 1,
                    "completo": true,
                    "categoriaId": 4
                }
            ],
            "usuarioId": 1,
            "usuario": null
        },
        {
            "id": 25,
            "nome": "Programação Mobile",
            "tarefas": [
                {
                    "id": 12,
                    "nome": "Clima Tempo",
                    "dataTermino": "06/12/2025",
                    "prioridade": 2,
                    "completo": false,
                    "categoriaId": 25
                }
            ],
            "usuarioId": 1,
            "usuario": null
        },
        {
            "id": 27,
            "nome": "API de Correção",
            "tarefas": [
                {
                    "id": 15,
                    "nome": "Correção do seu trabalho que ficou ótimo!!",
                    "dataTermino": "2024/17/12",
                    "prioridade": 2,
                    "completo": false,
                    "categoriaId": 27
                }
            ],
            "usuarioId": 1,
            "usuario": null
        },
        {
            "id": 38,
            "nome": "Matematica",
            "tarefas": [
                {
                    "id": 21,
                    "nome": "Calculo 1",
                    "dataTermino": "05/12/2025",
                    "prioridade": 2,
                    "completo": false,
                    "categoriaId": 38
                }
            ],
            "usuarioId": 2,
            "usuario": null
        },
        {
            "id": 39,
            "nome": "Fisica",
            "tarefas": [
                {
                    "id": 20,
                    "nome": "Cinemática",
                    "dataTermino": "20/01/2025",
                    "prioridade": 2,
                    "completo": false,
                    "categoriaId": 39
                }
            ],
            "usuarioId": 2,
            "usuario": null
        },
        {
            "id": 40,
            "nome": "Biologia",
            "tarefas": [
                {
                    "id": 22,
                    "nome": "Ecologia",
                    "dataTermino": "02/05/2025",
                    "prioridade": 1,
                    "completo": false,
                    "categoriaId": 40
                }
            ],
            "usuarioId": 2,
            "usuario": null
        }
    ]
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
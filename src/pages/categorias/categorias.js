function Categorias() {
    const categorias = [
        {
            "id": 3,
            "nome": "Desenvolvimento de sistemas",
            "tarefas": [
                {
                    "id": 9,
                    "nome": "RpgApi",
                    "dataTermino": "2025-12-12",
                    "prioridade": 2,
                    "completo": true,
                    "categoriaId": 3
                },
                {
                    "id": 11,
                    "nome": "Estudos API Front",
                    "dataTermino": "2025-12-11",
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
                    "dataTermino": "2025-12-05",
                    "prioridade": 2,
                    "completo": true,
                    "categoriaId": 4
                },
                {
                    "id": 13,
                    "nome": "Pw-Study",
                    "dataTermino": "2025-12-05",
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
                    "dataTermino": "2025-12-06",
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
                    "dataTermino": "2024-12-17",
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
                    "dataTermino": "2025-12-05",
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
                    "dataTermino": "2025-01-20",
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
                    "dataTermino": "2025-02-05",
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
        <div style={{ minHeight: 'calc(100vh - 68px)' }} className="mt-[128px] flex justify-center items-start flex-wrap">
            {categorias.map((item) => (
                <div key={item.id} className="p-4 shadow-lg m-2 w-full max-w-96 min-h-32">
                    <h1 className="font-bold text-xl mb-2">{item.nome}</h1>
                    {item.tarefas.map((item) => (
                        <div key={item.id} className="mb-4">
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
                            <p>Término: <span className="bg-gray-500 text-white py-[2px] px-2 rounded-full">{item.dataTermino}</span></p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
export default Categorias;
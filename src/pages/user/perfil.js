import { useNavigate } from "react-router-dom";
import { useUser } from "../../userContext"

export default function Perfil() {
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    function Deslogar() {
        navigate('/')

        setTimeout(() => {
            setUser(null);
            localStorage.removeItem('userData')
        }, 500)
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
            <div className="text-left w-max m-auto shadow-xl p-10 rounded-xl">
                <h1 className="text-4xl text-center">Perfil</h1>
                <br />
                <h2 className="font-bold">Nome</h2>
                <p>{user.username}</p>
                <h2 className="font-bold">Data de acesso</h2>
                <p className="max-w-[82px] overflow-hidden text-nowrap">{user.dataAcesso}</p>
                <br />
                <button onClick={() => Deslogar()} className="bg-red-500 p-2 rounded-lg text-white shadow-xl hover:bg-red-600">Deslogar</button>
                {/* <div className="flex justify-between">
                    <button className="bg-blue-500 p-2 rounded-lg text-white shadow-xl hover:bg-blue-600">Editar Perfil</button>
                    <button className="bg-red-500 p-2 rounded-lg text-white shadow-xl hover:bg-red-600">Deletar conta</button>
                </div> */}
            </div>
        </div>
    )
}
import { useUser } from "../../userContext"

export default function Perfil() {

    const { user } = useUser();

    return (
        <div style={{ minHeight: 'calc(100vh - 68px)' }} className="mt-[72px]">
            <p>{user.nome}</p>
        </div>
    )
}
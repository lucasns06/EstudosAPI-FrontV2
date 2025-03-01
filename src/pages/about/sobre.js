import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import gsap from 'gsap';

function Sobre() {
    useEffect(() => {
          document.title = "EstudosAPI - Sobre"
    }, [])
    const aboutPage = useRef();
    useGSAP(() => {
        gsap.fromTo('.animaAbout', {
            opacity: 0,
            y: -50
        },
            {
                opacity: 1,
                y: 0,
                stagger: 0.8,
                duration: 0.5,
            });
    }, { scope: aboutPage })
    return (
        <div ref={aboutPage} className="h-screen w-full flex flex-col justify-center items-center gap-8 px-5">
            <h1 className="animaAbout text-center text-3xl sm:text-6xl">
                Criado Por <span className="text-blue-500">Lucas Nascimento</span>
            </h1>
            <a href="https://github.com/lucasns06" target="_blank" rel="noopener noreferrer" className="rounded-full" >
                <img className="animaAbout rounded-full border-4 border-blue-500 hover:border-blue-600" src="https://avatars.githubusercontent.com/u/170823502?v=4" alt="foto de perfil" />
            </a>
            <h1 className="animaAbout text-2xl">Gostou do site? veja o meu <a className="text-blue-500 font-bold" href="https://lucasns06.github.io/portfolio/" target="_blank" rel="noopener noreferrer">Portfolio</a></h1>
        </div>
    );
}
export default Sobre;
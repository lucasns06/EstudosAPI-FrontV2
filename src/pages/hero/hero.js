import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import studyAnima from '../../animations/studyAnima.json'
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
function Hero() {
    const features = [
        {
            name: 'Listar por ordem de Prioridade',
            description:
                'Você pode listar por prioridade para decidir qual tarefa fazer primeiro.',
            icon: CloudArrowUpIcon,
        },
        {
            name: 'Criptografia',
            description:
                'Criptografia Hash e Salt para a segurança dos nossos usuários.',
            icon: LockClosedIcon,
        },
        {
            name: 'Gerenciamento',
            description:
                'Você pode Criar, Editar e Excluir Categorias e Tarefas a vontade.',
            icon: ArrowPathIcon,
        },
        {
            name: 'Não tem o que colocar mais',
            description:
                'Criado por Lucas Nascimento.',
            icon: FingerPrintIcon,
        },
    ]

    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const tituloFirst = useRef();
    const tituloSecond = useRef();

    useGSAP(() => {
        gsap.fromTo('.animaHeroFirst', {
            opacity: 0,
            x: -50
        },
            {
                opacity: 1,
                x: 0,
                stagger: 1,
                duration: 1,
            });
        gsap.fromTo('.animaHeroFirstImg', {
            opacity: 0,
            x: 50
        },
            {
                opacity: 1,
                x: 0,
                duration: 1,
            })
    }, { scope: tituloFirst })

    useGSAP(() => {
        gsap.fromTo('.animaHeroSecond', {
            y: -50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.5,
            duration: 1,
            scrollTrigger: {
                trigger: '.animaHeroSecond',
                start: 'bottom bottom',
                end: 'top 20%',
                toggleActions: 'restart none none none',
                // scrub: true,
                // markers: true
            },
        })
    }, { scope: tituloSecond })
    return (
        <div className="App">
            <div className="min-h-screen flex flex-col justify-center isolate px-6 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6b9aff] to-[#2549b8] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div ref={tituloFirst} className="mx-auto flex flex-col-reverse items-center justify-center gap-4 lg:flex-row">
                    <div className="text-center">
                        <h1 className="animaHeroFirst text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                            Organize seus estudos
                        </h1>
                        <p className="animaHeroFirst mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                            Facilitando o caminho para o conhecimento.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/Registrar"
                                className="animaHeroFirst rounded-md shadow-xl bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-blue-400 focus-visible:outline-indigo-600"
                            >
                                Começar
                            </Link>
                        </div>
                    </div>
                    {/* <img src="study.png" /> */}
                    <Lottie
                        className='animaHeroFirstImg'
                        animationData={studyAnima}
                        loop={true}
                    />
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#6b9aff] to-[#2549b8] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>
            <div ref={tituloSecond} >
                <div className="bg-white min-h-screen flex items-center relative">
                    <div className='absolute w-full h-3 blur-xl bg-blue-500 top-0'></div>
                    <div className='absolute w-full h-1 blur-sm bg-blue-500 top-0'></div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="animaHeroSecond text-base/7 font-semibold text-indigo-600">Gerencie seus estudos</h2>
                            <p className="animaHeroSecond mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                                Tudo que você precisa para organizar seus estudos
                            </p>
                            <p className="animaHeroSecond mt-6 text-lg/8 text-gray-600">
                                A Estudos API é um projeto fullstack para aprendizados FRONT END e BACK END.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                {features.map((feature) => (
                                    <div key={feature.name} className="animaHeroSecond relative pl-16">
                                        <dt className="text-base/7 font-semibold text-gray-900">
                                            <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                                                <feature.icon aria-hidden="true" className="size-6 text-white" />
                                            </div>
                                            {feature.name}
                                        </dt>
                                        <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-2 py-4'>
                    <h1 className='animaHeroSecond text-4xl text-center font-bold'>Acesse agora mesmo!</h1>
                    <p className='animaHeroSecond text-2xl text-center'>
                        Crie sua conta e organize seus estudos de forma prática.
                    </p>
                    <br />
                    <a href="/Registrar" className='animaHeroSecond rounded-md shadow-xl bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-blue-400 focus-visible:outline-indigo-600'>Criar conta</a>
                </div>
            </div>
        </div>
    );
}

export default Hero;

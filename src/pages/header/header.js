'use client'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="absolute inset-x-0 top-0 z-50 shadow-lg bg-white">
            <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <span className="sr-only">EstudosAPI</span>
                        <img
                            alt=""
                            src="study_icon.png"
                            className="h-8 w-auto"
                        />
                        <p className='text-blue-500 font-bold'>EstudosAPI</p>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link to="/" className="text-sm/6 font-semibold text-gray-900"   >
                        Inicio
                    </Link>
                    <Link to="/Sobre" className="text-sm/6 font-semibold text-gray-900"   >
                        Sobre Nós
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                    <Link to="/Registrar" className="text-sm/6 font-semibold text-gray-900"   >
                        Criar Conta
                    </Link>
                    <Link to="/Login" className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Logar
                    </Link>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="study_icon.png"
                                className="h-8 w-auto"
                            />
                            <p className='text-blue-500 font-bold'>EstudosAPI</p>
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link to="/" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"   >
                                    Inicio
                                </Link>
                                <Link to="/Sobre" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"   >
                                    Sobre Nós
                                </Link>
                            </div>
                            <div className="py-6 flex flex-col gap-4">
                                <Link to="/Registrar" className="text-sm/6 font-semibold text-gray-900">
                                    Criar Conta
                                </Link>
                                <Link to="/Login" className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Logar
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
export default Header;
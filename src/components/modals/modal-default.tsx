'use client'

import { useEffect, useRef, useState } from "react";
import { ButtonSecondary } from "../buttons/button-secondary";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { ButtonPrimary } from "../buttons/button-primary";

interface Props {
    submit: () => void | Promise<void>;
    title: string;
    buttonType?: 'primary' | 'secondary'; 
    buttonTitle?: string;
    children?: any;
}

export function ModalDefault({ submit, title, buttonTitle, children, buttonType }: Props) {
    const [showModal, setShowModal] = useState(false);
    const ref = useRef(null);

    const handleOutsideClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <>
            {buttonType && buttonType == 'secondary' ? <ButtonSecondary title={buttonTitle} onClick={() => setShowModal(true)} /> : <ButtonPrimary title={buttonTitle} onClick={() => setShowModal(true)} />}
            {
                showModal &&
                <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md min-h-[500px] rounded-md" ref={ref}>
                        <header className="h-16 bg-blue-500 rounded-t-md flex items-center justify-between px-3">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setShowModal(false)} className="h-10 w-10 flex items-center justify-center bg-blue-600 rounded-md font-semibold text-white">
                                    <FiArrowLeft size={16} />
                                </button>
                                <span className="text-lg font-medium text-white">{title}</span>
                            </div>
                            <button
                                className="h-10 px-3 rounded-md bg-blue-600 text-white text-base font-medium"
                                onClick={async () => { 
                                    await submit();
                                    setShowModal(false); 
                                }}
                            >
                                Salvar
                            </button>
                        </header>
                        <div className="p-3 flex flex-col gap-4">
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
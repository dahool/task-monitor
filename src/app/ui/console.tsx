'use client'
import { useState } from "react"
import { ImTerminal } from "react-icons/im"
import { IoMdClose } from "react-icons/io"
import { Share_Tech_Mono } from "next/font/google";

const font = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  style: "normal"
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ConsoleDialog({children}: {children: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <ImTerminal title="Show output" onClick={() => setIsOpen(true)} className="cursor-pointer" />
            <ConsoleDialogContent isOpen={isOpen} onClose={handleClose}>{children}</ConsoleDialogContent>
        </>
    )

}

export function ConsoleDialogContent({isOpen, onClose, children}: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className={`${font.className} fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`} onClick={onClose}>
            <div id="modal-content" className="relative bg-white w-1/2 max-h-3/4 overflow-hidden rounded-lg shadow-lg p-5 min-h-[80vh]" onClick={(e) => e.stopPropagation()}>
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={onClose} aria-label="Close Modal">
                    <IoMdClose />
                </button>
                <div className="absolute w-[97%] h-[90%] overflow-auto p-4 whitespace-pre-wrap mt-[15px]">{children}</div>
            </div>
        </div>
    );
}

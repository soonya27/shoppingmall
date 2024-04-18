import { createContext, useContext, useState } from 'react';
import AlertModal from '../components/ui/AlertModal/AlertModal';
import ModalPortal from '../components/ui/icons/ModalPortal';

const ModalContext = createContext();

export function ModalContextProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalClose = () => setIsModalOpen(false);
    const modalOpen = () => setIsModalOpen(true);
    const [modalObj, setModalObj] = useState({});


    return <ModalContext.Provider value={{ isModalOpen, modalClose, modalOpen, setModalObj }}>
        {children}
        {
            isModalOpen && (
                <ModalPortal>
                    <AlertModal onClose={modalClose} modalObj={modalObj}>
                        <h5>{modalObj.title || ''}</h5>
                        <p>{modalObj.text || ''}</p>
                    </AlertModal>
                </ModalPortal>
            )
        }
    </ModalContext.Provider>
}

export function useModalContext() {
    return useContext(ModalContext);
}
import React, {FC} from 'react';
import './Modal.scss';

interface ModalProps {
    setIsVisible: (v: boolean) => void;
    children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({setIsVisible, children}) => {
    const setModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        let parent = target.parentNode as HTMLDivElement;

        while (parent) {
            if (parent.className === 'Modal' || target.className === 'Modal') {
                return;
            }
            parent = parent.parentNode as HTMLDivElement;
        }

        setIsVisible(false);
    }

    return (
        <div
            className='ModalContainer'
            onClick={e => setModal(e)}
        >
            <div className='Modal'>
                {children}
            </div>
        </div>
    );
};

export default Modal;
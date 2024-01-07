import React, {FC, useEffect, useRef, useState} from 'react';
import './Dropdown.scss';
import dropdownIcon from '../../../assets/svg/dropdownIcon.svg';

interface IOption {
    value: string;
    title: string;
}

interface DropdownProps {
    value: string;
    setValue: (v: string) => void;
    options: IOption[];
    className?: string;
}

const Dropdown: FC<DropdownProps> = ({value,setValue, options, className}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as HTMLElement)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            window.addEventListener('click', close);
        }

        return () => {
            window.removeEventListener('click', close);
        }
    }, [isOpen]);

    return (
        <div
            className={`Dropdown ${className}`}
            ref={ref}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className='DropdownHead'>
                {options.find(opt => opt.value === value)?.title}
                <img src={dropdownIcon} alt="click" className='DropdownIcon'/>
            </div>
            {isOpen &&
                <ul className='DropdownList'>
                    {options.map(opt =>
                        <li
                            key={opt.value}
                            className={opt.value === value ? 'DropdownSelectedItem' : 'DropdownItem'}
                            onClick={() => setValue(opt.value)}
                        >
                            {opt.title}
                        </li>
                    )}
                </ul>
            }
        </div>
    );
};

export default Dropdown;
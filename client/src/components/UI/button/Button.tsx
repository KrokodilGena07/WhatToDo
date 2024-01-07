import React, {FC} from 'react';
import './Button.scss';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'primary' | 'secondary' | 'icon' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

const Button: FC<ButtonProps> = props => {
    const size = props.type === 'icon' ? '' : `btn-${props.size || 'md'}`;

    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={`${props.type || 'primary'}-btn ${size} ${props.className}`}
        >
            {props.children}
        </button>
    );
};

export default Button;
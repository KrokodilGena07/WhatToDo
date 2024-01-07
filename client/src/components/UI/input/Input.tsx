import React, {FC} from 'react';
import './Input.scss';

interface InputProps {
    value: any;
    onChange: (v: any) => void;
    disabled?: boolean;
    className?: string;
    placeholder?: string;
    id?: string;
    type?: string;
    size?: 'sm' | 'md' | 'lg';
    isWrong?: boolean;
    min?: number;
}

const Input: FC<InputProps> = props => {
    const inputIsWrong = `${props.isWrong ? 'InputWrong' : ''}`;

    return (
        <input
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            disabled={props.disabled}
            placeholder={props.placeholder}
            id={props.id}
            type={props.type || 'text'}
            className={`input-${props.size || 'md'} Input ${inputIsWrong} ${props.className}`}
            min={props.min || 0}
        />
    );
};

export default Input;
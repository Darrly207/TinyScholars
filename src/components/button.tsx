// button.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    className = '',
    children,
    disabled,
    onClick,
    ...props
}) => {
    return (
        <button
            className={`btn ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};
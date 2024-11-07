// alert.tsx
import React, { HTMLAttributes } from 'react';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ className = '', children, ...props }) => {
    return (
        <div
            className={`alert ${className}`}
            role="alert"
            {...props}
        >
            {children}
        </div>
    );
};
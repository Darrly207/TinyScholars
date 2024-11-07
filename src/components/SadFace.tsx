// SadFace.tsx
import React from 'react';
import { XCircle } from 'lucide-react';

interface SadFaceProps {
    show: boolean;
}

const SadFace: React.FC<SadFaceProps> = ({ show }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            <div className="animate-bounce p-8">
                <XCircle size={120} className="text-red-500 animate-pulse" />
            </div>
        </div>
    );
};

export default SadFace;
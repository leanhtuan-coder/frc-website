import React from 'react';

interface ProgressProps {
    value: number; // 0-100
    className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className = '' }) => {
    return (
        <div className={`w-full bg-surface-border rounded-full h-2 overflow-hidden ${className}`}>
            <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
        </div>
    );
};

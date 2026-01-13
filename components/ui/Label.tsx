import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, className = '', ...props }) => {
    // Process children to make asterisks red
    const processChildren = (child: React.ReactNode): React.ReactNode => {
        if (typeof child === 'string') {
            // Replace * with red styled asterisk
            const parts = child.split(/(\*)/);
            return parts.map((part, index) =>
                part === '*' ? (
                    <span key={index} className="text-red-500 ml-0.5">*</span>
                ) : (
                    part
                )
            );
        }
        return child;
    };

    return (
        <label
            className={`block text-sm font-bold text-text-main mb-2 ${className}`}
            {...props}
        >
            {React.Children.map(children, processChildren)}
        </label>
    );
};

import React from 'react';

interface SliderProps {
    min: number;
    max: number;
    step: number;
    value: number[];
    onValueChange: (value: number[]) => void;
    className?: string;
}

export const Slider: React.FC<SliderProps> = ({
    min,
    max,
    step,
    value,
    onValueChange,
    className = '',
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange([parseInt(e.target.value)]);
    };

    const percentage = ((value[0] - min) / (max - min)) * 100;

    return (
        <div className={`relative w-full ${className}`}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value[0]}
                onChange={handleChange}
                className="w-full h-2 bg-surface-border rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                    background: `linear-gradient(to right, #0A63CF 0%, #0A63CF ${percentage}%, #DDE4EB ${percentage}%, #DDE4EB 100%)`
                }}
            />
            <style>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0A63CF;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0A63CF;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
        </div>
    );
};

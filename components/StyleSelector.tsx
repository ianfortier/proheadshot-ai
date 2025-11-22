import React from 'react';
import { HEADSHOT_STYLES } from '../constants';
import { HeadshotStyle } from '../types';
import { Check } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyles: HeadshotStyle[];
  onToggleStyle: (style: HeadshotStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyles, onToggleStyle }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {HEADSHOT_STYLES.map((option) => {
        const isSelected = selectedStyles.includes(option.id);
        return (
          <div
            key={option.id}
            onClick={() => onToggleStyle(option.id)}
            className={`
              cursor-pointer relative p-5 rounded-xl border transition-all duration-200 group
              ${isSelected 
                ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-500' 
                : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
              }
            `}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                  {option.label}
                </h4>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  {option.description}
                </p>
              </div>
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center border transition-colors
                ${isSelected 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'border-slate-300 bg-white text-transparent group-hover:border-blue-400'
                }
              `}>
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

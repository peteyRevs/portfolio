'use client';

import { Listbox } from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = ''
}: SelectProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-white mb-2">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-left focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all">
            <span className="block truncate">
              {value || <span className="text-slate-400">{placeholder}</span>}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronDown className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-slate-800 border border-slate-700 shadow-xl focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className="relative cursor-pointer select-none py-3 pl-10 pr-4 text-white hover:bg-slate-700 transition-colors"
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

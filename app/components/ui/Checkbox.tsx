'use client';

import { Checkbox as HeadlessCheckbox } from '@headlessui/react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function Checkbox({ label, checked, onChange, className = '' }: CheckboxProps) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <HeadlessCheckbox
        checked={checked}
        onChange={onChange}
        className="group relative flex h-4 w-4 items-center justify-center rounded border border-slate-700 bg-slate-800/50 transition-all data-[checked]:bg-blue-500 data-[checked]:border-blue-500"
      >
        <Check className="h-3 w-3 text-white opacity-0 transition-opacity group-data-[checked]:opacity-100" />
      </HeadlessCheckbox>
      {label && <span className="text-sm text-slate-300">{label}</span>}
    </label>
  );
}

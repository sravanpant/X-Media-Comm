// src/components/ui/Checkbox.tsx
"use client";

import { Check, Minus } from "lucide-react";

interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: () => void;
}

export function Checkbox({ checked, indeterminate, onChange }: CheckboxProps) {
  return (
    <button
      type="button"
      className={`
        h-4 w-4 rounded border
        ${
          checked || indeterminate
            ? "bg-indigo-600 border-indigo-600"
            : "border-gray-300"
        }
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      `}
      onClick={onChange}
    >
      {indeterminate ? (
        <Minus className="h-3 w-3 text-white" />
      ) : checked ? (
        <Check className="h-3 w-3 text-white" />
      ) : null}
    </button>
  );
}

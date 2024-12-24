// src/app/admin/communication-methods/SortableMethodItem.tsx
"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/Button";
import { GripVertical } from "lucide-react";
import { CommunicationMethod } from "@/lib/mockData";

interface Props {
  method: CommunicationMethod;
  onDelete: () => void;
}

export function SortableMethodItem({ method, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: method.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="p-4 hover:bg-gray-50">
      <div className="flex items-center">
        <button
          className="mr-3 text-gray-500 touch-none"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <div className="flex-grow">
          <h3 className="text-sm font-medium">{method.name}</h3>
          <p className="text-sm text-gray-500">{method.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              method.isMandatory
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {method.isMandatory ? "Mandatory" : "Optional"}
          </span>
          <Button variant="secondary" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

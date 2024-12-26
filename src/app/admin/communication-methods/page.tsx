// src/app/admin/communication-methods/page.tsx
"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/layouts/Card";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableMethodItem } from "./SortableMethodItem";
import { Plus } from "lucide-react";

export default function CommunicationMethodsPage() {
  const { state, dispatch } = useApp();
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    isMandatory: false,
    count: 0,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddMethod = () => {
    dispatch({
      type: "ADD_COMMUNICATION_METHOD",
      payload: {
        id: crypto.randomUUID(),
        ...newMethod,
        sequence: state.communicationMethods.length + 1,
      },
    });
    setNewMethod({ name: "", description: "", isMandatory: false, count: 0 });
    setIsAddingMethod(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = state.communicationMethods.findIndex(
        (method) => method.id === active.id
      );
      const newIndex = state.communicationMethods.findIndex(
        (method) => method.id === over.id
      );

      const updatedMethods = arrayMove(
        state.communicationMethods,
        oldIndex,
        newIndex
      ).map((method, index) => ({
        ...method,
        sequence: index + 1,
      }));

      dispatch({
        type: "SET_COMMUNICATION_METHODS",
        payload: updatedMethods,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Communication Methods
        </h1>
        <Button onClick={() => setIsAddingMethod(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Add Method
        </Button>
      </div>

      <Card>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={state.communicationMethods.map((method) => method.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="divide-y divide-gray-200">
              {state.communicationMethods.map((method) => (
                <SortableMethodItem
                  key={method.id}
                  method={method}
                  onDelete={() =>
                    dispatch({
                      type: "DELETE_COMMUNICATION_METHOD",
                      payload: method.id,
                    })
                  }
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Card>

      {/* Add Method Modal */}
      {isAddingMethod && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">
              Add Communication Method
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={newMethod.name}
                  onChange={(e) =>
                    setNewMethod({ ...newMethod, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newMethod.description}
                  onChange={(e) =>
                    setNewMethod({ ...newMethod, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newMethod.isMandatory}
                  onChange={(e) =>
                    setNewMethod({
                      ...newMethod,
                      isMandatory: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Mandatory
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setIsAddingMethod(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddMethod}>Add Method</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// src/components/ui/Tooltip.tsx
"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
}

export function Tooltip({
  children,
  content,
  delayDuration = 200,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root
        delayDuration={delayDuration}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <RadixTooltip.Trigger asChild>
          <div>{children}</div>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="
              z-50 overflow-hidden rounded-md 
              bg-white px-3 py-2 text-sm text-gray-900
              shadow-md border border-gray-200
              animate-in fade-in-0 zoom-in-95
            "
            sideOffset={5}
          >
            {content}
            <RadixTooltip.Arrow className="fill-white" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

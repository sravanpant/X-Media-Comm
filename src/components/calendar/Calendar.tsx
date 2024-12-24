"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { Communication } from "@/lib/mockData";

type CalendarProps = {
  onDateSelect?: (date: Date) => void;
};

export function Calendar({ onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { state } = useApp();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the day names starting from Sunday
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate the starting empty cells for the first week
  const startingDayIndex = monthStart.getDay();
  const emptyDays = Array(startingDayIndex).fill(null);

  const getCommunicationsForDay = (date: Date): Communication[] => {
    return state.communications.filter((comm) =>
      isSameDay(new Date(comm.date), date)
    );
  };

  const getCompanyName = (companyId: string) => {
    return state.companies.find((c) => c.id === companyId)?.name || "";
  };

  const getMethodName = (methodId: string) => {
    return (
      state.communicationMethods.find((m) => m.id === methodId)?.name || ""
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Calendar Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-7 gap-px">
          {weekDays.map((day) => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {/* Empty cells for days before the first of the month */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="bg-white min-h-[120px]" />
        ))}

        {/* Calendar days */}
        {days.map((day) => {
          const communications = getCommunicationsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const dayIsToday = isToday(day);

          return (
            <div
              key={day.toString()}
              className={`bg-white min-h-[120px] p-2 ${
                !isCurrentMonth ? "bg-gray-50" : ""
              } ${dayIsToday ? "border-2 border-indigo-500" : ""}`}
              onClick={() => onDateSelect?.(day)}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm ${
                    !isCurrentMonth ? "text-gray-400" : "text-gray-900"
                  } ${dayIsToday ? "font-bold" : ""}`}
                >
                  {format(day, "d")}
                </span>
                {communications.length > 0 && (
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                    {communications.length}
                  </span>
                )}
              </div>
              <div className="mt-2 space-y-1">
                {communications.map((comm) => (
                  <div
                    key={comm.id}
                    className="text-xs bg-gray-50 p-1 rounded truncate"
                    title={`${getCompanyName(comm.companyId)} - ${getMethodName(
                      comm.methodId
                    )}`}
                  >
                    <span className="font-medium">
                      {getCompanyName(comm.companyId)}
                    </span>
                    <span className="text-gray-500">
                      {" "}
                      - {getMethodName(comm.methodId)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

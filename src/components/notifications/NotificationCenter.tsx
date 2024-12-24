// src/components/notifications/NotificationCenter.tsx
"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Bell, X, Calendar, Clock } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "@/components/ui/Button";

type NotificationType = "overdue" | "due" | "upcoming";

interface Notification {
  id: string;
  type: NotificationType;
  companyId: string;
  companyName: string;
  date: Date;
  daysOverdue?: number;
}

export function NotificationCenter() {
  const { state } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedType, setSelectedType] = useState<NotificationType | "all">(
    "all"
  );

  useEffect(() => {
    const newNotifications: Notification[] = [];

    state.companies.forEach((company) => {
      const lastComm = state.communications
        .filter((c) => c.companyId === company.id)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0];

      const today = new Date();

      if (!lastComm) {
        // Company has no communications
        newNotifications.push({
          id: `overdue-${company.id}`,
          type: "overdue",
          companyId: company.id,
          companyName: company.name,
          date: today,
          daysOverdue: company.communicationPeriodicity,
        });
        return;
      }

      const lastCommDate = new Date(lastComm.date);
      const nextDueDate = new Date(lastCommDate);
      nextDueDate.setDate(
        nextDueDate.getDate() + company.communicationPeriodicity
      );

      const daysUntilDue = differenceInDays(nextDueDate, today);

      if (daysUntilDue < 0) {
        // Overdue
        newNotifications.push({
          id: `overdue-${company.id}`,
          type: "overdue",
          companyId: company.id,
          companyName: company.name,
          date: nextDueDate,
          daysOverdue: Math.abs(daysUntilDue),
        });
      } else if (daysUntilDue === 0) {
        // Due today
        newNotifications.push({
          id: `due-${company.id}`,
          type: "due",
          companyId: company.id,
          companyName: company.name,
          date: nextDueDate,
        });
      } else if (daysUntilDue <= 7) {
        // Upcoming (within next 7 days)
        newNotifications.push({
          id: `upcoming-${company.id}`,
          type: "upcoming",
          companyId: company.id,
          companyName: company.name,
          date: nextDueDate,
        });
      }
    });

    setNotifications(newNotifications);
  }, [state.companies, state.communications]);

  const filteredNotifications =
    selectedType === "all"
      ? notifications
      : notifications.filter((n) => n.type === selectedType);

  const notificationCount = notifications.filter(
    (n) => n.type === "overdue" || n.type === "due"
  ).length;

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button className="relative p-2 text-gray-400 hover:text-gray-500">
          <Bell className="h-6 w-6" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {notificationCount}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-screen max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          sideOffset={5}
          align="end"
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Notifications</h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter Tabs */}
            <div className="mt-4 flex space-x-2">
              {(["all", "overdue", "due", "upcoming"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`
                    px-3 py-1 text-sm rounded-full
                    ${
                      selectedType === type
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 hover:text-gray-700"
                    }
                  `}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  {type !== "all" && (
                    <span className="ml-1 text-xs">
                      ({notifications.filter((n) => n.type === type).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <p className="text-center text-sm text-gray-500 py-4">
                  No notifications
                </p>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      rounded-lg p-3 flex items-start space-x-3
                      ${notification.type === "overdue" ? "bg-red-50" : ""}
                      ${notification.type === "due" ? "bg-yellow-50" : ""}
                      ${notification.type === "upcoming" ? "bg-blue-50" : ""}
                    `}
                  >
                    <div
                      className={`
                      rounded-full p-2
                      ${notification.type === "overdue" ? "bg-red-100" : ""}
                      ${notification.type === "due" ? "bg-yellow-100" : ""}
                      ${notification.type === "upcoming" ? "bg-blue-100" : ""}
                    `}
                    >
                      {notification.type === "overdue" ? (
                        <Clock className="h-4 w-4 text-red-600" />
                      ) : (
                        <Calendar className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.companyName}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {notification.type === "overdue" && (
                          <>Overdue by {notification.daysOverdue} days</>
                        )}
                        {notification.type === "due" && <>Due today</>}
                        {notification.type === "upcoming" && (
                          <>Due {format(notification.date, "MMM d")}</>
                        )}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-shrink-0"
                      onClick={() => {
                        // Handle logging communication
                        setIsOpen(false);
                      }}
                    >
                      Log
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

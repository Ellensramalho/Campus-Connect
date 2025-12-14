"use client";

import { loadNotifications, markNotificationAsReadAPI } from "@/api/notifications";
import { LoadingPage } from "@/components/Loading/LoadingPage";
import { useAuthContext } from "@/contexts/AuthContext";
import { INotification } from "@/types";
import { useEffect, useState } from "react";

export default function Notifications() {
  const { token, markNotificationAsRead } = useAuthContext();

  const [notification, setNotification] = useState<INotification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) return;
    const fetchNotificaions = async () => {
      setLoading(true);
      try {
        const notifications = await loadNotifications(token);
        console.log(notifications);
        setNotification(notifications.notification);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificaions();
  }, [token]);

  if (loading) return <LoadingPage />;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Notificações</h1>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm divide-y">
        {notification.length === 0 && (
          <div className="p-6 text-center text-zinc-500">
            Nenhuma notificação.
          </div>
        )}

        {notification.map((n) => (
          <div
            key={n._id}
            className={`flex items-center gap-4 p-4 cursor-pointer transition
          hover:bg-zinc-50 dark:hover:bg-zinc-800
          ${!n.readAt ? "bg-blue-50/50 dark:bg-blue-900/20" : ""}
        `}
        onClick={() => markNotificationAsRead(token, n._id)}
          >
            {/* Conteúdo */}
            <div className="flex-1">
              <p className="text-sm text-zinc-800 dark:text-zinc-100">
                {n.message}
              </p>

              <span className="text-xs text-zinc-500">
                {new Date(n.createdAt).toLocaleString("pt-BR")}
              </span>
            </div>

            {/* Bolinha de não lida */}
            {!n.readAt && (
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

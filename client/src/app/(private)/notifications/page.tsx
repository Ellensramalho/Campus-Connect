"use client";

import { loadNotifications } from "@/api/notifications";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function Notifications() {

    const { token } = useAuthContext();

    useEffect(() => {
        const fetchNotificaions = async () => {
            const notifications = await loadNotifications(token)
            console.log(notifications);
        }

        fetchNotificaions();

    }, [])

    return (
        <div>
            <h1>Notificações</h1>
        </div>
    )
}
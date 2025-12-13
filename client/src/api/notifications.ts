import axiosInstace from "./axiosInstance";

export const loadNotifications = async (token: string) => {
    const res = await axiosInstace.get("/api/notifications", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}
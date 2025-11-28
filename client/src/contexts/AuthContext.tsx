"use client";

import React, { useContext, createContext, useState, useEffect } from "react";
import { login, register, profile, forgoutPass } from "@/api/auth";
import { IUser } from "@/types";
import { toast } from "sonner";

interface IAuthContextProps {
    loginFunc: (email: string, password: string) => Promise<void>
    registerFunc: (data: any) => Promise<any>
    loading: boolean
    token: string
    loadProfile: () => Promise<void>
    user: IUser | null
    forgout_pass: (email: string) => Promise<any>
    logout: () => void

}

export const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
    }, []);

    useEffect(() => {
        if (token) {
            loadProfile();
        }
    }, [token]);

    // Login
    const loginFunc = async (email: string, password: string) => {
        try {
            setLoading(true);
            const res = await login(email, password)

            localStorage.setItem("token", res.token);
            console.log(res.token);
            setToken(res.token);

        }
        catch (err: any) {
            console.log(err);
            toast.warning(err.response.data.error)
        }
        finally {
            setLoading(false);
        }
    }

    // Registro
    const registerFunc = async (data: any) => {
        try {
            setLoading(true);
            const res = await register(data);
            toast.success(res.message);
        }
        catch (err: any) {
            toast.warning(err.response.data.error)
        }
        finally {
            setLoading(false);
        }
    }

    // Perfil
    const loadProfile = async () => {


        try {
            const res = await profile(token);
            setUser(res);
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    // Solicitar redefinição de senha
    const forgout_pass = async (email: string) => {
        setLoading(true);
        try {
            const res = await forgoutPass(email);
            toast.success(res.message)
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
    }

    const contextValues: IAuthContextProps = {
        loginFunc,
        loading,
        registerFunc,
        token,
        loadProfile,
        user,
        forgout_pass,
        logout
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("use o authContext dentro de um AuthProvider");
    }
    return context;
};


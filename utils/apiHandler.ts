import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export const useApiHandler = async (url: string, options = {}, dependencies = []) => {
    const session = await supabase.auth.getSession();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL + url}`, {
                    headers: {
                        Authorization: "Bearer " + session.data.session?.access_token,
                    },
                    ...options
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                if (isMounted) {
                    setData(result);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url, ...dependencies]);

    return { data, loading, error };
};

export const apiHandler = async (url: string, options = {}) => {
    try {
        const session = await supabase.auth.getSession();

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL + url}`, {
            headers: {
                Authorization: "Bearer " + session.data.session?.access_token,
                "Content-Type": "application/json",
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
};


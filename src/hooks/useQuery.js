import { useEffect, useState } from "react";
import { baseUrl } from "../Config";
import axios from "axios";

export const useAuthQuery = (path) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let ignore = false
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${baseUrl}/${path}`)
                if (!ignore) {
                    setData(res.data)
                }
                setError(null);
            } catch (error) {
                console.log(error);
                setError(error.message)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        return () => {
            ignore = true
        }
    }, [path])

    return {
        data,
        loading,
        error
    }
}
import { useState } from 'react';

export function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // versión CRA
  //const API = process.env.REACT_APP_API_URL;
  // versión VITE
  const API = import.meta.env.VITE_API_URL;

  const fetchData = async (endpoint, options = {}, withToken = true) => {
    setLoading(true);
    setError(null);

    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...options.headers,
    };

    if (withToken) {
      const token = localStorage.getItem("token");
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error };
}
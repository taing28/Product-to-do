import { useEffect, useState } from "react";

export default function useFetchApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      console.log('result in fetch:', result);
      setData(result);
    } catch (err) {
      console.log('Error', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log('fetched');
  }, [url]);

  return { data, setData, error, loading };
}
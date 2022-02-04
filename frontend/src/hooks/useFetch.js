import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    setState((state) => ({ data: state.data, loading: true }));
    fetch(url)
      .then((x) => x.json())
      .then((y) => {
        setState({ data: y, loading: false });
      });
  }, [url, setState]);

  return state;
};

export const useFetchWithJWT = (url, jwt) => {
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    setState((state) => ({ data: state.data, loading: true }));

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
      .then((x) => x.json())
      .then((y) => {
        setState({ data: y, loading: false });
      })
      .catch((e) => console.log("useFetchWithJWT error:", e));
  }, [url, jwt, setState]);

  return state;
};

export const useFetchWithData = (url, data) => {
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    setState((state) => ({ data: state.data, loading: true }));
    fetch(url, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((x) => x.json())
      .then((y) => {
        setState({ data: y, loading: false });
      });
  }, [url, setState]);

  return state;
};

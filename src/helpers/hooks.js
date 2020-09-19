import { useState, useEffect } from 'react';

export const SERVICE_INIT = 'SERVICE_INIT';
export const SERVICE_LOADING = 'SERVICE_LOADING';
export const SERVICE_LOADED = 'SERVICE_LOADED';
export const SERVICE_ERROR = 'SERVICE_ERROR'

const useServiceHook = (apiServiceRoute, data, deps) => {
  const [result, setResult] = useState({ status: SERVICE_LOADING });

  useEffect(() => {
    apiServiceRoute(data)
      .then(response => {
        setResult({ status: SERVICE_LOADED, payload: response });
      })
      .catch(error => {
        setResult({ status: SERVICE_ERROR, error });
      });
  }, deps);
  return result;
}

export default useServiceHook;

import { useCallback, useState } from "react"

export const useFetching = (callback, deps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = useCallback(async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch(e) {
            setError(e.message);
        } finally {
            setIsLoading(false)
        }
    }, deps);

    return [fetching, isLoading, error]
}
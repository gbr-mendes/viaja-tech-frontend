import { useEffect, useState } from "react"

export function useFetch(url, token) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(url, token ? { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } } : null)
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resourse')
                }
                return res.json()
            })
            .then(data => {
                setLoading(false)
                setData(data)
                setError(null)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
                setData(null)
            })
    }, [url, token])

    return { data, loading, error }
}

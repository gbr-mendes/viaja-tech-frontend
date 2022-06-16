import React, { useEffect, useState } from "react";
import { Table } from "../components/Table/Table";

export function Clients() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('https://62a6186c430ba53411d10fd7.mockapi.io/clients')
            .then(resp => resp.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })
    }, [])
    return (
        <>
            <h1>Clients page</h1>
            {loading ? 'Carregando...' :
                < Table
                    fields={['name', 'email', 'spending', 'lastPurchase']}
                    rowsData={data} />}
        </>
    )
}
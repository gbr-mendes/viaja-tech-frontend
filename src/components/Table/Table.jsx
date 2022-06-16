import './Table.css'

export function Table({ fields, rowsData }) {
    return (
        <table className="general-table">
            <thead>
                {fields.map((field, i) => <th key={i + 1}>{field}</th>)}
            </thead>
            <tbody>
                {rowsData.map(row => {
                    return (<tr key={row.id}>
                        {Object.keys(row).map((key) => {
                            return fields.includes(key) && <td>{row[key]}</td>

                        })}
                    </tr>)
                })}
            </tbody>
        </table>
    )
}
import './Table.css'

export function Table({ fields, rowsData }) {
    return (
        <table className="general-table">
            <thead>
                <tr>
                    {fields.map((field, i) => <th key={i + 1} className="table-header">{field}</th>)}
                </tr>
            </thead>
            <tbody>
                {rowsData.map(row => {
                    return (<tr className="table-row" key={row.id}>
                        {Object.keys(row).map((key) => {
                            return fields.includes(key) && <td key={row[key]}>{row[key]}</td>

                        })}
                    </tr>)
                })}
            </tbody>
        </table>
    )
}
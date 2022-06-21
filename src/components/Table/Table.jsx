import { v4 as uuidv4 } from 'uuid';
import './Table.css'

export function Table({ fields, rowsData }) {
    return (
        <table className="general-table">
            <thead>
                <tr>
                    {fields.map((field, i) => <th key={uuidv4()} className="table-header">{field}</th>)}
                </tr>
            </thead>
            <tbody>
                {rowsData.map(row => {
                    return (<tr className="table-row" key={uuidv4()}>
                        {Object.keys(row).map((key) => {
                            return fields.includes(key) && (
                                row[key] === "" ? <td key={uuidv4()}><p>------</p></td> : <td key={uuidv4()}>{row[key]}</td>
                            )
                        })}
                    </tr>)
                })}
            </tbody>
        </table>
    )
}
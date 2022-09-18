import { v4 as uuidv4 } from "uuid";
import "./Table.css";

export function Table({ fields, rowsData, setIdMethod, thByFieldObject }) {
  return (
    <div className="d-flex justify-content-lg-center p-5">
      <table className="general-table">
        <thead>
          <tr>
            {fields.map((field, i) => (
              <th key={uuidv4()} className="table-header">
                {thByFieldObject[field]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsData.map((row) => {
            return (
              <tr
                className="table-row"
                key={uuidv4()}
                onClick={(e) => setIdMethod(row._id)}
              >
                {Object.keys(row).map((key) => {
                  return (
                    fields.includes(key) &&
                    (row[key] === "" ? (
                      <td key={uuidv4()}>
                        <p>------</p>
                      </td>
                    ) : (
                      <td key={uuidv4()}>{row[key]}</td>
                    ))
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

"use client";
import styles from "./HBox.module.css"

export default function HBox({title, value, color1, color2}) {
    
  return (
      <table className={styles.HBox}>
        <tbody>
          <tr>
            <td style={{backgroundColor: color1}}>{title}</td>
            <td style={{backgroundColor: color2, fontSize: "13px"}}>{value.map((g, i) => (
              <span key={g.match}>
                {i > 0 && " | "}
                <strong>Match {g.match}:</strong> {g.names.join(", ")}
              </span>
            ))}</td>
          </tr>
        </tbody>
      </table>
    )
  }
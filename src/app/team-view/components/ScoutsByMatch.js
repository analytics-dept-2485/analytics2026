"use client";
import styles from "./ScoutsByMatch.module.css";

export default function ScoutsByMatch({ title, groups, color1, color2 }) {
  if (!groups || groups.length === 0) {
    return (
      <table className={styles.table}>
        <tbody>
          <tr>
            <td style={{ backgroundColor: color1 }}>{title}</td>
            <td style={{ backgroundColor: color2, fontSize: "13px" }}>—</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td style={{ backgroundColor: color1 }}>{title}</td>
          <td style={{ backgroundColor: color2 }} className={styles.valueCell}>
            {groups.map((g) => (
              <div key={g.match} className={styles.matchLine}>
                <strong>Match {g.match}:</strong> {g.names.join(", ")}
              </div>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

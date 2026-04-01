"use client";
import styles from "./Comments.module.css"

export default function Comments({ title, value, color1, color2 }) {
  const text = Array.isArray(value) ? value.join("\n\n") : value ?? "";

  return (
    <div className={styles.commentsBox}>
      <table style={{ width: "350px" }}>
        <tbody>
          <tr style={{ backgroundColor: color1 }}>
            <td>{title}</td>
          </tr>
          <tr style={{ backgroundColor: color2 }}>
            <td className={styles.commentBody}>{text}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


      
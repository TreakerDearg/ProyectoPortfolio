"use client";
import styles from "../styles/views/MissionHistory.module.css";

const ACTIVITY_LOG = [
  { id: "M-089", event: "KERNEL_UPDATE", target: "PORTFOLIO-OS", status: "SUCCESS", date: "2026.03.10" },
  { id: "M-088", event: "DB_SYNC", target: "KIOSCO_ALPASO", status: "STABLE", date: "2026.03.05" },
  { id: "M-087", event: "UI_OVERHAUL", target: "AMBER_INTERFACE", status: "DEPLOYED", date: "2026.02.28" },
];

export default function MissionHistoryView() {
  return (
    <div className={styles.historyContainer}>
      <header className={styles.header}>
        <h2 className={styles.title}>{">"} MISSION_DEPLOYMENT_REPORTS</h2>
        <div className={styles.line} />
      </header>

      <table className={styles.historyTable}>
        <thead>
          <tr>
            <th>ID_CODE</th>
            <th>OPERATION</th>
            <th>TARGET_NODE</th>
            <th>TIMESTAMP</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {ACTIVITY_LOG.map((log) => (
            <tr key={log.id} className={styles.row}>
              <td className={styles.id}>{log.id}</td>
              <td className={styles.event}>{log.event}</td>
              <td className={styles.target}>{log.target}</td>
              <td className={styles.date}>{log.date}</td>
              <td className={log.status === "SUCCESS" ? styles.statusOk : styles.statusWait}>
                [{log.status}]
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// src/app/bartender/pages/logss/layout.jsx
import SomaClientWrapper from "./components/SomaClientWrapper";
import styles from "../../styles/logs-styles/soma-layout.module.css";

export const metadata = {
  title: "SOMA System",
  description: "SOMA Interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <SomaClientWrapper>
          {children}
        </SomaClientWrapper>
      </body>
    </html>
  );
}
// components/app-web/SettingsIcon.jsx
import { Settings } from 'lucide-react';
import styles from '../../styles/HomeStyles/home.module.css';

export default function SettingsIcon() {
  return (
    <div className={styles.win95Icon}>
      <Settings size={32} />
    </div>
  );
}
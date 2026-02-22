import BackToHome from '../../components/salida/BackToHome';
import styles from '../../styles/pages/armored.module.css';

export default function RootPage() {
  return (
    <div className={styles.acContainer}>
      <div className="max-w-6xl mx-auto p-8">
        <BackToHome variant="ac" />
        
        <div className={styles.hudFrame + " bg-black/40 p-12 border-l-4 border-l-[#ff3c00]"}>
          <div className="flex justify-between items-start mb-12">
            <h1 className="text-7xl font-black italic tracking-tighter">RAVEN_SYSTEMS</h1>
            <div className="text-right font-mono text-red-500">
              <p>AC: LOADED</p>
              <p>STABILITY: 100%</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="border border-red-900/20 p-4 bg-red-950/10">
                <span className="text-[9px] text-red-800">MODULE_0{i}</span>
                <div className="h-1 w-full bg-red-600 mt-2 shadow-[0_0_10px_#ff3c00]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import BackToHome from '../../components/salida/BackToHome';
import styles from '../../styles/pages/soma.module.css';

export default function LogsPage() {
  return (
    <div className={styles.somaContainer + " min-h-screen p-8"}>
      <div className="max-w-4xl mx-auto">
        <BackToHome variant="soma" />
        
        <div className="flex gap-8 items-center mb-16">
          <div className={styles.wauCircuit + " w-24 h-24 animate-pulse flex items-center justify-center"}>
            <div className="w-12 h-12 bg-cyan-500 rounded-full blur-xl" />
          </div>
          <h1 className="text-4xl font-light tracking-[0.4em] text-cyan-400">MEMORY_BUFFER</h1>
        </div>

        <div className="space-y-2">
          {['Catherine_Chun', 'Simon_Jarrett', 'Terry_Akers'].map(name => (
            <div key={name} className="p-4 border border-cyan-900/30 bg-cyan-950/10 flex justify-between group cursor-pointer hover:border-cyan-400 transition-all">
              <span className="text-cyan-100/60 font-mono">FILE: {name.toUpperCase()}.bin</span>
              <span className="text-cyan-500 opacity-0 group-hover:opacity-100 tracking-tighter">RECOVERING...</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
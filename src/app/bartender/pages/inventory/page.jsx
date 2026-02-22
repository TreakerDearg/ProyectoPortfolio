import BackToHome from '../../components/salida/BackToHome';
import styles from '../../styles/pages/metro.module.css';

export default function InventoryPage() {
  return (
    <div className={styles.metroContainer + " min-h-screen p-8"}>
      <div className="max-w-6xl mx-auto">
        <BackToHome variant="metro" />
        
        <div className={styles.rustPanel + " p-8 mb-8"}>
          <div className="flex justify-between items-center border-b border-amber-900/30 pb-4 mb-8">
            <h1 className="text-5xl font-black text-white italic">STOCK_D6</h1>
            <div className="bg-amber-500 text-black px-4 py-1 font-bold text-xs uppercase">Sector: Exhibition</div>
          </div>
          
          <p className={styles.handwritten + " text-lg italic opacity-80"}>
            "No hay mucho, pero es suficiente para llegar a Polis..."
          </p>
        </div>
        
        {/* Aquí iría el mapeo de INVENTORY_DATA con AtomicStructure */}
      </div>
    </div>
  );
}
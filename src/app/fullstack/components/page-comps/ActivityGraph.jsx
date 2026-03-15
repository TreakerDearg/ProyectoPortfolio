"use client";
import React, { useState, useEffect } from "react";
import { Wifi, ArrowUp, ArrowDown } from "lucide-react";
import { netMessages, generateTrafficData } from "../../data/Messages";
import styles from "../../styles/page-comp-styles/ActivityGraph.module.css";

export const ActivityGraph = () => {
  const [trafficData, setTrafficData] = useState(generateTrafficData());
  const [messageQueue, setMessageQueue] = useState([]);
  const [nextMessageIndex, setNextMessageIndex] = useState(0);

  // Inicializar la cola con los primeros 5 mensajes
  useEffect(() => {
    const initialMessages = netMessages.slice(0, 5);
    setMessageQueue(initialMessages);
    setNextMessageIndex(5);
  }, []);

  // Cada 6 segundos, agregar un nuevo mensaje y quitar el más antiguo
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageQueue(prevQueue => {
        const newMessage = netMessages[nextMessageIndex % netMessages.length];
        setNextMessageIndex(prev => (prev + 1) % netMessages.length);
        return [...prevQueue.slice(1), newMessage];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [nextMessageIndex]);

  // Actualizar datos de tráfico cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(generateTrafficData());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getBarColor = (val) => {
    if (val >= 8) return styles.barCritical;
    if (val >= 6) return styles.barHigh;
    if (val >= 4) return styles.barMedium;
    return styles.barLow;
  };

  const latestMessage = messageQueue[messageQueue.length - 1];

  return (
    <div className={styles.graphContainer}>
      <div className={styles.graphHeader}>
        <Wifi size={8} />
        <span>NETWORK ACTIVITY</span>
      </div>

      {/* Gráfico de barras */}
      <div className={styles.graphBars}>
        {trafficData.map((val, i) => (
          <div
            key={i}
            className={`${styles.graphBar} ${getBarColor(val)}`}
            style={{ height: `${val * 4}px` }}
          />
        ))}
      </div>

      {/* Bus de datos con el último mensaje en desplazamiento */}
      <div className={styles.dataBus}>
        <div className={styles.dataBusContent}>
          {latestMessage && (
            <span className={`${styles.dataBusMessage} ${latestMessage.type === "TX" ? styles.tx : styles.rx}`}>
              {latestMessage.type === "TX" ? "↑" : "↓"} {latestMessage.type}:{latestMessage.port} — {latestMessage.message}
            </span>
          )}
        </div>
      </div>

      {/* Lista de paquetes recientes (toda la cola) */}
      <div className={styles.packetList}>
        <div className={styles.packetListHeader}>ÚLTIMOS PAQUETES</div>
        <div className={styles.packetListItems}>
          {messageQueue.map((msg, i) => (
            <div key={i} className={styles.packetListItem}>
              <span className={msg.type === "TX" ? styles.tx : styles.rx}>
                {msg.type === "TX" ? <ArrowUp size={6} /> : <ArrowDown size={6} />}
              </span>
              <span className={styles.packetPort}>{msg.port}</span>
              <span className={styles.packetMsg}>{msg.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Lock, ChevronRight, HardDrive, 
  FolderOpen, Terminal, Search,
  Unlock, Database, Menu, X
} from 'lucide-react';
// Importamos el nuevo CSS exclusivo
import archiveStyles from '../../../styles/logs-styles/SomaArchives.module.css';

export const SomaArchives = ({ apps, openApps, onToggleApp, onOpenBriefcase }) => {
  const [internalSearch, setInternalSearch] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  const archiveFiles = apps.filter(app => 
    app.title.toLowerCase().includes(internalSearch.toLowerCase()) ||
    app.tag.toLowerCase().includes(internalSearch.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={archiveStyles.archivesContainer}
    >
      {/* TOOLBAR SUPERIOR */}
      <div className={archiveStyles.archivesHeader}>
        <div className={archiveStyles.archivesTitle}>
          <button 
            className={archiveStyles.mobileMenuBtn}
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <X size={14} /> : <Menu size={14} />}
          </button>
          <Terminal size={14} className={archiveStyles.desktopOnlyIcon} />
          <span className={archiveStyles.headerText}>FILE_EXPLORER.EXE</span>
        </div>
        
        <div className={archiveStyles.archiveSearchBox}>
          <Search size={12} />
          <input 
            type="text" 
            placeholder="Search dat-nodes..." 
            value={internalSearch}
            onChange={(e) => setInternalSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className={archiveStyles.archivesExplorer}>
        {/* SIDEBAR - Overlay en móvil, Fijo en Desktop */}
        <aside className={`${archiveStyles.explorerTree} ${showSidebar ? archiveStyles.treeVisible : ''}`}>
          <div className={archiveStyles.treeLabel}>FileSystem_Root</div>
          <div className={archiveStyles.treeItem}>
            <ChevronRight size={10} />
            <HardDrive size={12}/> <span>STATION_C:</span>
          </div>
          <div className={`${archiveStyles.treeItem} ${archiveStyles.treeItemActive}`}>
            <ChevronRight size={10} style={{transform: 'rotate(90deg)'}} />
            <FolderOpen size={12}/> <span>SHARED_DATA</span>
          </div>
          
          <div className={archiveStyles.systemInfoBox}>
            <div className={archiveStyles.storageLabel}>SECTOR_DENSITY:</div>
            <div className={archiveStyles.storageBar}>
              <div className={archiveStyles.storageFill} style={{ width: '88%' }} />
            </div>
            <div className={archiveStyles.storageMeta}>88% BUFFERED</div>
          </div>
        </aside>

        {/* LISTA DE ARCHIVOS */}
        <div className={archiveStyles.explorerList}>
          <table className={archiveStyles.archivesTable}>
            <thead>
              <tr>
                <th>IDENTIFIER</th>
                <th className={archiveStyles.desktopOnly}>ORIGIN</th>
                <th className={archiveStyles.desktopOnly}>INTEGRITY</th>
                <th>PROTOCOL</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {archiveFiles.map((app) => (
                  <motion.tr 
                    layout
                    key={app.id} 
                    className={openApps.includes(app.id) ? archiveStyles.rowActive : ''}
                    onDoubleClick={() => onToggleApp(app.id)}
                  >
                    <td>
                      <div className={archiveStyles.fileNameCell}>
                        <div className={app.corruption > 0.6 ? archiveStyles.iconCorrupt : archiveStyles.iconNormal}>
                          {app.security_clearance.includes('4') ? <Lock size={14}/> : <FileText size={14}/>}
                        </div>
                        <div className={archiveStyles.fileInfo}>
                          <span className={archiveStyles.fileTitle}>{app.title}.dat</span>
                          <span className={archiveStyles.fileTag}>{app.tag}</span>
                        </div>
                      </div>
                    </td>
                    <td className={archiveStyles.desktopOnly}>
                      <span className={archiveStyles.originTag}>{app.node}</span>
                    </td>
                    <td className={archiveStyles.desktopOnly}>
                      <div className={archiveStyles.integrityCell}>
                        <span className={app.corruption > 0.6 ? archiveStyles.textDanger : archiveStyles.textSuccess}>
                          {Math.floor((1 - app.corruption) * 100)}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className={archiveStyles.actionCell}>
                        <button 
                          onClick={() => onOpenBriefcase(app)} 
                          className={archiveStyles.explorerBtn}
                        >
                          <Unlock size={10} /> 
                          <span className={archiveStyles.btnText}>DECRYPT</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className={archiveStyles.archivesFooter}>
        <span className={archiveStyles.pathLabel}>PATHOS_II://UPSILON/EXTRACTS/</span>
        <Database size={12} style={{opacity: 0.4}} />
      </div>
    </motion.div>
  ); 
};
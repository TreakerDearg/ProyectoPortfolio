"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  HardDrive,
  Shield,
  MapPin,
  StickyNote,
  Lock,
  Key,
  Droplet,
  DollarSign,
  Skull,
  BookOpen,
  CookingPot,
  GlassWater,
  Flame,
  Info,
  FileText,
  BadgeDollarSign,
} from "lucide-react";
import styles from "../../../styles/inventory-styles/briefcase-modal.module.css";
import { REAL_RECIPES } from "../data/RecipesReal";

export default function BriefcaseModal({ item, onClose }) {
  // Determine if this is a drink (has desc and id in recipes)
  const isDrink = item.desc && REAL_RECIPES[item.id];
  const recipe = isDrink ? REAL_RECIPES[item.id] : null;

  // Common metadata (for both drinks and folders)
  const metadata = [];

  if (item.dateArchived) {
    metadata.push({ icon: Calendar, label: item.dateArchived });
  }
  if (item.fileSize) {
    metadata.push({ icon: HardDrive, label: item.fileSize });
  }
  if (item.securityLevel) {
    metadata.push({ icon: Shield, label: item.securityLevel });
  }
  if (item.sector) {
    metadata.push({ icon: MapPin, label: item.sector });
  }
  if (item.price !== undefined) {
    metadata.push({ icon: DollarSign, label: `${item.price} ₽` });
  }
  if (item.alcohol) {
    metadata.push({ icon: Droplet, label: item.alcohol });
  }
  if (item.toxicity !== undefined) {
    metadata.push({ icon: Skull, label: `${item.toxicity}` });
  }
  if (item.flavor) {
    metadata.push({ icon: Info, label: item.flavor });
  }

  // Check for a hint (drinks sometimes have metadata.hint)
  const hint = item.metadata?.hint;
  const hasHint = hint && hint !== "_";

  // Folder-specific
  const stickyNote = item.stickyNote;
  const isLocked = item.isLocked;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.25, type: "spring", stiffness: 300 }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Paper layers (back, mid, front) */}
        <div className={`${styles.paper} ${styles.paperBack}`} />
        <div className={`${styles.paper} ${styles.paperMid}`} />
        <div className={`${styles.paper} ${styles.paperFront}`}>
          {/* Paper clip */}
          <div className={styles.clip} />

          {/* Header */}
          <div className={styles.header}>
            <span className={styles.title}>
              {item.name?.replaceAll("_", " ") || item.title?.replaceAll("_", " ")}
            </span>
            <span className={styles.id}>{item.id}</span>
          </div>

          {/* Description / Sticky note area */}
          {item.desc && (
            <p className={styles.desc}>{item.desc}</p>
          )}

          {/* Sticky note for folders */}
          {stickyNote && (
            <div className={styles.stickyNoteWrapper}>
              <div className={styles.stickyNote}>
                <StickyNote size={16} className={styles.stickyIcon} />
                <div className={styles.stickyText}>{stickyNote}</div>
              </div>
            </div>
          )}

          {/* Recipe card (if drink) */}
          {recipe && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={styles.recipeCard}
            >
              <div className={styles.recipeHeader}>
                <CookingPot size={18} />
                <span>{recipe.name}</span>
              </div>
              <div className={styles.recipeMethod}>
                <Flame size={14} />
                <span>{recipe.method}</span>
              </div>
              <div className={styles.recipeIngredients}>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </div>
              <div className={styles.recipeInstructions}>
                <strong>Instructions:</strong> {recipe.instructions}
              </div>
              <div className={styles.recipeGlass}>
                <GlassWater size={14} />
                <span>Serve in: {recipe.glass}</span>
              </div>
            </motion.div>
          )}

          {/* Hint (for drinks) */}
          {hasHint && (
            <div className={styles.hintWrapper}>
              <Key size={14} className={styles.hintIcon} />
              <span className={styles.hintText}>HINT: {hint}</span>
            </div>
          )}

          {/* Metadata grid */}
          {metadata.length > 0 && (
            <div className={styles.metadataGrid}>
              {metadata.map((meta, idx) => (
                <div key={idx} className={styles.metadataItem}>
                  <meta.icon size={12} />
                  <span>{meta.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Footer with stamp and close button */}
          <div className={styles.footer}>
            <span className={styles.stamp}>
              {item.tag || item.securityLevel || "UNCLASSIFIED"}
            </span>
            <button className={styles.close} onClick={onClose}>
              CLOSE
            </button>
          </div>

          {/* Lock indicator for folders */}
          {isLocked && (
            <div className={styles.lockBadge}>
              <Lock size={16} />
              <span>CLASSIFIED</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  Star,
  Syringe,
  Eye,
  AlertTriangle,
  FileText,
  Lock,
  Heart,
  Skull,
  Zap,
  BadgeDollarSign,
  Calendar,
  HardDrive,
  Shield,
  MapPin,
  StickyNote,
  Info,
  Droplet,
  DollarSign,
  Key,
} from "lucide-react";
import { cva } from "class-variance-authority";
import styles from "../../../styles/inventory-styles/briefcase-item.module.css";
import BriefcaseModal from "./BriefcaseModal";

// --------------------------------------------------------------
// Helper: get icon for tag / security level
// --------------------------------------------------------------
const getIcon = (tag, securityLevel) => {
  const key = tag || securityLevel;
  switch (key) {
    case "PREMIUM":   return <Star size={18} />;
    case "MEDIC":     return <Syringe size={18} />;
    case "SECRET":    return <Eye size={18} />;
    case "SCRAP":     return <AlertTriangle size={18} />;
    case "STALKER":   return <Skull size={18} />;
    case "RESTRICTED":return <Lock size={18} />;
    case "CLASSIFIED":return <Shield size={18} />;
    default:          return <Folder size={18} />;
  }
};

const getDetailIcon = (tag, securityLevel) => {
  const key = tag || securityLevel;
  switch (key) {
    case "PREMIUM":   return <BadgeDollarSign size={14} />;
    case "MEDIC":     return <Heart size={14} />;
    case "SECRET":    return <Lock size={14} />;
    case "SCRAP":     return <Zap size={14} />;
    case "STALKER":   return <Skull size={14} />;
    default:          return <FileText size={14} />;
  }
};

// Map security level to a tag-like variant for styling
const getVariantFromSecurity = (securityLevel) => {
  const map = {
    "UNRESTRICTED": "COMMON",
    "COMMON": "COMMON",
    "HAZMAT": "SCRAP",
    "TRADE": "COMMON",
    "RESTRICTED": "SECRET",
    "ELITE": "PREMIUM",
    "STALKER": "SCRAP",
    "TOP_SECRET": "SECRET",
    "CLASSIFIED": "SECRET",
    "OVERSEER": "PREMIUM",
    "CHIEF_ENG": "PREMIUM",
    "TECHNICAL": "COMMON",
    "GENERAL": "PREMIUM",
    "COSMIC": "SECRET",
  };
  return map[securityLevel] || "COMMON";
};

// Determine sticky note color based on tag or security level
const getStickyColor = (tag, securityLevel) => {
  const key = tag || securityLevel;
  switch (key) {
    case "PREMIUM":
    case "ELITE":
    case "GENERAL":
      return "gold";
    case "MEDIC":
      return "green";
    case "SECRET":
    case "TOP_SECRET":
    case "CLASSIFIED":
    case "COSMIC":
      return "red";
    case "SCRAP":
    case "HAZMAT":
    case "STALKER":
      return "brown";
    default:
      return "yellow";
  }
};

// --------------------------------------------------------------
// Variants with cva (tag + condition)
// --------------------------------------------------------------
const cardVariants = cva(styles.card, {
  variants: {
    tag: {
      PREMIUM: styles.premium,
      MEDIC:   styles.medic,
      SECRET:  styles.secret,
      SCRAP:   styles.scrap,
      COMMON:  styles.common,
    },
    condition: {
      pristine: styles.conditionPristine,
      worn:     styles.conditionWorn,
      damaged:  styles.conditionDamaged,
    },
  },
  defaultVariants: {
    tag: "COMMON",
    condition: "pristine",
  },
});

// --------------------------------------------------------------
// Main Component
// --------------------------------------------------------------
export default function BriefcaseItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  // Determine tag for styling (drinks have .tag, folders have .securityLevel)
  let tag = item.tag;
  if (!tag && item.securityLevel) {
    tag = getVariantFromSecurity(item.securityLevel);
  }
  tag = tag || "COMMON";

  const condition = item.condition || "pristine";
  const Icon = getIcon(item.tag, item.securityLevel);
  const DetailIcon = getDetailIcon(item.tag, item.securityLevel);
  const stickyColor = getStickyColor(item.tag, item.securityLevel);

  // Extract metadata
  const name = item.name || item.title || "Unknown";
  const id = item.id || "N/A";
  const stickyNote = item.stickyNote || "";
  const dateArchived = item.dateArchived || "";
  const fileSize = item.fileSize || "";
  const securityLevel = item.securityLevel || "";
  const sector = item.sector || "";
  const price = item.price;
  const alcohol = item.alcohol;
  const toxicity = item.toxicity;
  const flavor = item.flavor;
  const hint = item.metadata?.hint;

  // Animation on hover (damaged shake)
  const hoverAnimation = condition === "damaged"
    ? { scale: 1.01, x: [-1, 1, -1, 0], transition: { duration: 0.2, repeat: 1 } }
    : { scale: 1.02, y: -4 };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03, type: "spring", stiffness: 300 }}
        whileHover={hoverAnimation}
        whileTap={{ scale: 0.98 }}
        className={cardVariants({ tag, condition })}
        onClick={() => setOpen(true)}
      >
        {/* Folded corner */}
        <div className={`${styles.corner} ${styles[`corner_${condition}`]}`} />

        {/* Main tab */}
        <div className={styles.tab}>
          <span className={styles.tabIcon}>{Icon}</span>
          <span className={styles.tabText}>{item.tag || securityLevel || "DATA"}</span>
        </div>

        <div className={styles.inner}>
          {/* ID with condition stamp */}
          <div className={styles.idWrapper}>
            <span className={styles.itemId}>{id}</span>
            <span className={`${styles.idStamp} ${styles[`idStamp_${condition}`]}`}>
              {condition === "damaged" ? "DAMAGED" : condition === "worn" ? "WORn" : "DOC"}
            </span>
          </div>

          {/* Name with paper clip */}
          <div className={styles.nameWrapper}>
            <span className={styles.paperClip}>📎</span>
            <span className={styles.itemName}>{name.replaceAll("_", " ")}</span>
          </div>

          {/* Metadata row with icons */}
          <div className={styles.metadataGrid}>
            {dateArchived && (
              <span className={styles.metaItem}>
                <Calendar size={12} />
                {dateArchived}
              </span>
            )}
            {fileSize && (
              <span className={styles.metaItem}>
                <HardDrive size={12} />
                {fileSize}
              </span>
            )}
            {securityLevel && (
              <span className={styles.metaItem}>
                <Shield size={12} />
                {securityLevel}
              </span>
            )}
            {sector && (
              <span className={styles.metaItem}>
                <MapPin size={12} />
                {sector}
              </span>
            )}
            {price !== undefined && (
              <span className={styles.metaItem}>
                <DollarSign size={12} />
                {price}
              </span>
            )}
            {alcohol && (
              <span className={styles.metaItem}>
                <Droplet size={12} />
                {alcohol}
              </span>
            )}
            {toxicity !== undefined && (
              <span className={styles.metaItem}>
                <Skull size={12} />
                {toxicity}
              </span>
            )}
            {flavor && (
              <span className={styles.metaItem}>
                <Info size={12} />
                {flavor.substring(0, 15)}
                {flavor.length > 15 ? "…" : ""}
              </span>
            )}
          </div>

          {/* Hint chip */}
          {hint && hint !== "_" && (
            <div className={styles.hintChip}>
              <Key size={12} />
              <span>HINT: {hint}</span>
            </div>
          )}

          {/* Sticky note button */}
          {stickyNote && (
            <div
              className={styles.stickyNoteButton}
              onMouseEnter={() => setShowSticky(true)}
              onMouseLeave={() => setShowSticky(false)}
            >
              <motion.div
                animate={{ rotate: showSticky ? [0, -5, 5, 0] : 0 }}
                transition={{ duration: 0.2 }}
              >
                <StickyNote size={18} />
              </motion.div>
              <AnimatePresence>
                {showSticky && (
                  <motion.div
                    className={`${styles.stickyNotePopup} ${styles[`stickyNotePopup_${stickyColor}`]}`}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className={styles.stickyNoteContent}>
                      {stickyNote}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Condition decals */}
          {condition === "damaged" && (
            <>
              <div className={styles.bulletHole} />
              <div className={styles.rustStain} />
              <div className={styles.tapeMark} />
              <div className={styles.burntEdge} />
            </>
          )}
          {condition === "worn" && (
            <>
              <div className={styles.crease} />
              <div className={styles.smudge} />
            </>
          )}

          {/* Secret stamp for secret items */}
          {(tag === "SECRET" || securityLevel === "TOP_SECRET" || securityLevel === "COSMIC") && (
            <div className={styles.secretStamp}>CONFIDENTIAL</div>
          )}
        </div>
      </motion.div>

      {open && <BriefcaseModal item={item} onClose={() => setOpen(false)} />}
    </>
  );
}
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: [0.9, 1.15, 0.95] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
          className="w-3 h-3 rounded-full bg-neutral-700"
        />
        <div className="text-neutral-600">Loading…</div>
      </div>
    </motion.div>
  );
}

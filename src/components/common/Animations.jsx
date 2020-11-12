import React from 'react';
// Animations
import { motion } from 'framer-motion';

export const AnimateScaleClick = ({ children }) => (
  <motion.div style={{ cursor: 'pointer' }} whileTap={{ scale: 0.8 }}>
    {children}
  </motion.div>
);

export const AnimateOpacityHover = ({ initialOpacity = 0.75, children }) => (
  <motion.div whileHover={{ opacity: 1 }} initial={{ opacity: initialOpacity }}>
    {children}
  </motion.div>
);

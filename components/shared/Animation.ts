export const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};
export const child = {
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
      duration: 5,
      repeat: Infinity,
      repeatDelay: 5,
    },
  },
  hidden: {
    opacity: 0,
    x: -20,
    y: 10,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
      repeat: Infinity,
    },
  },
};

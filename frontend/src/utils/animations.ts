export const SliderOpacityVariants = {
  visible: {
    opacity: 1,
    x: 0,
  },
  hidden: {
    opacity: 0,
    x: -window.innerWidth,
  },
  exit: {
    opacity: 0,
    x: window.innerWidth,
  },
};

export const OpacityVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: { opacity: 0 },
};

export const OpacityStaggerVariants = {
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
  hidden: { opacity: 0 },
  exit: { opacity: 0 },
};

export const AccordionTextVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "unset" },
  exit: { opacity: 0, height: 0, transition: { delay: 0.1 } },
};

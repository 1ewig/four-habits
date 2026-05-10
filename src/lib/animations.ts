import { type Transition } from 'framer-motion';

export const TRANSITIONS = {
  smooth: {
    type: 'spring',
    stiffness: 200,
    damping: 25,
  } as Transition,

  modalSlide: {
    type: 'spring',
    stiffness: 150,
    damping: 20,
    mass: 0.8,
  } as Transition,

  quick: {
    duration: 0.2,
  } as Transition,

  gentle: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
    mass: 1,
  } as Transition,
} as const;

export const EASES = {
  default: [0.25, 0.1, 0.25, 1] as const,
  enter: [0.4, 0, 0.2, 1] as const,
  exit: [0.4, 0, 0.2, 1] as const,
} as const;
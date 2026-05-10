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

  page: {
    duration: 0.2,
    ease: 'easeInOut',
  } as Transition,

  habitPage: {
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1],
  } as Transition,

  barChart: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  } as Transition,

  neuralPath: {
    duration: 1,
  } as Transition,

  neuralNode: {
    type: 'spring',
    bounce: 0.4,
  } as Transition,

  segmentedControl: {
    type: 'spring',
    bounce: 0.2,
    duration: 0.6,
  } as Transition,

  toggle: {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  } as Transition,

  cardPulse: {
    duration: 0.6,
    ease: 'easeOut',
  } as Transition,
} as const;

export const EASES = {
  default: [0.25, 0.1, 0.25, 1] as const,
  enter: [0.4, 0, 0.2, 1] as const,
  exit: [0.4, 0, 0.2, 1] as const,
} as const;

export const DELAYS = {
  barChart: 0.1,
  neuralPath: 0.05,
  neuralNode: 0.05,
} as const;
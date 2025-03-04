import { exp } from "three/tsl";

const questions = [
  // Q1: 5 + 4 = 9
  {
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٤" },
    ],
    operation: "+",
    operands: [{ type: "fixed", value: "٥" }],
    dropzones: [{ correct: "٩", type: "regular" }],
    needsRemainder: false,
    incorrectAttempts: 0,
  },

  // Q2: 7 + 3 = 10
  {
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٧" },
    ],
    operation: "+",
    operands: [{ type: "fixed", value: "٣" }],
    dropzones: [
      { correct: "١", type: "regular" },
      { correct: "٠", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  // Q3: 6 + 8 = 14
  {
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٦" },
    ],
    operation: "+",
    operands: [{ type: "fixed", value: "٨" }],
    dropzones: [
      { correct: "١", type: "regular" },
      { correct: "٤", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  // Q4: 9 + 7 = 16
  {
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٩" },
    ],
    operation: "+",
    operands: [{ type: "fixed", value: "٧" }],
    dropzones: [
      { correct: "١", type: "regular" },
      { correct: "٦", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  // Q5: 23 + 35 = 58
  {
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٢٣" },
    ],
    operation: "+",
    operands: [{ type: "fixed", value: "٣٥" }],
    dropzones: [
      { correct: "٥", type: "regular" },
      { correct: "٨", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
  // Q6: 36 + 48 = 84
  {
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٣٦" },
    ],
    operation: "+",
    operands: [{ type: "fixed", value: "٤٨" }],
    dropzones: [
      { correct: "٨", type: "regular" },
      { correct: "٤", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
  // Q7: 97 + 68 = 165
  {
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٦٨" },
    ],
    operation: "+",
    operands: [{ type: "fixed", value: "٩٧" }],
    dropzones: [
      { correct: "١", type: "regular" },
      { correct: "٦", type: "regular" },
      { correct: "٥", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
  // Q8: 437 + 89 = 526
  {
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٤٣٧" },
    ],
    operation: "+",
    operands: [{ type: "fixed", value: "٨٩" }],
    dropzones: [
      { correct: "٥", type: "regular" },
      { correct: "٢", type: "regular" },
      { correct: "٦", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
  // Q9: 6538 + 2676 = 9914
  {
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٦٥٣٨" },
    ],
    operation: "+",
    operands: [{ type: "fixed", value: "٢٦٧٦" }],
    dropzones: [
      { correct: "٩", type: "regular" },
      { correct: "٩", type: "regular" },
      { correct: "١", type: "regular" },
      { correct: "٤", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
];
export default questions;

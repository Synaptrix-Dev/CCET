import { exp } from "three/tsl";

const questions = [
  {
    // Q1: 7-5
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٥" },
    ],
    operation: "-",
    operands: [{ type: "fixed", value: "٧" }],
    dropzones: [{ correct: "٢", type: "regular" }],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q2: 8-4
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٤" },
    ],
    operation: "-",
    operands: [{ type: "fixed", value: "٨" }],
    dropzones: [{ correct: "٤", type: "regular" }],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q3: 12-9
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٩" },
    ],
    operation: "-",
    operands: [{ type: "fixed", value: "١٢" }],
    dropzones: [{ correct: "٣", type: "regular" }],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q4: 16-8
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٨" },
    ],
    operation: "-",
    operands: [{ type: "fixed", value: "١٦" }],
    dropzones: [{ correct: "٨", type: "regular" }],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q5: 59-33
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٥٩" },
    ],
    operation: "-",
    operands: [{ type: "fixed", value: "٣٣" }],
    dropzones: [
      { correct: "٢", type: "regular" },
      { correct: "٦", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
  {
    // Q7: 71-56
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٧١" },
    ],
    operation: "-",
    operands: [{ type: "fixed", value: "٥٦" }],
    dropzones: [
      { correct: "١", type: "regular" },
      { correct: "٥", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
  {
    // Q6: 90-54
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٩٠" },
    ],
    operation: "-",
    operands: [{ type: "fixed", value: "٥٤" }],
    dropzones: [
      { correct: "٣", type: "regular" },
      { correct: "٦", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
  {
    // Q8: 657-28
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٦٥٧" },
    ],
    operation: "-",
    operands: [{ type: "fixed", value: "٢٨" }],
    dropzones: [
      { correct: "٦", type: "regular" },
      { correct: "٢", type: "regular" },
      { correct: "٩", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
  {
    // Q9: 9704-3859
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٩٧٠٤" },
    ],
    operation: "-",
    operands: [{ type: "fixed", value: "٣٨٥٩" }],
    dropzones: [
      { correct: "٥", type: "regular" },
      { correct: "٨", type: "regular" },
      { correct: "٤", type: "regular" },
      { correct: "٥", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
];

export default questions;

import { exp } from "three/tsl";
const questions = [
  {
    // Q1: 2×3
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٢" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٣" }],
    dropzones: [{ correct: "٦", type: "regular" }],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q2: 4×5
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٥" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٤" }],
    dropzones: [
      { correct: "٢", type: "regular" },
      { correct: "٠", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q3: 6×4
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٤" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٦" }],
    dropzones: [
      { correct: "٢", type: "regular" },
      { correct: "٤", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q4: 9×9
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٩" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٩" }],
    dropzones: [
      { correct: "٨", type: "regular" },
      { correct: "١", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q6: 7×8
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٨" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٧" }],
    dropzones: [
      { correct: "٥", type: "regular" },
      { correct: "٦", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q5: 4×7
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٧" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٤" }],
    dropzones: [
      { correct: "٢", type: "regular" },
      { correct: "٨", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Qn: 6×9
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٩" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٦" }],
    dropzones: [
      { correct: "٥", type: "regular" },
      { correct: "٤", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q7: 8×5
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٥" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٨" }],
    dropzones: [
      { correct: "٤", type: "regular" },
      { correct: "٠", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q8: 8×3
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٣" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٨" }],
    dropzones: [
      { correct: "٢", type: "regular" },
      { correct: "٤", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q9: 6×7
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٧" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٦" }],
    dropzones: [
      { correct: "٤", type: "regular" },
      { correct: "٢", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q11: 6×10
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "١٠" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٦" }],
    dropzones: [
      { correct: "٦", type: "regular" },
      { correct: "٠", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q12: 3×20
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٣" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٢٠" }],
    dropzones: [
      { correct: "٦", type: "regular" },
      { correct: "٠", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q13: 7×100
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "١٠٠" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٧" }],
    dropzones: [
      { correct: "٧", type: "regular" },
      { correct: "٠", type: "regular" },
      { correct: "٠", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    // Q14: 5×200
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٥" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٢٠٠" }],
    dropzones: [
      { correct: "١", type: "regular" },
      { correct: "٠", type: "regular" },
      { correct: "٠", type: "regular" },
      { correct: "٠", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    //Q15:52x7
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٥٢" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٧" }],
    dropzones: [
      { correct: "٣", type: "regular" },
      { correct: "٦", type: "regular" },
      { correct: "٤", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
  {
    // Q16: 8×327
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٣٢٧" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٨" }],
    dropzones: [
      { correct: "١", type: "regular" },
      { correct: "٦", type: "regular" },
      { correct: "٢", type: "regular" },
      { correct: "٦", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
  {
    //Q17 45x36
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٤٥" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٣٦" }],
    dropzones: [
      //1st round
      { correct: "١", type: "regular" },
      { correct: "٦", type: "regular" },
      { correct: "٢", type: "regular" },
      //2nd round
      { correct: "١", type: "regular" },
      { correct: "٤", type: "regular" },
      { correct: "٤", type: "regular" },
      { correct: "٠", type: "regular" },
      // actual answer
      { correct: "١", type: "regular" },
      { correct: "٦", type: "regular" },
      { correct: "٢", type: "regular" },
      { correct: "٠", type: "regular" },
    ],
    needsRemainder: true,
    incorrectAttempts: 0,
  },
  {
    //Q18 4*1000
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "١٠٠٠" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٤" }],
    dropzones: [
      { correct: "٤", type: "regular" },
      { correct: "٠", type: "regular" },
      { correct: "٠", type: "regular" },
      { correct: "٠", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
  {
    //Q19 5000X7
    grid: [
      { type: "empty", value: "" },
      { type: "fixed", value: "٧" },
    ],
    operation: "×",
    operands: [{ type: "fixed", value: "٥٠٠٠" }],
    dropzones: [
      { correct: "٣", type: "regular" },
      { correct: "٥", type: "regular" },
      { correct: "٠", type: "regular" },
      { correct: "٠", type: "regular" },
      { correct: "٠", type: "regular" },
    ],
    needsRemainder: false,
    incorrectAttempts: 0,
  },
];
export default questions;

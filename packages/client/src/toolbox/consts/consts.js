export const difficultyLevel = {
  1: {
    difficulty: "Weak",
    color: "text-red-600",
    bg: "[&::-webkit-progress-value]:bg-red-600",
  },
  2: {
    difficulty: "Fair",
    color: "text-yellow-500",
    bg: "[&::-webkit-progress-value]:bg-yellow-500",
  },
  3: {
    difficulty: "Good",
    color: "text-green-400",
    bg: "[&::-webkit-progress-value]:bg-green-400",
  },
  4: {
    difficulty: "Good",
    color: "text-green-400",
    bg: "[&::-webkit-progress-value]:bg-green-400",
  },
  5: {
    difficulty: "Excellent",
    color: "text-green-600",
    bg: "[&::-webkit-progress-value]:bg-green-600",
  },
};

export const passwordRules = [
  {
    rule: /(?=.*[a-z])(?=.*[A-Z])/g,
    message: "At least one upper and lower case",
  },
  {
    rule: /\d/g,
    message: "At least one number",
  },
  {
    rule: /[$&+,:;=?@#|'<>.^*()%!-]/g,
    message: "At least one special character",
  },
];

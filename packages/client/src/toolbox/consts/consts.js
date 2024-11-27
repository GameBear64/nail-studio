export const difficultyLevel = {
  1: {
    difficulty: "Weak",
    color: "text-red-600",
    bg: "bg-red-600",
  },
  2: {
    difficulty: "Fair",
    color: "text-yellow-500",
    bg: "bg-yellow-500",
  },
  3: {
    difficulty: "Good",
    color: "text-green-400",
    bg: "bg-green-400",
  },
  4: {
    difficulty: "Good",
    color: "text-green-400",
    bg: "bg-green-400",
  },
  5: {
    difficulty: "Excellent",
    color: "text-green-400",
    bg: "bg-green-400",
  },
};

export const passwordRules = [
  {
    rule: /^.{8,}$/,
    message: "Required: At least 8 characters",
  },
  {
    rule: /(?=.*[a-z])(?=.*[A-Z])/g,
    message: "Optional: At least one upper and lower case",
  },
  {
    rule: /\d/g,
    message: "Optional: At least one number",
  },
  {
    rule: /[$&+,:;=?@#|'<>.^*()%!-]/g,
    message: "Optional: At least one special character",
  },
];

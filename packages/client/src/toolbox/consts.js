export const UserRoles = Object.freeze({
  USER: 'user',
  ARTIST: 'artist',
  ADMIN: 'admin',
});

export const difficultyLevel = {
  1: {
    difficulty: 'Weak',
    color: 'text-red-600',
    bg: '[&::-webkit-progress-value]:bg-red-600',
  },
  2: {
    difficulty: 'Fair',
    color: 'text-yellow-500',
    bg: '[&::-webkit-progress-value]:bg-yellow-500',
  },
  3: {
    difficulty: 'Good',
    color: 'text-green-400',
    bg: '[&::-webkit-progress-value]:bg-green-400',
  },
  4: {
    difficulty: 'Good',
    color: 'text-green-400',
    bg: '[&::-webkit-progress-value]:bg-green-400',
  },
  5: {
    difficulty: 'Excellent',
    color: 'text-green-600',
    bg: '[&::-webkit-progress-value]:bg-green-600',
  },
};

export const passwordRules = [
  { rule: /^.{8,}$/, message: 'At least 8 characters', required: true },
  {
    rule: /(?=.*[a-z])(?=.*[A-Z])/g,
    message: 'At least one upper and lower case',
  },
  {
    rule: /\d/g,
    message: 'At least one number',
  },
  {
    rule: /[$&+,:;=?@#|'<>.^*()%!-]/g,
    message: 'At least one special character',
  },
  { rule: /^.{12,}$/, message: 'At least 12 characters' },
];

export const leafs = [
  {
    position: 'left-40 -top-10 ',
    animation: 1,
    size: 'size-6',
    delay: 'delay-300',
  },
  {
    position: '-left-32 top-20 ',
    animation: 1,
    size: 'size-3',
    delay: 'delay-300',
  },
  {
    position: '-left-10 -top-10 ',
    animation: 4,
    size: 'size-2',
    delay: 'delay-4000',
  },
  {
    position: 'left-10 -top-10 ',
    animation: 1,
    size: 'size-2',
    delay: 'delay-2000',
  },
  {
    position: 'left-52 -top-10 ',
    animation: 1,
    size: 'size-2',
    delay: 'delay-1000',
  },
  {
    position: 'left-72 -top-10 ',
    animation: 1,
    size: 'size-3',
    delay: 'delay-5000',
  },
  {
    position: 'left-0 -top-10 ',
    animation: 3,
    size: 'size-8',
    delay: 'delay-100',
  },
  {
    position: 'left-60 -top-10 ',
    animation: 2,
    size: 'size-7',
    delay: 'delay-2000',
  },
  {
    position: '-left-24 -top-10 ',
    animation: 3,
    size: 'size-9',
    delay: 'delay-3000',
  },
  {
    position: '-left-40 top-40',
    animation: 3,
    size: 'size-9',
    delay: 'delay-5000',
  },
  {
    position: '-left-40 top-96',
    animation: 3,
    size: 'size-14',
    delay: 'delay-1000',
  },
  {
    position: 'left-[65%] -top-10',
    animation: 3,
    size: 'size-14',
    delay: 'delay-1000',
  },
];

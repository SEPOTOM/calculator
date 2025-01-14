export default {
  '*': 'npm run pretty',
  '*.{ts,tsx}': ['npm run pretty', 'npm run lint'],
};

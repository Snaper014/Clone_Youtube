module.exports = {
  roots: ["src"],
  testMatch: ["**/Test/**/test.js"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules"],
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Ajoutez cette ligne pour utiliser Babel avec les fichiers .js
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "exercise\\.js$",
    "final\\.js$",
    "bonus-\\d+\\.js$",
  ],
};

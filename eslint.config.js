module.exports = {
	overrides: [
		{
			files: ["**/*.ts", "**/*.tsx", "**/*.js"],
			extends: "eslint-config-standard-with-typescript",
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
	],
};

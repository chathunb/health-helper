{
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"extends": ["airbnb-base", "prettier", "eslint:recommended", "plugin:@typescript-eslint/eslint-recommended"],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 13,
		"sourceType": "module"
	},
	"plugins": ["prettier", "@typescript-eslint"],
	"rules": {
		//* Avoid Bugs
		"no-undef": "error",
		"semi": "error",
		"semi-spacing": "error",
		//* Best Practices
		"eqeqeq": "warn",
		"no-console": "warn",
		"no-extra-semi": "error",
		"no-empty-function": "error",
		"no-invalid-this": "error",
		"no-return-assign": "error",
		"no-unused-expressions": ["error", {"allowTernary": true}],
		"no-useless-concat": "error",
		"no-useless-return": "error",
		"no-constant-condition": "warn",
		"no-unused-vars": ["error", {"argsIgnorePattern": "req|res|next|__"}],
		//* Enhance Readability
		"indent": ["error", "tab"],
		"no-mixed-spaces-and-tabs": "warn",
		"space-before-blocks": "error",
		"space-in-parens": "error",
		"space-infix-ops": "error",
		"space-unary-ops": "error",
		"quotes": ["error", "single"],
		//
		"max-len": ["error", {"code": 200}],
		"max-lines": ["error", {"max": 5000}],
		"keyword-spacing": "error",
		"multiline-ternary": ["error", "never"],
		"no-mixed-operators": "error",
		//
		"no-multiple-empty-lines": ["error", {"max": 2, "maxEOF": 1}],
		"no-whitespace-before-property": "error",
		"nonblock-statement-body-position": "error",
		"object-property-newline": ["error", {"allowAllPropertiesOnSameLine": true}],
		//* ES6
		"arrow-spacing": "error",
		"no-confusing-arrow": "error",
		"no-duplicate-imports": "error",
		"no-var": "error",
		"object-shorthand": "off",
		"prefer-const": "error",
		"prefer-template": "warn",

		//* custom

		"import/no-extraneous-dependencies": [
			"error",
			{"devDependencies": true, "optionalDependencies": true, "peerDependencies": true}
		],
		"import/extensions": [
			"warn",
			"ignorePackages",
			{
				"js": "never",
				"jsx": "never",
				"ts": "never",
				"tsx": "never"
			}
		],
		"no-shadow": [
			"warn",
			{"builtinGlobals": false, "hoist": "functions", "allow": [], "ignoreOnInitialization": false}
		],
		"import/named": "error"
	},
	"settings": {
		"import/resolver": {
		  "node": {
			"extensions": [".js", ".jsx", ".ts", ".tsx"]
		  }
		}
	  }
}

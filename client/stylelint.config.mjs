/** @type {import("stylelint").Config} */
export default {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		'no-descending-specificity': null,
		'selector-class-pattern': null,
		'scss/at-mixin-argumentless-call-parentheses': 'always',
	},
}

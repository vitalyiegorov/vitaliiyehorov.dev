export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'perf', 'docs', 'style', 'test', 'chore', 'ci', 'revert']],
        'scope-empty': [0],
        'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
        'subject-empty': [2, 'never'],
        'subject-max-length': [2, 'always', 100],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'body-max-line-length': [1, 'always', 200],
        'footer-max-line-length': [1, 'always', 200],
        'header-max-length': [2, 'always', 120]
    }
};

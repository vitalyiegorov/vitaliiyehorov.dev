const quote = fileNames => fileNames.map(fileName => JSON.stringify(fileName)).join(' ');

export default {
    '*': fileNames => {
        const scripts = fileNames.filter(fileName => /\.(?:[cm]?[jt]s|[jt]sx)$/u.test(fileName));
        const lint =
            scripts.length > 0 ? [`oxlint --type-aware --fix --deny-warnings --no-error-on-unmatched-pattern ${quote(scripts)}`] : [];

        return [...lint, `oxfmt --no-error-on-unmatched-pattern ${quote(fileNames)}`];
    }
};

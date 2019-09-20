const preferDefault = m => (m && m.default) || m;
const wrapRootElement = preferDefault(require(`./wrap-with-provider`));

export {wrapRootElement}

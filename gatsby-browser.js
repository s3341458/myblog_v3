require("typeface-montserrat");
require("typeface-merriweather");

const preferDefault = m => (m && m.default) || m;
exports.wrapRootElement = preferDefault(require(`./wrap-with-provider`));


const helmet = require("helmet");

module.exports = helmet({
    noSniff: true,
    referrerPolicy: { policy: "no-referrer" },
    permittedCrossDomainPolicies: { permittedPolicies: "none" },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    frameguard: { action: "deny" },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "default-src": ["\"self\""],
            "object-src": ["\"none\""]
        }
    }
})
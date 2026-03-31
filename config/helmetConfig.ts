import helmet from "helmet";

// Define your custom Helmet configuration
export const getHelmetConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        return helmet({
            contentSecurityPolicy: false,
            hsts: false,
            hidePoweredBy: true,
            noSniff: true,
            referrerPolicy: { policy: "no-referrer" }, // literal type
            frameguard: { action: "sameorigin" },       // literal type
            crossOriginResourcePolicy: { policy: "same-origin" }, // literal type
            ieNoOpen: true,
            dnsPrefetchControl: { allow: false },
        });
    }

    return helmet({
        contentSecurityPolicy: false,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        hidePoweredBy: true,
        noSniff: true,
        referrerPolicy: { policy: "no-referrer" },          // must match allowed literal
        frameguard: { action: "deny" },                     // must match allowed literal
        crossOriginResourcePolicy: { policy: "same-origin" }, // must match allowed literal
        ieNoOpen: true,
        dnsPrefetchControl: { allow: false },
    });
};
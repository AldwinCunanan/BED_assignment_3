import helmet from "helmet";

// Define your custom Helmet configuration
export const apihelmetConfig = helmet({
  contentSecurityPolicy: false, // Disable for JSON APIs
  dnsPrefetchControl: { allow: false }, // Prevent DNS prefetching
  frameguard: { action: "deny" }, // Prevent clickjacking
  hidePoweredBy: true, // Hide Express version
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  ieNoOpen: true, // Prevent IE from opening downloads in your context
  noSniff: true, // Prevent MIME sniffing
  referrerPolicy: { policy: "no-referrer" }, // Privacy
  crossOriginResourcePolicy: { policy: "same-origin" }, // Protect API responses
});
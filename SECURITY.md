### Configuration Applied

const getHelmetConfig = () => {
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

### Justification 

1. **contentSecurityPolicy: false** - Disabled because this API only returns JSON and doesn’t serve HTML. CSP mainly protects HTML pages from XSS attacks, so it’s not needed here.

2. **hsts** - Enabled in production with a 1-year max-age to enforce HTTPS and prevent downgrade attacks. Disabled in development so you can test locally without HTTPS issues.

3. **hidePoweredBy: true** - Hides Express version info to make it harder for attackers to target known vulnerabilities.

4. **noSniff: true** - Prevents browsers from guessing content types, which helps stop some sneaky attacks.

5. **referrerPolicy: "no-referrer"** - Ensures URLs aren’t leaked in the Referer header when navigating to other sites.

6. **frameguard** - Set to "sameorigin" in development so iframes still work while testing. Set to "deny" in production to block clickjacking attempts.

7. **crossOriginResourcePolicy: "same-origin"** - Restricts resource sharing to the same origin, helping prevent cross-origin attacks.

8. **ieNoOpen: true** - Stops Internet Explorer from automatically running downloads in your site’s context.

9. **dnsPrefetchControl: { allow: false }** - Disables DNS prefetching to improve privacy and reduce tracking risks.

### Sources

1. Helmet.js Official Documentation - https://helmetjs.github.io/
2. OWASP Secure Headers Project - https://owasp.org/www-project-secure-headers/
3. HTTP Security Response Headers Cheat Sheet - https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
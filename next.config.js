// Security headers configuration
const securityHeaders = [
    {key: 'X-Content-Type-Options', value: 'nosniff'},
    {key: 'X-Frame-Options', value: 'SAMEORIGIN'},
    {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
    {key: 'X-XSS-Protection', value: '0'},
    {key: 'Permissions-Policy', value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'},
    {key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://unpkg.com https://identity.netlify.com https://*.netlify.app; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.netlify.com https://*.netlify.app https://identity.netlify.com; frame-src 'self' https://identity.netlify.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://identity.netlify.com"}
];

module.exports = {
    experimental: {
        optimizePackageImports: [
            'lucide-react',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/react-fontawesome'
        ],
    },
    turbopack: {
        rules: {
            '*.md': {
                loaders: ['frontmatter-markdown-loader'],
                as: '*.js',
            },
        },
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    webpack: (cfg) => {
        cfg.module.rules.push(
            {
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader',
                options: { mode: ['react-component'] }
            }
        )
        return cfg
    },
    async rewrites() {
        return [
            {
                source: '/admin',
                destination: '/admin/index.html'
            }
        ]
    },
    async headers() {
        return [
            {
                // Apply security headers to all routes
                source: '/:path*',
                headers: securityHeaders
            }
        ]
    }
}

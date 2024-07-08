const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

esbuild.build({
    entryPoints: ['frontend/index.js', 'frontend/style.scss'],
    bundle: true,
    minify: true,
    outdir: 'public/assets',
    plugins: [sassPlugin()],
    loader: {
        '.js': 'jsx',
        '.scss': 'css',
    },
})
    .then(() => console.log('Build complete'))
    .catch(() => process.exit(1));

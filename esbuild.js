const esbuild= require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

esbuild.build({
    entryPoints: ['frontend/application.tsx', 'frontend/style.scss'],
    bundle: true,
    minify: true,
    outdir: 'public/assets',
    plugins: [sassPlugin()],
})
    .then(() => console.log('Build complete'))
    .catch(() => process.exit(1));

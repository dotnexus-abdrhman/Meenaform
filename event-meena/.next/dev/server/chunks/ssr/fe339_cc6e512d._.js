module.exports = [
"[project]/event-meena/node_modules/html2canvas/dist/html2canvas.esm.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/event-meena/node_modules/html2canvas/dist/html2canvas.esm.js [app-ssr] (ecmascript)");
    });
});
}),
"[project]/event-meena/node_modules/dompurify/dist/purify.es.mjs [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/fe339_dompurify_dist_purify_es_mjs_505029d2._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/event-meena/node_modules/dompurify/dist/purify.es.mjs [app-ssr] (ecmascript)");
    });
});
}),
"[project]/event-meena/node_modules/canvg/lib/index.es.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/fe339_97224911._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/event-meena/node_modules/canvg/lib/index.es.js [app-ssr] (ecmascript)");
    });
});
}),
];
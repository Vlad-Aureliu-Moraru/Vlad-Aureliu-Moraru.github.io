
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/myVlad-Aureliu-Moraru.github.io/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/myVlad-Aureliu-Moraru.github.io"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 463, hash: '72370f077bb0947dc003e5a5ef98acca303e0b93beeaf1d2d1c46a77d260f189', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 976, hash: '0e592d449224982424f8db84808a3b6a825ef10530a14fa0e00cd6a3a8e86fb9', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 21573, hash: '423c0d0838b0e9baadccc4677b6fdb1e474552999f89440874327be47f6bcefd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};

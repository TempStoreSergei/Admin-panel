import { createApp } from 'vue'
import { createVuestic } from 'vuestic-ui'

import { router, store, i18n, config } from './providers'
import App from './index.vue'
export const app = createApp(App).use(router).use(store).use(i18n).use(createVuestic({ config }))

import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as build from '../build'

const handleRequest = createPagesFunctionHandler({
  build,
  getLoadContext({ env }) {
    return env
  },
})

export function onRequest(context) {
  return handleRequest(context)
}

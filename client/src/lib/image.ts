import { ENV } from "../config/env";

/** См. https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0727127 */
export function getRefreshImage(url: string) {
    return getPath(url) + `?${Date.now()}`;
}

/**
 * ```typescript
 * const path = getImage('/static/wind.png')
 * path // http://localhost:3001/static/wind.png`
 * ```
 */
export function getPath<T extends string | null>(relativeUrl: T): T {
    if (!relativeUrl) return null as T;
    return new URL(relativeUrl, ENV.SERVER_URL).href as T;
}

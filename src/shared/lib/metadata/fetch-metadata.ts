import * as cheerio from 'cheerio'
import type { MetadataResult } from './types'

export async function fetchMetadata(url: string): Promise<MetadataResult> {
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; MetaLens/1.0; +https://metalens.dev)',
    },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch URL: ${response.status} ${response.statusText}`
    )
  }

  const html = await response.text()
  const $ = cheerio.load(html)

  const getMeta = (name: string, attr: string = 'name') =>
    $(`meta[${attr}="${name}"]`).attr('content') || undefined

  const getLink = (rel: string) =>
    $(`link[rel="${rel}"]`).attr('href') || undefined

  const alternateUrls: { [key: string]: string } = {}
  $('link[rel="alternate"]').each((_, el) => {
    const hreflang = $(el).attr('hreflang')
    const href = $(el).attr('href')
    if (hreflang && href) {
      alternateUrls[hreflang] = href
    }
  })

  const baseUrl = new URL(url).origin
  let sitemapUrl: string | undefined
  let sitemapExists = false
  let robotsTxtExists = false
  let robotsTxtContent: string | undefined

  try {
    const robotsResponse = await fetch(`${baseUrl}/robots.txt`)
    if (robotsResponse.ok) {
      robotsTxtExists = true
      robotsTxtContent = await robotsResponse.text()

      const sitemapMatch = robotsTxtContent.match(/Sitemap:\s*(.+)/i)
      if (sitemapMatch) {
        sitemapUrl = sitemapMatch[1].trim()
        sitemapExists = true
      }
    }
  } catch {
    // robots.txt not available
  }

  if (!sitemapExists) {
    const commonSitemapPaths = [
      '/sitemap.xml',
      '/sitemap_index.xml',
      '/sitemap/',
      '/sitemap/sitemap.xml',
    ]

    for (const path of commonSitemapPaths) {
      try {
        const sitemapResponse = await fetch(`${baseUrl}${path}`)
        if (sitemapResponse.ok) {
          sitemapUrl = `${baseUrl}${path}`
          sitemapExists = true
          break
        }
      } catch {
        // sitemap path not available
      }
    }
  }

  return {
    // Basic SEO
    title: $('title').text() || undefined,
    description: getMeta('description'),
    keywords: getMeta('keywords'),
    author: getMeta('author'),
    generator: getMeta('generator'),
    themeColor: getMeta('theme-color'),

    // Open Graph
    ogTitle: getMeta('og:title', 'property'),
    ogDescription: getMeta('og:description', 'property'),
    ogImage: getMeta('og:image', 'property'),
    ogImageWidth: getMeta('og:image:width', 'property'),
    ogImageHeight: getMeta('og:image:height', 'property'),
    ogImageAlt: getMeta('og:image:alt', 'property'),
    ogUrl: getMeta('og:url', 'property'),
    ogType: getMeta('og:type', 'property'),
    ogSiteName: getMeta('og:site_name', 'property'),
    ogLocale: getMeta('og:locale', 'property'),
    ogVideo: getMeta('og:video', 'property'),
    ogAudio: getMeta('og:audio', 'property'),

    // Facebook
    fbAppId: getMeta('fb:app_id', 'property'),
    fbPages: getMeta('fb:pages', 'property'),
    fbDomainVerification: getMeta('facebook-domain-verification'),

    // Twitter Cards
    twitterCard: getMeta('twitter:card'),
    twitterTitle: getMeta('twitter:title'),
    twitterDescription: getMeta('twitter:description'),
    twitterImage: getMeta('twitter:image'),
    twitterImageAlt: getMeta('twitter:image:alt'),
    twitterSite: getMeta('twitter:site'),
    twitterCreator: getMeta('twitter:creator'),
    twitterDomainVerification: getMeta('twitter:domain-verification'),

    // Technical
    canonicalUrl: getLink('canonical'),
    robots: getMeta('robots'),
    viewport: getMeta('viewport'),
    charset: $('meta[charset]').attr('charset') || undefined,
    language: $('html').attr('lang') || undefined,
    favicon: getLink('icon') || getLink('shortcut icon'),
    appleTouchIcon: getLink('apple-touch-icon'),
    manifest: getLink('manifest'),

    // Article Specific
    articlePublishedTime: getMeta('article:published_time', 'property'),
    articleModifiedTime: getMeta('article:modified_time', 'property'),
    articleAuthor: getMeta('article:author', 'property'),
    articleSection: getMeta('article:section', 'property'),
    articleTags: getMeta('article:tag', 'property'),

    // Additional SEO
    alternateUrls:
      Object.keys(alternateUrls).length > 0 ? alternateUrls : undefined,
    prevPage: getLink('prev'),
    nextPage: getLink('next'),
    rating: getMeta('rating'),
    referrer: getMeta('referrer'),

    // Sitemap
    sitemapUrl,
    sitemapExists,
    robotsTxtExists,
    robotsTxtContent,

    // Discord (uses OG tags)
    discordTitle: getMeta('og:title', 'property') || getMeta('title'),
    discordDescription:
      getMeta('og:description', 'property') || getMeta('description'),
    discordImage: getMeta('og:image', 'property'),
    discordType: getMeta('og:type', 'property'),

    // Slack (uses OG tags)
    slackTitle: getMeta('og:title', 'property') || getMeta('title'),
    slackDescription:
      getMeta('og:description', 'property') || getMeta('description'),
    slackImage: getMeta('og:image', 'property'),
    slackType: getMeta('og:type', 'property'),
  }
}

import type { MetadataResult } from '@/shared/lib/metadata'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
  CopyButton,
} from '@/shared/ui'
import {
  MetadataField,
  MetadataGrid,
  MetadataSection,
  SocialPreviewCard,
  StatusBadge,
} from '@/entities/metadata'
import { formatUrl } from '@/shared/lib'

interface MetadataDashboardProps {
  metadata: MetadataResult
}

export function MetadataDashboard({ metadata }: MetadataDashboardProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="social">Social Preview</TabsTrigger>
        <TabsTrigger value="technical">Technical</TabsTrigger>
        <TabsTrigger value="sitemap">Sitemap & Robots</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4 space-y-4">
        <MetadataSection
          title='Basic Information'
          description='Core metadata information about your webpage'
          data={{
            title: metadata.title,
            description: metadata.description,
            keywords: metadata.keywords,
            author: metadata.author,
            generator: metadata.generator,
            themeColor: metadata.themeColor,
          }}
        >
          <MetadataGrid>
            <MetadataField label='Title' value={metadata.title} />
            <MetadataField
              label='Description'
              value={metadata.description}
            />
          </MetadataGrid>
          <MetadataGrid>
            <MetadataField label='Keywords' value={metadata.keywords} />
            <MetadataField label='Author' value={metadata.author} />
          </MetadataGrid>
          <MetadataGrid>
            <MetadataField label='Generator' value={metadata.generator} />
            <MetadataField
              label='Theme Color'
              value={metadata.themeColor}
            />
          </MetadataGrid>
        </MetadataSection>
        <MetadataSection
          title='Article Information'
          description='Article-specific metadata for better content organization'
          data={{
            publishedTime: metadata.articlePublishedTime,
            modifiedTime: metadata.articleModifiedTime,
            author: metadata.articleAuthor,
            section: metadata.articleSection,
            tags: metadata.articleTags,
          }}
        >
          <MetadataGrid>
            <MetadataField
              label='Published Time'
              value={metadata.articlePublishedTime}
            />
            <MetadataField
              label='Modified Time'
              value={metadata.articleModifiedTime}
            />
          </MetadataGrid>
          <MetadataGrid>
            <MetadataField label='Author' value={metadata.articleAuthor} />
            <MetadataField
              label='Section'
              value={metadata.articleSection}
            />
          </MetadataGrid>
          <MetadataField label='Tags' value={metadata.articleTags} />
        </MetadataSection>
      </TabsContent>

      <TabsContent value="social" className="mt-4 space-y-4">
        <MetadataSection
          title='Open Graph'
          description='Social media sharing information using Open Graph protocol'
          data={{
            ogTitle: metadata.ogTitle,
            ogDescription: metadata.ogDescription,
            ogType: metadata.ogType,
            ogSiteName: metadata.ogSiteName,
            ogUrl: metadata.ogUrl,
            ogLocale: metadata.ogLocale,
            ogImage: metadata.ogImage,
            ogImageWidth: metadata.ogImageWidth,
            ogImageHeight: metadata.ogImageHeight,
            ogImageAlt: metadata.ogImageAlt,
            ogVideo: metadata.ogVideo,
            ogAudio: metadata.ogAudio,
          }}
        >
          <MetadataGrid>
            <MetadataField label='OG Title' value={metadata.ogTitle} />
            <MetadataField
              label='OG Description'
              value={metadata.ogDescription}
            />
          </MetadataGrid>
          <MetadataGrid>
            <MetadataField label='OG Type' value={metadata.ogType} />
            <MetadataField
              label='OG Site Name'
              value={metadata.ogSiteName}
            />
          </MetadataGrid>
          <MetadataGrid>
            <MetadataField
              label='OG URL'
              value={metadata.ogUrl}
              type='url'
            />
            <MetadataField label='OG Locale' value={metadata.ogLocale} />
          </MetadataGrid>
          <MetadataField
            label='OG Image'
            value={metadata.ogImage}
            type='image'
          />
          {metadata.ogImageAlt && (
            <MetadataField
              label='OG Image Alt'
              value={metadata.ogImageAlt}
            />
          )}
          {metadata.ogVideo && (
            <MetadataField
              label='OG Video'
              value={metadata.ogVideo}
              type='url'
            />
          )}
          {metadata.ogAudio && (
            <MetadataField
              label='OG Audio'
              value={metadata.ogAudio}
              type='url'
            />
          )}
        </MetadataSection>

        <MetadataSection
          title='Facebook'
          description='Facebook-specific metadata and verification'
          data={{
            appId: metadata.fbAppId,
            pages: metadata.fbPages,
            domainVerification: metadata.fbDomainVerification,
          }}
        >
          <MetadataGrid>
            <MetadataField label='App ID' value={metadata.fbAppId} />
            <MetadataField label='Pages' value={metadata.fbPages} />
          </MetadataGrid>
          <MetadataField
            label='Domain Verification'
            value={metadata.fbDomainVerification}
          />
        </MetadataSection>

        <MetadataSection
          title='X/Twitter Card'
          description='X/Twitter-specific social media information'
          data={{
            cardType: metadata.twitterCard,
            title: metadata.twitterTitle,
            description: metadata.twitterDescription,
            site: metadata.twitterSite,
            creator: metadata.twitterCreator,
            image: metadata.twitterImage,
            imageAlt: metadata.twitterImageAlt,
            domainVerification: metadata.twitterDomainVerification,
          }}
        >
          <MetadataGrid>
            <MetadataField label='Card Type' value={metadata.twitterCard} />
            <MetadataField label='Title' value={metadata.twitterTitle} />
          </MetadataGrid>
          <MetadataField
            label='Description'
            value={metadata.twitterDescription}
          />
          <MetadataGrid>
            <MetadataField
              label='Site (@username)'
              value={metadata.twitterSite}
            />
            <MetadataField
              label='Creator (@username)'
              value={metadata.twitterCreator}
            />
          </MetadataGrid>
          <MetadataField
            label='Image'
            value={metadata.twitterImage}
            type='image'
          />
          {metadata.twitterImageAlt && (
            <MetadataField
              label='Image Alt'
              value={metadata.twitterImageAlt}
            />
          )}
          {metadata.twitterDomainVerification && (
            <MetadataField
              label='Domain Verification'
              value={metadata.twitterDomainVerification}
            />
          )}
        </MetadataSection>

        <MetadataSection
          title='Discord Preview'
          description='How your link appears when shared on Discord'
          data={{
            title: metadata.discordTitle,
            description: metadata.discordDescription,
            image: metadata.discordImage,
            type: metadata.discordType,
          }}
        >
          <MetadataField label='Title' value={metadata.discordTitle} />
          <MetadataField
            label='Description'
            value={metadata.discordDescription}
          />
          <MetadataField
            label='Image'
            value={metadata.discordImage}
            type='image'
          />
          {metadata.discordType && (
            <MetadataField label='Type' value={metadata.discordType} />
          )}
        </MetadataSection>

        <MetadataSection
          title='Slack Preview'
          description='How your link appears when shared on Slack'
          data={{
            title: metadata.slackTitle,
            description: metadata.slackDescription,
            image: metadata.slackImage,
            type: metadata.slackType,
          }}
        >
          <MetadataField label='Title' value={metadata.slackTitle} />
          <MetadataField
            label='Description'
            value={metadata.slackDescription}
          />
          <MetadataField
            label='Image'
            value={metadata.slackImage}
            type='image'
          />
          {metadata.slackType && (
            <MetadataField label='Type' value={metadata.slackType} />
          )}
        </MetadataSection>
      </TabsContent>

      <TabsContent value="technical" className="mt-4 space-y-4">
        <MetadataSection
          title='Technical Information'
          description='Technical metadata and settings'
          data={{
            canonicalUrl: metadata.canonicalUrl,
            robots: metadata.robots,
            viewport: metadata.viewport,
            charset: metadata.charset,
            language: metadata.language,
            manifest: metadata.manifest,
            favicon: metadata.favicon,
            appleTouchIcon: metadata.appleTouchIcon,
          }}
        >
          <MetadataGrid>
            <MetadataField
              label='Canonical URL'
              value={metadata.canonicalUrl}
              type='url'
            />
            <MetadataField label='Robots' value={metadata.robots} />
          </MetadataGrid>
          <MetadataGrid>
            <MetadataField label='Viewport' value={metadata.viewport} />
            <MetadataField label='Charset' value={metadata.charset} />
          </MetadataGrid>
          <MetadataGrid>
            <MetadataField label='Language' value={metadata.language} />
            <MetadataField
              label='Manifest'
              value={metadata.manifest}
              type='url'
            />
          </MetadataGrid>
          <MetadataGrid>
            <MetadataField
              label='Favicon'
              value={metadata.favicon}
              type='url'
            />
            <MetadataField
              label='Apple Touch Icon'
              value={metadata.appleTouchIcon}
              type='url'
            />
          </MetadataGrid>
        </MetadataSection>

        <MetadataSection
          title='Additional Information'
          description='Extra metadata and SEO-related information'
          data={{
            alternateUrls: metadata.alternateUrls
              ? Object.entries(metadata.alternateUrls)
                .map(([lang, url]) => `${lang}: ${url}`)
                .join('\n')
              : undefined,
            prevPage: metadata.prevPage,
            nextPage: metadata.nextPage,
            rating: metadata.rating,
            referrer: metadata.referrer,
          }}
        >
          {metadata.alternateUrls && (
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <h3 className='font-medium text-primary'>Alternate URLs</h3>
                <CopyButton
                  content={Object.entries(metadata.alternateUrls)
                    .map(([lang, url]) => `${lang}: ${url}`)
                    .join('\n')}
                />
              </div>
              <div className='space-y-2'>
                {Object.entries(metadata.alternateUrls).map(
                  ([lang, url]) => (
                    <div key={lang} className='flex gap-2'>
                      <span className='text-sm font-medium'>{lang}:</span>
                      <div className='text-sm text-muted-foreground'>
                        {typeof url === 'string'
                          ? formatUrl(url)
                          : 'Invalid URL'}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          <MetadataGrid>
            <MetadataField
              label='Previous Page'
              value={metadata.prevPage}
              type='url'
            />
            <MetadataField
              label='Next Page'
              value={metadata.nextPage}
              type='url'
            />
          </MetadataGrid>
          <MetadataGrid>
            <MetadataField label='Rating' value={metadata.rating} />
            <MetadataField
              label='Referrer Policy'
              value={metadata.referrer}
            />
          </MetadataGrid>
        </MetadataSection>
      </TabsContent>

      <TabsContent value="sitemap" className="mt-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          <StatusBadge exists={metadata.sitemapExists} label="Sitemap" />
          <StatusBadge exists={metadata.robotsTxtExists} label="robots.txt" />
        </div>

        <MetadataSection
          title='Sitemap & Robots.txt'
          description='Search engine crawling configuration'
          data={{
            sitemapUrl: metadata.sitemapUrl,
            robotsTxtContent: metadata.robotsTxtContent,
          }}
        >
          <MetadataGrid>
            <div className='space-y-2'>
              <h3 className='font-medium text-primary'>Sitemap Status</h3>
              <div className='flex items-center gap-2'>
                <div
                  className={`w-2 h-2 rounded-full ${metadata.sitemapExists ? 'bg-green-500' : 'bg-red-500'
                    }`}
                />
                <p className='text-sm text-muted-foreground'>
                  {metadata.sitemapExists
                    ? 'Sitemap found'
                    : 'No sitemap detected'}
                </p>
              </div>
              {metadata.sitemapUrl && (
                <MetadataField
                  label='URL'
                  value={metadata.sitemapUrl}
                  type='url'
                />
              )}
            </div>
            <div className='space-y-2'>
              <h3 className='font-medium text-primary'>
                Robots.txt Status
              </h3>
              <div className='flex items-center gap-2'>
                <div
                  className={`w-2 h-2 rounded-full ${metadata.robotsTxtExists ? 'bg-green-500' : 'bg-red-500'
                    }`}
                />
                <p className='text-sm text-muted-foreground'>
                  {metadata.robotsTxtExists
                    ? 'robots.txt found'
                    : 'No robots.txt detected'}
                </p>
              </div>
            </div>
          </MetadataGrid>
          {metadata.robotsTxtContent && (
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <h3 className='font-medium text-primary'>
                  Robots.txt Content
                </h3>
                <CopyButton content={metadata.robotsTxtContent} />
              </div>
              <pre className='text-sm text-muted-foreground bg-muted p-4 rounded-lg overflow-x-auto whitespace-pre-wrap'>
                {metadata.robotsTxtContent}
              </pre>
            </div>
          )}
        </MetadataSection>
      </TabsContent>
    </Tabs>
  )
}

export const metadataKeys = {
  all: ['metadata'] as const,
  detail: (url: string) => [...metadataKeys.all, url] as const,
}

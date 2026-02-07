'use client'

import { useQuery } from '@tanstack/react-query'
import { checkMetadata } from '@/entities/metadata'
import { metadataKeys } from './query-keys'

export function useMetadataQuery(url: string) {
  return useQuery({
    queryKey: metadataKeys.detail(url),
    queryFn: () => checkMetadata(url),
    enabled: !!url,
  })
}

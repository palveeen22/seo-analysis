import { apiClient } from '@/shared/api'
import type { MetadataResult } from '@/shared/lib/metadata'

export async function checkMetadata(url: string): Promise<MetadataResult> {
  return apiClient<MetadataResult>('/metadata', {
    method: 'POST',
    body: JSON.stringify({ url }),
  })
}

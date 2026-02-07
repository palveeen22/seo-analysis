'use client'

import { useMutation } from '@tanstack/react-query'
import { checkMetadata } from '@/entities/metadata'

export function useMetadataMutation() {
  return useMutation({
    mutationFn: (url: string) => checkMetadata(url),
  })
}

import { useCallback } from 'react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/shared/lib'
import { MetadataItem } from '@/shared/lib/types'

export function useCopyMetadata() {
  const copySectionAsJson = useCallback(
    (title: string, items: MetadataItem[]) => {
      const json = items.reduce<Record<string, string | null>>((acc, item) => {
        acc[item.label] = item.value ?? null
        return acc
      }, {})

      copyToClipboard(JSON.stringify(json, null, 2))
        .then(() => toast.success(`${title} copied as JSON`))
        .catch(() => toast.error('Failed to copy'))
    },
    [],
  )

  const copyValue = useCallback(
    (label: string, value: string | undefined | null) => {
      if (!value) {
        toast.warning(`${label} has no value to copy`)
        return
      }

      copyToClipboard(value)
        .then(() => toast.success(`${label} copied`))
        .catch(() => toast.error('Failed to copy'))
    },
    [],
  )

  const copyRawText = useCallback((label: string, text: string) => {
    copyToClipboard(text)
      .then(() => toast.success(`${label} copied`))
      .catch(() => toast.error('Failed to copy'))
  }, [])

  return { copySectionAsJson, copyValue, copyRawText }
}
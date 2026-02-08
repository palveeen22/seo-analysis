import { NextResponse } from 'next/server'
import { fetchMetadata } from '@/shared/lib/metadata'
import { ValidationError, toErrorResponse, logger } from '@/shared/lib'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url || typeof url !== 'string') {
      throw new ValidationError('URL is required')
    }

    logger.info('Fetching metadata', { url })
    const metadata = await fetchMetadata(url)
    logger.info('Metadata fetched successfully', { url })

    return NextResponse.json(metadata)
  } catch (error) {
    logger.error('Metadata fetch failed', error, { route: '/api/metadata' })
    const { body, status } = toErrorResponse(error)
    return NextResponse.json(body, { status })
  }
}

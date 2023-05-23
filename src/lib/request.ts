type FormatImageRequestParams =
  | {
      type: 'backdrop'
      size: '/w300' | '/w780' | '/w1280' | '/original'
      path: string
    }
  | {
      type: 'logo'
      size:
        | '/w45'
        | '/w92'
        | '/w154'
        | '/w185'
        | '/w300'
        | '/w500'
        | '/original'
      path: string
    }
  | {
      type: 'profile'
      size: '/w45' | '/w185' | '/w500' | '/h632' | '/original'
      path: string
    }
  | {
      type: 'poster'
      size:
        | '/w92'
        | '/w154'
        | '/w185'
        | '/w342'
        | '/w500'
        | '/w780'
        | '/original'
      path: string
    }
  | {
      type: 'still'
      size: '/w92' | '/w185' | '/w300' | '/original'
      path: string
    }

export function formatImageRequest(params: FormatImageRequestParams): string {
  return ''.concat(
    process.env.NEXT_PUBLIC_API_IMAGE_URL,
    params.size,
    params.path
  )
}

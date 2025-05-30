/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useEffect, useRef } from 'react'
import { UAParser } from 'ua-parser-js'

const APP_NAME = 'CineApp'
const COOKIE_KEY = `${formatScreamingSnakeCase(APP_NAME)}_LAST_ACCESS`
const LOG_ACCESS_URL = import.meta.env.VITE_LOG_ACCESS_URL

export function useDailyAppPing(): void {
  const hasPinged = useRef(false)

  useEffect(() => {
    if (!LOG_ACCESS_URL) {
      console.error('VITE_LOG_ACCESS_URL is not defined.')

      return
    }

    if (hasPinged.current) {
      return
    }
    hasPinged.current = true

    const now = new Date()
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    )
    const todayEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    )

    const lastAccessCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${COOKIE_KEY}=`))
      ?.split('=')[1]
    const lastAccessDate = lastAccessCookie ? new Date(lastAccessCookie) : null

    // If the last access date is today or later, do nothing.
    // This prevents multiple pings in the same day and handles potential clock skew.
    if (
      lastAccessDate &&
      !Number.isNaN(lastAccessDate.getTime()) &&
      lastAccessDate.getTime() > todayStart.getTime()
    ) {
      return
    }

    fetch(LOG_ACCESS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appName: APP_NAME,
        meta: collectClientInfo(),
      }),
    })
      .then(() => {
        document.cookie = `${COOKIE_KEY}=${now.toISOString()}; expires=${todayEnd.toUTCString()}; path=/; SameSite=Lax`
      })
      .catch(console.error)
  }, [])
}

interface ClientInfo {
  browser: {
    name: string
    version: string
  }
  os: {
    name: string
    version: string
  }
  device: {
    type: string
    model: string
  }
  platform: string
  userAgent: string
  screen: { w: number; h: number; dpr: number }
  locale: string
  timezone: string
  referrer: string
  pageUrl: string
  clientTime: string // ISO, for drift checks
}

function collectClientInfo(): ClientInfo {
  const ua = new UAParser()
  const meta = ua.getResult()

  return {
    browser: {
      name: meta.browser.name || 'unknown',
      version: meta.browser.version || 'unknown',
    },
    os: {
      name: meta.os.name || 'unknown',
      version: meta.os.version || 'unknown',
    },
    device: {
      type: meta.device.type || 'desktop',
      model: meta.device.model || 'unknown',
    },
    userAgent: navigator.userAgent,
    screen: {
      w: window.screen.width,
      h: window.screen.height,
      dpr: window.devicePixelRatio,
    },
    locale: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer,
    pageUrl: globalThis.location.href,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    platform: navigator.platform || 'unknown',
    clientTime: new Date().toISOString(),
  }
}

function formatScreamingSnakeCase(name: string): string {
  return name
    .replaceAll(/\s*([A-Z])/g, '_$1')
    .replaceAll(/\s+/g, '_')
    .toUpperCase()
}

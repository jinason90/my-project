export function formatNumber(value: number | string | null | undefined): string {
  const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value
  if (num === null || num === undefined || isNaN(num as number)) return '-'
  return new Intl.NumberFormat('ko-KR').format(num as number)
}

export function formatDelta(value: number): string {
  if (value === 0) return '0'
  const formatted = formatNumber(Math.abs(value))
  return value > 0 ? `+${formatted}` : `-${formatted}`
}

export function getDeltaDirection(value: number): 'up' | 'down' | 'neutral' {
  if (value > 0) return 'up'
  if (value < 0) return 'down'
  return 'neutral'
}

export type Channel = '블로그' | '홈페이지' | '쇼핑몰' | '광고'

export const CHANNEL_COLORS: Record<Channel, string> = {
  블로그:  '#1D6FEB',
  홈페이지: '#00C49F',
  쇼핑몰:  '#FF6B35',
  광고:    '#E31837',
}

export const CHANNEL_COLOR_FALLBACK = '#94A3B8'

export function getChannelColor(channel: string): string {
  return CHANNEL_COLORS[channel as Channel] ?? CHANNEL_COLOR_FALLBACK
}

export const CHANNEL_ORDER: Channel[] = ['블로그', '홈페이지', '쇼핑몰', '광고']

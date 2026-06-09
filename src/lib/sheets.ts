import { google } from 'googleapis'

// ─── 타입 정의 ────────────────────────────────────────────────

export interface BlogRow {
  주차: string; 조회수: number; 방문수: number; 조회수증감: number; 방문수증감: number; 코멘트: string
}
export interface HomepageRow {
  주차: string; 조회수: number; 방문수: number; 조회수증감: number; 방문수증감: number; 코멘트: string
}
export interface ShoppingRow {
  주차: string; 방문수: number; 방문수증감: number; 페이지뷰: number; 페이지뷰증감: number; 코멘트: string
}
export interface AdRow {
  주차: string; 노출수: number; 노출수증감: number; 클릭수: number; 클릭수증감: number; 코멘트: string
}
export interface PopularPostRow {
  주차: string; 순위: number; 제목: string; 조회수: number
}
export interface TrafficSourceRow {
  주차: string; 채널명: string; 비중: number
}
export interface CsStatRow {
  견적: number; AS: number; 기타: number; 제품문의: number; 총건수: number
}
export interface CsDetailRow {
  NO: number; 날짜: string; 구분: string; 접수경로: string; 회사명: string
  요청내용: string; 처리내용: string; 처리현황: string
}
export interface ActionPlanRow {
  주차: string; 내용: string; 담당: string; 마감: string; 상태: string
}
export interface IssueRow {
  주차: string; 구분: string; 내용: string
}
export interface NewsRow {
  날짜: string; 제목: string; 핵심내용: string; 출처: string; 카테고리: string; 링크: string
}

// ─── 인증 ─────────────────────────────────────────────────────

function getAuthClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
    throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL 환경변수가 없습니다.')
  if (!privateKey)
    throw new Error('GOOGLE_PRIVATE_KEY 환경변수가 없습니다.')
  return new google.auth.GoogleAuth({
    credentials: { client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, private_key: privateKey },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
}

function getSheetsClient() {
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) throw new Error('GOOGLE_SHEET_ID 환경변수가 없습니다.')
  return { sheets: google.sheets({ version: 'v4', auth: getAuthClient() }), sheetId }
}

// ─── 유틸 ─────────────────────────────────────────────────────

function n(value: unknown): number {
  if (value === null || value === undefined || value === '') return 0
  const str = String(value).replace(/,/g, '').replace(/%/g, '').trim()
  if (/^\d{1,4}[\/\-]\d{1,2}([\/\-]\d{1,4})?$/.test(str)) return 0
  const parsed = Number(str)
  return isNaN(parsed) ? 0 : Math.round(parsed)
}
function s(value: unknown): string {
  return String(value ?? '').trim()
}

// ─── 헤더 기반 fetch ──────────────────────────────────────────

async function fetchSheetWithHeaders(tabName: string): Promise<{
  headers: string[]
  rows: Record<string, string>[]
}> {
  const { sheets, sheetId } = getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: tabName,
  })
  const all = res.data.values ?? []
  if (all.length < 2) return { headers: [], rows: [] }

  const headers = (all[0] as string[]).map((h) => s(h))
  const rows: Record<string, string>[] = []

  for (let i = 1; i < all.length; i++) {
    const raw = all[i] as string[]
    if (raw.every((c) => !s(c))) continue
    const obj: Record<string, string> = {}
    headers.forEach((h, idx) => { obj[h] = s(raw[idx] ?? '') })
    rows.push(obj)
  }
  return { headers, rows }
}

// ─── 탭별 데이터 함수 ─────────────────────────────────────────

export async function getBlogData(): Promise<BlogRow[]> {
  const { rows } = await fetchSheetWithHeaders('블로그')
  return rows.map((r) => ({
    주차: r['주차'] ?? '', 조회수: n(r['조회수']), 방문수: n(r['방문수']),
    조회수증감: n(r['조회수증감']), 방문수증감: n(r['방문수증감']),
    코멘트: r['코멘트'] ?? '',
  })).filter((r) => r.주차)
}

export async function getHomepageData(): Promise<HomepageRow[]> {
  const { rows } = await fetchSheetWithHeaders('홈페이지')
  return rows.map((r) => ({
    주차: r['주차'] ?? '', 조회수: n(r['조회수']), 방문수: n(r['방문수']),
    조회수증감: n(r['조회수증감']), 방문수증감: n(r['방문수증감']),
    코멘트: r['코멘트'] ?? '',
  })).filter((r) => r.주차)
}

export async function getShoppingData(): Promise<ShoppingRow[]> {
  const { rows } = await fetchSheetWithHeaders('쇼핑몰')
  return rows.map((r) => ({
    주차: r['주차'] ?? '', 방문수: n(r['방문수']), 방문수증감: n(r['방문수증감']),
    페이지뷰: n(r['페이지뷰']), 페이지뷰증감: n(r['페이지뷰증감']),
    코멘트: r['코멘트'] ?? '',
  })).filter((r) => r.주차)
}

export async function getAdData(): Promise<AdRow[]> {
  const { rows } = await fetchSheetWithHeaders('광고')
  return rows.map((r) => ({
    주차: r['주차'] ?? '', 노출수: n(r['노출수']), 노출수증감: n(r['노출수증감']),
    클릭수: n(r['클릭수']), 클릭수증감: n(r['클릭수증감']),
    코멘트: r['코멘트'] ?? '',
  })).filter((r) => r.주차)
}

export async function getPopularPostData(): Promise<PopularPostRow[]> {
  const { rows } = await fetchSheetWithHeaders('인기포스트')
  return rows.map((r) => ({
    주차: r['주차'] ?? '', 순위: n(r['순위']),
    제목: r['제목'] ?? '', 조회수: n(r['조회수']),
  })).filter((r) => r.주차)
}

export async function getTrafficSourceData(): Promise<TrafficSourceRow[]> {
  const { rows } = await fetchSheetWithHeaders('유입채널')
  return rows.map((r) => ({
    주차: r['주차'] ?? '', 채널명: r['채널명'] ?? '', 비중: n(r['비중']),
  })).filter((r) => r.주차)
}

// CS상세 탭 raw 데이터
export async function getCsDetailData(): Promise<CsDetailRow[]> {
  const { rows } = await fetchSheetWithHeaders('CS상세')
  return rows.map((r) => ({
    NO: n(r['NO']),
    날짜: r['날짜'] ?? '',
    구분: r['구분'] ?? '',
    접수경로: r['접수경로'] ?? '',
    회사명: r['회사명'] ?? '',
    요청내용: r['요청내용'] ?? '',
    처리내용: r['처리내용'] ?? '',
    처리현황: r['처리현황'] ?? '',
  }))
}

// CS상세 → 구분 컬럼 기준 건수 집계 (순수 함수, API 호출 없음)
export function calcCsStat(details: CsDetailRow[]): CsStatRow {
  const stat: CsStatRow = { 견적: 0, AS: 0, 기타: 0, 제품문의: 0, 총건수: details.length }
  for (const row of details) {
    const g = row.구분
    if (g === '견적문의')      stat.견적++
    else if (g === 'A/S 문의') stat.AS++
    else if (g === '기타문의')  stat.기타++
    else if (g === '제품문의')  stat.제품문의++
  }
  return stat
}

export async function getActionPlanData(): Promise<ActionPlanRow[]> {
  const { rows } = await fetchSheetWithHeaders('액션플랜')
  return rows.map((r) => ({
    주차: r['주차'] ?? '', 내용: r['내용'] ?? '',
    담당: r['담당'] ?? '', 마감: r['마감'] ?? '', 상태: r['상태'] ?? '',
  })).filter((r) => r.주차)
}

export async function getIssueData(): Promise<IssueRow[]> {
  const { rows } = await fetchSheetWithHeaders('이슈')
  return rows.map((r) => ({
    주차: r['주차'] ?? '', 구분: r['구분'] ?? '', 내용: r['내용'] ?? '',
  })).filter((r) => r.주차)
}

export async function getNewsData(): Promise<NewsRow[]> {
  const { rows } = await fetchSheetWithHeaders('뉴스')
  return rows.map((r) => ({
    날짜: r['날짜'] ?? '', 제목: r['제목'] ?? '', 핵심내용: r['핵심내용'] ?? '',
    출처: r['출처'] ?? '', 카테고리: r['카테고리'] ?? '', 링크: r['링크'] ?? '',
  })).filter((r) => r.날짜 || r.제목)
}

// ─── 코멘트 (각 채널 탭 내 코멘트 컬럼) ─────────────────────
export interface CommentRow {
  주차: string; 코멘트: string
}

// 특정 탭에서 코멘트 컬럼만 추출
export async function getCommentData(tabName: string): Promise<CommentRow[]> {
  const { rows } = await fetchSheetWithHeaders(tabName)
  return rows
    .filter((r) => r['코멘트'])
    .map((r) => ({ 주차: r['주차'] ?? '', 코멘트: r['코멘트'] ?? '' }))
}

// ─── 인기상품 ─────────────────────────────────────────────────
export interface PopularProductRow {
  주차: string; 순위: number; 상품명: string; 조회수: number
}

export async function getPopularProductData(): Promise<PopularProductRow[]> {
  const { rows } = await fetchSheetWithHeaders('인기상품')
  return rows.map((r) => ({
    주차: r['주차'] ?? '',
    순위: n(r['순위']),
    상품명: r['상품명'] ?? '',
    조회수: n(r['조회수']),
  })).filter((r) => r.주차)
}

// ─── 전체 주차 목록 (특정 탭 기준으로 추출) ──────────────────
export async function getAllWeeks(tabName: string): Promise<string[]> {
  const { rows } = await fetchSheetWithHeaders(tabName)
  const weeks = rows
    .map((r) => r['주차'] ?? '')
    .filter(Boolean)
  return [...new Set(weeks)] // 중복 제거, 시트 순서 유지
}

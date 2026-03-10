import { useSyncExternalStore } from 'react'

export function useSearch() {
  return useSyncExternalStore(
    subscribeSearch,
    getSearchSnapshot,
    getServerSearchSnapshot
  )
}

function getSearchSnapshot() {
  return window.location.search
}

function getServerSearchSnapshot() {
  return ''
}

function subscribeSearch(onStoreChange: () => void) {
  // popstate만 구독. pushState/replaceState 패치 없이 뒤로가기 시 search 변경 감지.
  window.addEventListener('popstate', onStoreChange)
  return () => window.removeEventListener('popstate', onStoreChange)
}

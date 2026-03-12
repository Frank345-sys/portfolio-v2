import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from '../hooks/useTheme'

const STORAGE_KEY = 'theme'

describe('useTheme', () => {
  const mockMatchMedia = vi.fn()
  const mockAddEventListener = vi.fn()
  const mockRemoveEventListener = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('matchMedia', mockMatchMedia)
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    })

    const storage: Record<string, string> = {}
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => storage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        storage[key] = value
      }),
      removeItem: vi.fn(),
      clear: vi.fn(() => {
        Object.keys(storage).forEach((k) => delete storage[k])
      }),
      length: 0,
      key: vi.fn(),
    })

    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('retorna isDark y setTheme', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.isDark).toBeDefined()
    expect(typeof result.current.setTheme).toBe('function')
  })

  it('inicializa en light cuando no hay tema guardado y el sistema es light', () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    })

    const { result } = renderHook(() => useTheme())

    expect(result.current.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('inicializa en dark cuando localStorage tiene "dark"', () => {
    localStorage.setItem(STORAGE_KEY, 'dark')

    const { result } = renderHook(() => useTheme())

    expect(result.current.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('inicializa en light cuando localStorage tiene "light"', () => {
    localStorage.setItem(STORAGE_KEY, 'light')

    const { result } = renderHook(() => useTheme())

    expect(result.current.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('setTheme("dark") actualiza isDark, aplica clase y persiste en localStorage', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('dark')
    })

    expect(result.current.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, 'dark')
  })

  it('setTheme("light") actualiza isDark a false, quita clase y persiste', () => {
    localStorage.setItem(STORAGE_KEY, 'dark')
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('light')
    })

    expect(result.current.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, 'light')
  })

  it('no lanza al desmontar', () => {
    const { unmount } = renderHook(() => useTheme())
    expect(() => unmount()).not.toThrow()
  })
})

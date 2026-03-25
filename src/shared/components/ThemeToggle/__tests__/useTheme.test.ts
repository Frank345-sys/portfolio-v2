import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from '../hooks/useTheme'

const STORAGE_KEY = 'theme'

describe('useTheme', () => {
  const mockMatchMedia = vi.fn()
  const mockAddEventListener = vi.fn()
  const mockRemoveEventListener = vi.fn()

  beforeEach(() => {
    mockAddEventListener.mockReset()
    mockRemoveEventListener.mockReset()
    mockMatchMedia.mockReset()

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

    document.documentElement.classList.remove('dark', 'theme-transitioning')
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

  /**
   * El primer `useEffect` persiste el tema antes de que el segundo lea
   * `getStoredTheme()`. Para ejercitar el listener de `prefers-color-scheme`
   * (líneas 51–60) sin tocar el hook, usamos un `localStorage` donde
   * `setItem(STORAGE_KEY, …)` no escribe en el almacén interno.
   */
  describe('listener prefers-color-scheme (persistencia de theme desactivada en tests)', () => {
    beforeEach(() => {
      mockAddEventListener.mockReset()
      mockRemoveEventListener.mockReset()

      const storage: Record<string, string> = {}
      vi.stubGlobal('localStorage', {
        getItem: vi.fn((key: string) => storage[key] ?? null),
        setItem: vi.fn((key: string, value: string) => {
          if (key !== STORAGE_KEY) storage[key] = value
        }),
        removeItem: vi.fn(),
        clear: vi.fn(() => {
          Object.keys(storage).forEach((k) => delete storage[k])
        }),
        length: 0,
        key: vi.fn(),
      })

      vi.stubGlobal('matchMedia', mockMatchMedia)
      mockMatchMedia.mockReturnValue({
        matches: false,
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      })

      document.documentElement.classList.remove('dark', 'theme-transitioning')
    })

    it('sin tema legible en storage registra listener change en matchMedia', () => {
      renderHook(() => useTheme())

      expect(mockAddEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      )
    })

    it('con tema ya presente en storage no registra listener de prefers-color-scheme', () => {
      const storage: Record<string, string> = { [STORAGE_KEY]: 'light' }
      vi.stubGlobal('localStorage', {
        getItem: vi.fn((key: string) => storage[key] ?? null),
        setItem: vi.fn((key: string, value: string) => {
          if (key !== STORAGE_KEY) storage[key] = value
        }),
        removeItem: vi.fn(),
        clear: vi.fn(),
        length: 0,
        key: vi.fn(),
      })

      mockAddEventListener.mockClear()
      renderHook(() => useTheme())

      expect(mockAddEventListener).not.toHaveBeenCalled()
    })

    it('sin tema en storage y OS en dark inicializa en dark', () => {
      mockMatchMedia.mockReturnValue({
        matches: true,
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      })

      const { result } = renderHook(() => useTheme())

      expect(result.current.isDark).toBe(true)
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('cambio de prefers-color-scheme actualiza el tema mientras no hay tema en storage', () => {
      let onChange: (e: { matches: boolean }) => void = () => {}
      mockAddEventListener.mockImplementation((event, handler) => {
        if (event === 'change') {
          onChange = handler as (e: { matches: boolean }) => void
        }
      })

      mockMatchMedia.mockReturnValue({
        matches: false,
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      })

      const { result } = renderHook(() => useTheme())

      expect(result.current.isDark).toBe(false)

      act(() => {
        onChange({ matches: true })
      })

      expect(result.current.isDark).toBe(true)
      expect(document.documentElement.classList.contains('dark')).toBe(true)

      act(() => {
        onChange({ matches: false })
      })

      expect(result.current.isDark).toBe(false)
    })

    it('al desmontar elimina el listener change de matchMedia', () => {
      const { unmount } = renderHook(() => useTheme())

      const handler = mockAddEventListener.mock.calls.find(
        ([evt]) => evt === 'change'
      )?.[1]

      expect(handler).toBeDefined()
      unmount()

      expect(mockRemoveEventListener).toHaveBeenCalledWith('change', handler)
    })
  })
})

import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithMotion } from '@/test/renderWithMotion'
import { AboutHero } from '../subcomponents/AboutHero'

const IOReserve = globalThis.IntersectionObserver

vi.mock('../constants', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../constants')>()
  return {
    ...actual,
    ABOUT_HERO: {
      ...actual.ABOUT_HERO,
      avatarPhotoSrc: 'https://invalid.example.test/avatar-404.png',
    },
  }
})

describe('AboutHero — fallback de foto de avatar', () => {
  beforeEach(() => {
    globalThis.IntersectionObserver = class {
      disconnect() {}
      observe() {}
      takeRecords() {
        return []
      }
      unobserve() {}
    } as unknown as typeof IntersectionObserver
  })

  afterEach(() => {
    globalThis.IntersectionObserver = IOReserve
  })

  it('si la imagen falla, oculta el img y deja visibles las iniciales', () => {
    renderWithMotion(<AboutHero />)

    const avatar = screen.getByRole('img', {
      name: /avatar de frank gonzález/i,
    })
    const img = avatar.querySelector('img')
    expect(img).toBeTruthy()

    fireEvent.error(img!)

    expect(img).toHaveStyle({ display: 'none' })
    const initials = screen.getByText('FG')
    expect(initials).not.toHaveAttribute('hidden')
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AboutBio } from '../subcomponents/AboutBio'

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

describe('AboutBio — fallback de foto de avatar', () => {
  it('si la imagen falla, oculta el img y deja visibles las iniciales', () => {
    render(<AboutBio />)

    const img = screen.getByAltText(/foto de frank gonzález/i)
    expect(img).toBeInTheDocument()

    fireEvent.error(img)

    expect(img).toHaveStyle({ display: 'none' })
    const initials = screen.getByText('FG')
    expect(initials).not.toHaveAttribute('hidden')
  })
})

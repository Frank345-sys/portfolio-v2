import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar } from '../Avatar'

describe('Avatar', () => {
  it('muestra iniciales y aria-label cuando no hay imagen', () => {
    render(<Avatar initials="AB" name="Ada Beta" />)

    expect(
      screen.getByRole('img', { name: /avatar de ada beta/i })
    ).toBeInTheDocument()
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('renderiza imagen cuando hay src', () => {
    const { container } = render(
      <Avatar initials="AB" name="Ada Beta" src="https://example.com/a.png" />
    )

    const avatar = screen.getByRole('img', { name: /avatar de ada beta/i })
    expect(avatar).toBeInTheDocument()
    const photo = container.querySelector('img')
    expect(photo).toHaveAttribute('src', 'https://example.com/a.png')
  })
})

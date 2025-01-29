import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './Home'
import { MemoryRouter } from 'react-router-dom'

describe("Home page test", () => {
  test("Should show Home page", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(screen.getByText(/Brendan/i)).toBeInTheDocument()
  })
})
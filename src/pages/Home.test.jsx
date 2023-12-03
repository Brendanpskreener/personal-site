import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './Home'

describe("Home page test", () => {
  test("Should show Home page", () => {
    render(<Home />)
    expect(screen.getByText(/Brendan Schreiner/i)).toBeDefined()
  })
})
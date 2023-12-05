import { beforeEach, describe, expect, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import BarRoute from './BarRoute'

describe('BarFinder', () => {
  beforeEach(() => {
    render(<BarRoute />)
  })
  test('should always show header', () => {
    expect(screen.getByText('Bar Finder')).toBeInTheDocument()
  })
  test('should not show content initially', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Found no Bars')).not.toBeInTheDocument()
    expect(screen.queryByText('Filters')).not.toBeInTheDocument()
    expect(screen.queryByText('Next')).not.toBeInTheDocument()
  })
  test('should show content after rerender', async () => {
    expect(await screen.findByText('Filters')).toBeInTheDocument()
    expect(await screen.findByText('Next')).toBeInTheDocument()
  })
})
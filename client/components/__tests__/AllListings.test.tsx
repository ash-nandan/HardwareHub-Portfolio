import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AllListings from '../AllListings'
import * as api from '../../apis/listings'

// A simple mocked response from the API
const mockListings = [
  {
    listingId: 1,
    itemName: 'Gaming Laptop',
    startingPrice: 1200,
    itemImage: 'laptop.jpg',
  },
  {
    listingId: 2,
    itemName: 'Graphics Card',
    startingPrice: 950,
    itemImage: 'gpu.jpg',
  },
]

// Helper to wrap component in React Query + Router providers
function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient()
  return render(
    <BrowserRouter>
      <QueryClientProvider client={client}>{ui}</QueryClientProvider>
    </BrowserRouter>,
  )
}

describe('AllListings', () => {
  it('renders listings returned by API', async () => {
    // Mock the API call to return our fake listings
    vi.spyOn(api, 'getAllListings').mockResolvedValue(mockListings)

    renderWithClient(<AllListings />)

    // Shows loading first
    expect(screen.getByText(/loading/i)).toBeTruthy()

    // Wait for the listings to appear
    await waitFor(() => {
      expect(screen.getByText('Gaming Laptop')).toBeTruthy()
      expect(screen.getByText('Graphics Card')).toBeTruthy()
    })
  })
})

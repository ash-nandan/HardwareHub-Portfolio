/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @vitest-environment jsdom
 */

import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest'

const mockLogout = vi.fn()

//mock useauth
vi.mock('../hooks/authHooks', () => ({
  __esModule: true,
  useAuth: () => ({
    dbUserId: 1,
    getUserId: () => 1,
    isAuthenticated: true,
    isLoading: false,
    user: { sub: 'auth|123', email: 'testing@example.com' },
    logout: mockLogout,
    loginWithRedirect: vi.fn(),
    isOwner: () => true,
    login: vi.fn(),
  }),
}))

//mock auth0 hook
vi.mock('@auth0/auth0-react', () => ({
  __esModule: true,
  useAth0: () => ({
    isAuthenticated: true,
    user: { sub: 'auth0|123', email: 'testing@example.com' },
    logout: mockLogout,
  }),
}))

const originalFetch = global.fetch

describe('ProfilePage', () => {
  const mockProfile = {
    id: 1,
    username: 'nandan05.ash',
    first_name: 'Ash',
    last_name: 'Nandan',
    email: 'ash@example.com',
    phone: '123456789',
    address_one: '123 Test Street',
    address_two: '',
    town_city: 'Auckland',
    postcode: '1010',
    image_url: null,
    user_id: 1,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    global.fetch = originalFetch as any
    ;(console.error as unknown as vi.Mock).MockRestore?.()
  })

  test('renders loading state infinity', async () => {
    global.fetch = vi.fn(() => new Promise(() => {})) as any

    const { default: ProfilePage } = await import('../components/Profile')

    render(<ProfilePage />)
    expect(screen.getByText(/loading profile/i)).toBeInTheDocument()
  })

  test('loads and displays profile data', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProfile),
      }),
    ) as any

    const { default: ProfilePage } = await import('../components/Profile')
    render(<ProfilePage />)

    expect(await screen.findByText(/My Profile/i)).toBeInTheDocument()
    expect(await screen.findByText(/Ash Nandan/i)).toBeInTheDocument()
    expect(await screen.findByText(/Email Address/i)).toBeInTheDocument()
  })

  test('clicking Edit toggles EditProfileForm', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProfile),
    }) as any

    const { default: ProfilePage } = await import('../components/Profile')
    render(<ProfilePage />)
    await screen.findByText(/Personal Details/i)

    const editButton = screen.getByText(/Edit Profile/i)
    fireEvent.click(editButton)

    await screen.findByRole('heading', { name: /Edit Profile/i })
    expect(screen.queryByText(/Personal Details/i)).not.toBeInTheDocument()
  })

  test('delete profile sends DELETE request and returns to loading state', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProfile),
      })
      .mockResolvedValueOnce({
        ok: true,
      } as any)

    global.fetch = fetchMock as any
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)
    const { default: ProfilePage } = await import('../components/Profile')
    render(<ProfilePage />)

    await screen.findByText(/Personal Details/i)

    const deleteButton = screen.getByText(/Delete Profile/i)
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/v1/profile/1',
        expect.objectContaining({
          method: 'DELETE',
        }),
      )
    })

    expect(screen.getByText(/Loading profile.../i)).toBeInTheDocument()

    confirmSpy.mockRestore()
  })
})

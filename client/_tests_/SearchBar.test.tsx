import { screen } from '@testing-library/react'
import { setupApp } from './setup'
import nock from 'nock'
import { describe, it, expect } from 'vitest'

describe('Search listings', () => {
  it('select forms should load, typed keyword only should keep search disabled', async () => {
    const fakeCategory = [{ id: 1, name: 'CPU' }]
    const fakeCondition = [{ id: 1, description: 'Used' }]

    nock('http://localhost').get('/api/v1/categories').reply(200, fakeCategory)

    nock('http://localhost').get('/api/v1/conditions').reply(200, fakeCondition)

    const { user } = setupApp('/')

    const keywordsInput = await screen.findByPlaceholderText('Keywords')

    const searchButton = screen.getByRole('button', {
      name: /search listings/i,
    })

    expect(searchButton).toBeDisabled()

    await user.type(keywordsInput, 'intel')
    expect(searchButton).toBeDisabled()
  })
})

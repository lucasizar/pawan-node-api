import req from 'supertest'
import server from '../src/app'

test('[GET] /', async () => {
  const res = await req(server).get('/')
  expect(res.text).toBe('Hello World!')
})
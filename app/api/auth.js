import { api } from '@/utils/axios'

export const authRegister = async data => {
  const response = await api.post('/auth/register', data)
  return response.data
}

export const authLogin = async data => {
  const response = await api.post('/auth/login', data)

  return response.data
}

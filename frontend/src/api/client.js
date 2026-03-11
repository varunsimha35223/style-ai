import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function analyzeStyle({ photo1, photo2, photo3, occasions, budget, colorPreference }) {
  const form = new FormData()
  form.append('photo1', photo1)
  form.append('photo2', photo2)
  form.append('photo3', photo3)
  form.append('occasions', occasions)
  form.append('budget', budget)
  form.append('color_preference', colorPreference)

  const { data } = await axios.post(`${API_URL}/analyze`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000,
  })

  return data
}

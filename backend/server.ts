import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import leadsRouter from './routes/leads.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: CORS_ORIGIN }))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/leads', leadsRouter)

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`)
  if (!process.env.N8N_WEBHOOK_URL) {
    console.warn('⚠️  N8N_WEBHOOK_URL is not set — copy backend/.env.example to backend/.env and fill it in.')
  }
})

import express, { type Request, type Response } from 'express'

const router = express.Router()

interface LeadRequestBody {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  careType?: string
  moveInTimeline?: string
  tourDate?: string
  tourTime?: string
  message?: string
}

router.post('/', async (req: Request<{}, {}, LeadRequestBody>, res: Response) => {
  const { firstName, lastName, email, phone, careType, moveInTimeline, tourDate, tourTime, message } = req.body

  if (!firstName || !lastName || !email || !phone || !careType || !moveInTimeline || !tourDate || !tourTime) {
    return res.status(400).json({
      error: 'firstName, lastName, email, phone, careType, moveInTimeline, tourDate, and tourTime are required.'
    })
  }

  if (message && message.length > 1000) {
    return res.status(400).json({ error: 'message must be 1000 characters or fewer.' })
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL

  if (!webhookUrl) {
    console.error('N8N_WEBHOOK_URL is not set in backend/.env')
    return res.status(500).json({ error: 'Server is not configured to forward leads yet.' })
  }

  const payload = {
    name: `${firstName} ${lastName}`.trim(),
    firstName,
    lastName,
    email,
    phone,
    careType,
    moveInTimeline,
    tourDate,
    tourTime,
    message: message || 'N/A',
    leadSource: 'Contact Form',
    timestamp: new Date().toISOString()
  }

  try {
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!n8nResponse.ok) {
      const text = await n8nResponse.text()
      console.error('n8n webhook responded with an error:', n8nResponse.status, text)
      return res.status(502).json({ error: 'Lead received but forwarding to automation failed.' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Failed to reach n8n webhook:', err)
    return res.status(502).json({ error: 'Lead received but forwarding to automation failed.' })
  }
})

export default router

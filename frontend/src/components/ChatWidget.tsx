import { useEffect } from 'react'
import { createChat } from '@n8n/chat'
import '@n8n/chat/dist/style.css'

const CHAT_WEBHOOK_URL = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL

export default function ChatWidget() {
  useEffect(() => {
    if (!CHAT_WEBHOOK_URL) {
      console.warn('VITE_N8N_CHAT_WEBHOOK_URL is not set; chat widget disabled.')
      return
    }

    createChat({
      webhookUrl: CHAT_WEBHOOK_URL,
      mode: 'window',
      showWelcomeScreen: false,
      loadPreviousSession: true,
      initialMessages: [
        'Hi there! 👋 I can answer questions about our community and help connect you with our care team.',
      ],
    })
  }, [])

  return null
}

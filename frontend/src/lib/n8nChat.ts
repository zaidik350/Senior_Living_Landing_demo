const SESSION_KEY = 'n8n-chat/sessionId'

export type ChatSender = 'user' | 'bot'

export interface ChatMessage {
  id: string
  text: string
  sender: ChatSender
  choices?: string[]
}

export interface BotReply {
  text: string
  choices?: string[]
}

export const CARE_TYPE_CHOICES = [
  'Independent Living',
  'Assisted Living',
  'Memory Care',
  'Other'
] as const

export const MOVE_IN_CHOICES = [
  'Immediately',
  'Within a month',
  '1-3 months'
] as const

export function detectMessageChoices(text: string): string[] | undefined {
  const normalized = text.toLowerCase()

  const asksCareType =
    /\b(what|which)\b[\s\S]{0,80}\b(care type|type of care|level of care|kind of care)\b/i.test(
      text
    ) ||
    /\b(care type|type of care)\b[\s\S]{0,40}\?/i.test(text) ||
    /\bwhich (care option|level of care)\b/i.test(normalized)

  if (asksCareType) {
    return [...CARE_TYPE_CHOICES]
  }

  const asksMoveIn =
    /\b(when|how soon)\b[\s\S]{0,80}\b(move in|move-in|moving)\b/i.test(text) ||
    /\b(move[- ]?in)\b[\s\S]{0,40}\b(timeline|when|timeframe)\b/i.test(normalized) ||
    /\bwhen (would|do) you (plan|want|need|like) to move\b/i.test(normalized)

  if (asksMoveIn) {
    return [...MOVE_IN_CHOICES]
  }

  return undefined
}

export function createMessageId(): string {
  return crypto.randomUUID()
}

export function getOrCreateSessionId(): string {
  const existing = localStorage.getItem(SESSION_KEY)
  if (existing) return existing

  const id = crypto.randomUUID()
  localStorage.setItem(SESSION_KEY, id)
  return id
}

function parseChoices(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined

  const choices = value.filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0
  )
  return choices.length > 0 ? choices : undefined
}

export function parseBotResponse(data: unknown): BotReply {
  if (data == null) return { text: '' }
  if (typeof data === 'string') {
    return { text: data, choices: detectMessageChoices(data) }
  }

  if (typeof data !== 'object') {
    const text = String(data)
    return { text, choices: detectMessageChoices(text) }
  }

  const record = data as Record<string, unknown>
  let text = record.output ?? record.text ?? record.message ?? ''
  const explicitChoices = parseChoices(record.choices)

  if (typeof text === 'object' && text !== null) {
    const content = text as { type?: string; text?: string; choices?: unknown }
    if (content.type === 'text' && typeof content.text === 'string') {
      text = content.text
    }
    const nestedChoices = parseChoices(content.choices)
    if (nestedChoices) {
      return { text: typeof text === 'string' ? text : '', choices: nestedChoices }
    }
  }

  if (typeof text === 'string' && text.trim()) {
    return {
      text,
      choices: explicitChoices ?? detectMessageChoices(text)
    }
  }

  if (Object.keys(record).length > 0) {
    try {
      const fallback = JSON.stringify(record, null, 2)
      return { text: fallback, choices: explicitChoices }
    } catch {
      return { text: '', choices: explicitChoices }
    }
  }

  return { text: '', choices: explicitChoices }
}

export async function loadPreviousSession(
  webhookUrl: string,
  sessionId: string
): Promise<ChatMessage[]> {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'loadPreviousSession',
      sessionId
    })
  })

  if (!response.ok) {
    throw new Error('Failed to load previous session')
  }

  const payload = await response.json()
  const history = Array.isArray(payload?.data) ? payload.data : []

  return history.map((entry: { id?: string; kwargs?: { content?: string } }) => ({
    id: createMessageId(),
    text: entry.kwargs?.content ?? '',
    sender: entry.id?.includes('HumanMessage') ? 'user' : 'bot'
  }))
}

export async function sendChatMessage(
  webhookUrl: string,
  sessionId: string,
  text: string
): Promise<BotReply> {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/plain'
    },
    body: JSON.stringify({
      action: 'sendMessage',
      sessionId,
      chatInput: text
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'Failed to send message')
  }

  const payload = await response.json()
  return parseBotResponse(payload)
}

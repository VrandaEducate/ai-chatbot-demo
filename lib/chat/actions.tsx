import 'server-only'

import {
  createAI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import {openai} from '@ai-sdk/openai'

import {
  BotCard,
  BotMessage,
  SystemMessage,
} from '@/components/stocks'

import {
  nanoid
} from '@/lib/utils'
import {UserMessage} from '@/components/stocks/message'
import {Chat, Message} from '@/lib/types'
// import {auth} from '@/auth'


async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  console.log("content", content);

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode
  let NanID = nanoid();

  const result = await streamUI({
    model: openai('gpt-4o-mini'),
    system: `\


  "instructions": "You are an assistant designed to ask questions and provide options. Every response must be in JSON format and include three keys: 'questions', 'options', and 'question_type'. The 'question_type' should be one of the following types chosen randomly: 'MCQ', 'subjective', 'checklist'",
  "example": {
    "questions": "What is the capital of France?",
    "options": ["Paris", "London", "Berlin", "Madrid"],
    "question_type": "MCQ"
  }
}

 
### Example Outputs
 
#### MCQ

{
  "questions": "What is the capital of France?",
  "options": ["Paris", "London", "Berlin", "Madrid"],
  "question_type": "MCQ"
}

 
#### Subjective

{
  "questions": "Explain the process of photosynthesis.",
  "options": [],
  "question_type": "subjective"
}

 
#### Checklist

{
  "questions": "Which of the following are programming languages?",
  "options": ["Python", "HTML", "CSS", "JavaScript"],
  "question_type": "checklist"
}



\`\`\`
 `,

    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({content, done, delta}) => {

      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage MID={NanID} content={textStream.value}/>
      }

      if (done) {
        textStream.update(content)
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: NanID,
              role: 'assistant',
              content
            }
          ]
        })
      }
      // } else {
      //     textStream.update(delta)
      // }

      // console.log(aiState.get());

      return textNode
    }
  })
  console.log("result");

  return {
    id: NanID,
    display: result.value
  }
}

export type AIState = {
  threadId: string
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode | string
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: {threadId: nanoid(), chatId: nanoid(), messages: []},
  onGetUIState: async () => {
    'use server'

    // const session = await auth()

    // if (session && session.user) {
    const aiState = getAIState() as Chat
    // console.log("getUI", aiState);


    if (aiState) {
      const uiState = getUIStateFromAIState(aiState)
      return uiState
    }
    // } else {
    //     return
    // }
  },
  onSetAIState: async ({state}) => {
    'use server'

    // const session = await auth()

    // if (session && session.user) {
    console.log("state", state);
    const {threadId, chatId, messages} = state

    const createdAt = new Date()
    // const userId = session.user.id as string
    // const path = `/chat/${chatId}`

    const firstMessageContent = messages[0].content as string
    const title = firstMessageContent.substring(0, 100)

    const chat: Chat = {
      id: threadId,
      title,
      // userId,
      createdAt,
      messages,
      // path
    }
    //
    // } else {
    //     return
    // }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  console.log("getUIState", aiState);
  return aiState.messages
      .filter(message => message.role !== 'system')
      .map((message, index) => ({
        id: `${aiState.chatId}-${index}`,
        display:
            message.role === 'tool' ? (
                message.content.map(tool => {
                  return <></>
                })
            ) : message.role === 'user' ? (
                <UserMessage>{message.content as string}</UserMessage>
            ) : message.role === 'assistant' &&
            typeof message.content === 'string' ? (
                <BotMessage MID={message.id} content={message.content}/>
            ) : null
      }))
}
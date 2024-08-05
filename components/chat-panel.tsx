import * as React from 'react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import {UserMessage} from "@/components/stocks/message";
import {nanoid} from "nanoid";


export interface ChatPanelProps {
  id?: string
  title?: string
  input: any
  setInput: any
  isAtBottom: boolean
  scrollToBottom: () => void
  submitMessage: any
  messages: any
  setThreadId: any
  handleInputChange: any
  setMessages: any
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
    submitMessage,
    messages,
    setThreadId,
                            handleInputChange,
                            setMessages
}: ChatPanelProps) {
  console.log("ChatPanel");
  // const [aiState] = useAIState()
  // const {messages, input, setInput} = useAssistant({api: '/api/assistant'})
  // const [messages, setMessages] = useUIState<typeof AI>()
  // const { submitUserMessage } = useActions()
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  const exampleMessages = [
    {
      heading: 'What is trending',
      subheading: 'right now in IT?',
      message: `What is trending right now in IT?`
    },
    {
      heading: 'Tell me the recipe of',
      subheading: 'Maggie?',
      message: 'Tell me the recipe of Maggie dont ask any further question?'
    },
    {
      heading: 'I would like to watch',
      subheading: 'Movie',
      message: `Recommend a movie to watch`
    },
    {
      heading: 'Want to know about',
      subheading: `Technology`,
      message: `Want to know about Technology`
    }
  ]

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={async (e) => {
                  console.log("clickeddd", e)
                  e.preventDefault()
                  // setInput(example.message);
                  // e.target.innerText = example.message;
                  const newEvent = {
                    ...e,
                    target: {
                      ...e.target,
                      value: example.message,
                    },
                  };
                  handleInputChange(newEvent);
                  await  submitMessage(e, { data: { edit: "false" } })

                  // const responseMessage = await submitUserMessage(
                  //   example.message
                  // )
                  //
                  // setMessages(currentMessages => [
                  //   ...currentMessages,
                  //   responseMessage
                  // ])
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm input={input} setInput={setInput} submitMessage={submitMessage} setThreadId={setThreadId} />
        </div>
      </div>
    </div>
  )
}

import { Separator } from '@/components/ui/separator'
import { UIState } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import Link from 'next/link'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import {EditButton} from "@/app/EditButton";
import {BotMessage, UserMessage} from "@/components/stocks/message";
import {useAIState} from "ai/rsc";
import {AssisComponent} from "@/app/AssisComponent";

export interface ChatList {
  messages: any
  // session?: Session
  isShared: boolean
  submitMessage: any
  input: any
  setInput: any
  setEdit: any
  setMID: any
  threadId: any,
  setThreadId: any,
  setMessages: any,
  handleInputChange: any
}

export function ChatList({ messages, submitMessage, handleInputChange, input, setInput, setEdit , setMID, threadId, setThreadId, setMessages}: ChatList) {
  console.log("ChatList", messages);
  // const [aiStateClient] = useAIState();
  // console.log("asiStae", aiStateClient);

  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">

      {messages.map((message: any, index: any) => (
        <div  key={message.id}>
          { message.role === 'user' ? <UserMessage><div  id={`message-${message.id}`} className='bg-pink-50'>{message.content}</div></UserMessage> : <BotMessage handleInputChange={handleInputChange} submitMessage={submitMessage} content={message.content} MID={message.id} input={input} setInput={setInput} setEdit={setEdit} setMID={setMID} threadId={threadId} setThreadId={setThreadId} messages={messages} setMessages={setMessages} />}
          {index < messages.length - 1 && <Separator className="my-4" />}
          {/*<AssisComponent/>*/}
        </div>
      ))}
    </div>
  )
}

import { Separator } from '@/components/ui/separator'
import {BotMessage, SpinnerMessage, UserMessage} from "@/components/stocks/message";
// import {IconEdit, IconSpinner} from "@/components/ui/icons";


export interface ChatList {
  messages: any
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
  status: any
}

export function ChatList({ messages, submitMessage, status, handleInputChange, input, setInput, setEdit , setMID, threadId, setThreadId, setMessages}: ChatList) {
  console.log("ChatList", messages);

  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">

      {messages.map((message: any, index: any) => (
        <div  key={message.id}>
          { message.role === 'user' ? <UserMessage><div  id={`message-${message.id}`}>{message.content}</div></UserMessage> : <BotMessage handleInputChange={handleInputChange} submitMessage={submitMessage} content={message.content} MID={message.id} input={input} setInput={setInput} setEdit={setEdit} setMID={setMID} threadId={threadId} setThreadId={setThreadId} messages={messages} setMessages={setMessages} />}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
      {status === 'in_progress' && <SpinnerMessage/>}
    </div>
  )
}

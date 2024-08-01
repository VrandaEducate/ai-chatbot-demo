'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
// import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import {useAssistant} from "sahil_tes00";
import * as React from "react";

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  // session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, missingKeys }: ChatProps) {

  // const [input, setInput] = useState('')
  const [edit, setEdit] = useState("false");
  const [threadIdd, setThreadId] = useState(id);
  const [messId, setMID] = useState('');
  const {messages, submitMessage,  status, input, handleInputChange, setInput, threadId, setMessages} = useAssistant({api: '/api/assistant', threadId: threadIdd});

  console.log("chat", messages);


  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn('pb-[200px] pt-4 md:pt-10', className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList messages={messages} isShared={false} status={status} submitMessage={submitMessage} input={input} setInput={setInput} setEdit={setEdit} setMID={setMID} threadId={threadId} handleInputChange={handleInputChange} setThreadId={setThreadId} setMessages={setMessages} />
        ) : (
          <EmptyScreen />
        )}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        submitMessage={submitMessage}
        messages={messages}

      />
    </div>
  )
}

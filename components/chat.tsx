'use client'

import {cn} from '@/lib/utils'
import {ChatList} from '@/components/chat-list'
import {ChatPanel} from '@/components/chat-panel'
import {EmptyScreen} from '@/components/empty-screen'
import {useLocalStorage} from '@/lib/hooks/use-local-storage'
import {useEffect, useState} from 'react'
// import { useUIState, useAIState } from 'ai/rsc'
import {Message, Session} from '@/lib/types'
// import { usePathname, useRouter } from 'next/navigation'
import {useScrollAnchor} from '@/lib/hooks/use-scroll-anchor'
import {toast} from 'sonner'
import {useAssistant} from "sahil_tes00";
import * as React from "react";
import {CircularProgress} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string
    // session?: Session
    missingKeys: string[]
}

export function Chat({id, className, missingKeys}: ChatProps) {

    const [edit, setEdit] = useState("false");
    const [threadIdd, setThreadId] = useState(localStorage.getItem('threadId') || id);
    console.log("Sendd if local", localStorage.getItem('threadId'));
    console.log("send if threadIdd", threadIdd);
    const [messId, setMID] = useState('');
    const {
        messages,
        submitMessage,
        status,
        input,
        handleInputChange,
        setInput,
        threadId,
        setMessages
    } = useAssistant({api: '/api/assistant', threadId: localStorage.getItem('threadId') || threadIdd});
    const [isLoading, setIsLoading] = useState(false);
    console.log("return ThreadIdd", threadId);
    if (!localStorage.getItem('threadId') || (localStorage.getItem('isEdit') === "true" && localStorage.getItem('threadId') !== threadId)) {
        console.log("runn", threadId, threadIdd);
        threadId && localStorage.setItem('isEdit', "false");
        // debugger;
        threadId && localStorage.setItem('threadId', threadId);
    }

    const fetchMessages = async (receivedThreadId: any) => {
        if (receivedThreadId) {
            setIsLoading(true);
            const res = await fetch('/api/messagesThread', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    threadId: receivedThreadId,
                }),
            });
            const data = await res.json();
            // console.log("dataReq", data);
            if (data.success) {
                setMessages([]);
                console.log("threadMessages", data.threadMessages);
                for (let i = data.threadMessages.length - 1; i >= 0; i--) {
                    const message = data.threadMessages[i];
                    setMessages((prev: any) => [...prev, {
                        id: message.id,
                        content: message.content[0].text.value,
                        role: message.role,
                    }]);
                }
                setIsLoading(false)
            }
        }
    }
    useEffect(() => {
        console.log("ok useEffect");
        // if(localStorage.getItem('threadId')){
        fetchMessages(localStorage.getItem('threadId'));
        // }
    }, []);


    useEffect(() => {
        missingKeys.map(key => {
            toast.error(`Missing ${key} environment variable!`)
        })
    }, [missingKeys])


    const {messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom} =
        useScrollAnchor()


    return (
        <div
            className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
            ref={scrollRef}
        >
            <div
                className={cn('pb-[200px] pt-4 md:pt-16', className)}
                ref={messagesRef}
            >
                {messages.length ? (
                    <ChatList messages={messages} isShared={false} status={status} submitMessage={submitMessage}
                              input={input} setInput={setInput} setEdit={setEdit} setMID={setMID} threadId={threadId}
                              handleInputChange={handleInputChange} setThreadId={setThreadId}
                              setMessages={setMessages}/>
                ) : (
                    isLoading ? <div className="fixed inset-0 flex justify-center items-center">
                            <Card className="p-4 mx-4 rounded-2xl" variant="outlined">
                                <CardContent className="flex justify-center items-center p-8">
                                    <span className="mr-4">Please wait</span>
                                    <CircularProgress/>
                                </CardContent>
                            </Card>
                        </div> :
                        <EmptyScreen/>
                )}

                <div className="w-full h-px" ref={visibilityRef}/>
            </div>
            {!isLoading && <ChatPanel
                id={id}
                input={input}
                setInput={setInput}
                isAtBottom={isAtBottom}
                scrollToBottom={scrollToBottom}
                submitMessage={submitMessage}
                messages={messages}
                setThreadId={setThreadId}
                handleInputChange={handleInputChange}
                setMessages={setMessages}
            />}
        </div>
    )
}

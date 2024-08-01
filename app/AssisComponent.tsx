"use client";
import { Message, useAssistant } from 'ai/react';
import {nanoid} from "nanoid";
import {UserMessage} from "@/components/stocks/message";
import {EditButton} from "@/app/EditButton";
import {Separator} from "@/components/ui/separator";


export function AssisComponent({ threadId }: { threadId: string }) {
    const { status, messages, input, submitMessage, handleInputChange , setInput, setMessages} =
        useAssistant({ api: '/api/assistant',
            threadId: threadId,
    });



    console.log("AssisComponent", messages, input);
    return (
        <div>
            {messages.map((message, index) => (
                <div  key={message.id}>
                     <UserMessage><div  id={`message-${message.id}`} className='bg-pink-50'>{message.content}</div></UserMessage>
                    {message.role === "user" && <EditButton messages={messages} MID={message.id} threadId={threadId} />}
                    {index < messages.length - 1 && <Separator className="my-4" />}
                    {/*<AssisComponent/>*/}
                </div>
            ))}

            {status === 'in_progress' && <div />}

            <form onSubmit={submitMessage}>
                <input
                    disabled={status !== 'awaiting_message'}
                    value={input}
                    placeholder="What is the temperature in the living room?"
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}

import {useAssistant, useChat} from "ai/react";
import {nanoid} from "nanoid";
import {UserMessage} from "@/components/stocks/message";
import * as React from "react";
import {useUIState} from "ai/rsc";
import type {AI} from "@/lib/chat/actions";
import {useActions} from "ai/rsc";
import {useState} from "react";



export function EditButton({ messages, MID, threadId}: {messages: any, MID: string, threadId: any}) {
    const { submitUserMessage } = useActions()
    const { append, status, input, submitMessage, handleInputChange , setInput, setMessages} =
        useAssistant({ api: '/api/assistant',
            threadId: threadId,
        });
    console.log("MID", MID);
    // const { input, handleInputChange} = useChat({ api: '/api/chat' })
    // const [_, setMessages] = useUIState<typeof AI>()
    // const { append, messages, setMessages, handleInputChange, submitMessage } = useAssistant({ api: '/api/assistant'});
    // const {reload} = useChat()
    // const [isEditing, setIsEditing] = useState(false);

    console.log("editMess", messages);
    // console.log("setMessages", setMessages);

    const handleEditClick = () => {
        // setIsEditing(true);
        const element = document.getElementById(`message-${MID}`);
        if (element) {
            element.contentEditable = "true";
            element.focus();
            const range = document.createRange();
            range.selectNodeContents(element);
            range.collapse(false);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
        }
    };
    // const handleSubmit = async (input: string) => {
    //     setMessages(() => {
    //         const filteredMessages = uptoThatIndex();
    //         return [
    //             ...filteredMessages,
    //             {
    //                 id: MID,
    //                 display: input
    //             }
    //         ];3
    //     })
    //     const responseMessage = await submitUserMessage(input);
    //     // console.log(responseMessage);
    //     setMessages(currentMessages => [...currentMessages, responseMessage])
    // }

    const handleSaveClick = async () => {
        // setIsEditing(false);
        const messageElement = document.getElementById(`message-${MID}`);
        if (messageElement) {
            messageElement.contentEditable = "false";
            const newMessage = messageElement.innerText;
            if (newMessage) {
                console.log(newMessage);
                // const filteredMessages = uptoThatIndex();
                // handleInputChange({ target: { value: newMessage } } as any);
                // setMessages(() => {
                //     console.log(filteredMessages);
                //     return [
                //         ...filteredMessages,
                //         {
                //             id: MID,
                //             content: newMessage,
                //             role: 'user'
                //         }
                //     ];
                // })
                // append({
                //     role: 'user',
                //     content: newMessage,
                // });
                setInput(newMessage);
                // submitMessage();
                // append({
                //     role: 'user',
                //     content: newMessage,
                // });
                // handleInputChange({ target: { value: newMessage } } as any);
                // const res = await fetch('/api/assistant', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({ message: newMessage, threadId: threadId, edit: true, messageId: MID})
                // });
                // const jsonString = res.text.value.replace(/```json|```/g, '');
                // const responseJson = JSON.parse(jsonString);
                // console.log(res);
                // const data = await res.json();
                // console.log(data);
                // reload();
            }
            return newMessage;
        }
    };

    const uptoThatIndex = () => {
        let index = -1;
        for(let i = 0; i < messages.length; i++){
            if(messages[i].id === MID){
                index = i;
                break;
            }
        }
        if (index !== -1) {
            return messages.slice(0, index);
        }
        return messages;
    }
    return (
            <div className='absolute right-0'>
                    <form className='bg-green-200 p-1 rounded-lg'  onSubmit={async (e) => {
                        console.log("ok");
                        e.preventDefault();
                      const msg = await handleSaveClick();
                      console.log(msg);
                        submitMessage();
                    }}><button type="submit">save</button></form>
                    <button className=' bg-red-300 p-1 rounded-lg' onClick={handleEditClick}>Edit</button>
            </div>
    )
}

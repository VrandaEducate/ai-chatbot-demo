'use client'

import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { StreamableValue } from 'ai/rsc'

// @ts-ignore
import QuestionComponent from "@/components/stocks/QuestionComponent";
import TFComponent from "@/components/stocks/TFComponent";
import {spinner} from "@/components/stocks/spinner";


export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <IconUser />
      </div>
        <div
            className={`${children === "True" ? "bg-green-100" : children === "False" ? "bg-red-100" : ""} ml-4 flex-1 space-y-2 overflow-hidden pl-2`}>
            {children}
        </div>
    </div>
  )
}

export function BotMessage({
                               MID,
                               content,
                               className,
                                submitMessage,
    input,
    setInput,
                               setEdit,
    setMID,
    threadId,
    setThreadId,
    messages,
    setMessages,
                               handleInputChange,
                               currInd
                           }: {
    MID?: any
    content: string
    className?: string
    submitMessage: any
    input: any
    setInput: any
    setEdit: any
    setMID: any,
    threadId: any,
    setThreadId: any,
    messages: any,
    handleInputChange: any,
    setMessages: any,
    currInd: any
}) {
    // console.log(content);
    let jsonObject: any;
        if(content.trim().startsWith('{')){
            if (content.trim().endsWith('}')) {
                jsonObject = JSON.parse(content.trim());
            }
        }else{
            jsonObject = content;
        }



        return (
            <div className={cn('group relative flex items-start md:-ml-12', className)}>
                <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
                    <IconOpenAI />
                </div>
                <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                    {
                        jsonObject && jsonObject.question_type === "subjective" && jsonObject.output_type === "json" && (
                            <div className="bg-orange-100 text-green-700 border-2-red text-md p-2 m-1 rounded-2xl">
                                {jsonObject.questions}
                            </div>
                        )
                    }
                    {

                        jsonObject && jsonObject.question_type === "MCQ" && jsonObject.output_type === "json" && (
                            // @ts-ignore
                            <QuestionComponent handleInputChange={handleInputChange} question={jsonObject.questions} options={jsonObject.options} MID={MID} submitMessage={submitMessage} input={input} setInput={setInput} setEdit={setEdit} setMID={setMID} threadId={threadId} setThreadId={setThreadId} messages={messages} setMessages={setMessages} currInd={currInd} />
                        )
                    }
                    {
                        jsonObject && jsonObject.question_type === "true or false" && jsonObject.output_type === "json" && (
                            // @ts-ignore
                            <TFComponent handleInputChange={handleInputChange} question={jsonObject.questions} options={jsonObject.options} MID={MID} submitMessage={submitMessage} input={input} setInput={setInput} setEdit={setEdit} setMID={setMID} threadId={threadId} setThreadId={setThreadId} messages={messages} setMessages={setMessages} currInd={currInd} />
                        )
                    }
                    {
                        jsonObject && jsonObject.output_type !== "json" && (
                            <div className="bg-orange-100 text-green-700 border-2-red text-md p-2 m-1 rounded-2xl">
                                {jsonObject}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

export function SpinnerMessage() {
    return (
        <div className="group relative flex items-start md:-ml-12">
            <div className="ml-10 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
                {spinner}
            </div>
        </div>
    )

}


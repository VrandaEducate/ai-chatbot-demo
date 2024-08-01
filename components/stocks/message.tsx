'use client'

import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

// @ts-ignore
import QuestionComponent from "@/components/stocks/QuestionComponent";

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
    // console.log(children);
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <IconUser />
          {/*<button className="bg-red-100 p-2">Edit</button>*/}
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
                               handleInputChange
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
    setMessages: any
}) {
    // const [jsonObject, setJsonObject] = useState<any>(null);
    // console.log(content);
    const jsonMarkerRegex = /^```json\s*{[\s\S]*}\s*```$/;
    if(jsonMarkerRegex.test(content)){
        const jsonString = content?.replace(/```json|```/g, '').trim();
        // console.log(jsonObject);
            const jsonObject = JSON.parse(jsonString);
        // const jsonSring = JSON.parse(jsonObject);
        // console.log(jsonSring);
        // const text =  useStreamableText(content);
        // const [messages] = useUIState();
        console.log("textbot", MID);



        return (
            <div className={cn('group relative flex items-start md:-ml-12', className)}>
                <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
                    <IconOpenAI />
                </div>
                <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                    {
                        jsonObject && jsonObject.question_type === "subjective" && (
                            <div className="bg-orange-100 text-green-700 border-2-red text-md p-2 m-1 rounded-2xl">
                                {jsonObject.questions}
                            </div>
                        )
                    }
                    {

                        jsonObject && jsonObject.question_type === "MCQ" && (
                            // @ts-ignore
                            <QuestionComponent handleInputChange={handleInputChange} question={jsonObject.questions} options={jsonObject.options} MID={MID} submitMessage={submitMessage} input={input} setInput={setInput} setEdit={setEdit} setMID={setMID} threadId={threadId} setThreadId={setThreadId} messages={messages} setMessages={setMessages} />
                        )
                    }
                    {
                        jsonObject && jsonObject.question_type === "true or false" && (
                            // @ts-ignore
                            <QuestionComponent handleInputChange={handleInputChange} question={jsonObject.questions} options={jsonObject.options} MID={MID} submitMessage={submitMessage} input={input} setInput={setInput} setEdit={setEdit} setMID={setMID} threadId={threadId} setThreadId={setThreadId} messages={messages} setMessages={setMessages} />
                        )
                    }
                    {
                        jsonObject && jsonObject.error && (
                            <div className="bg-orange-100 text-green-700 border-2-red text-md p-2 m-1 rounded-2xl">
                                {jsonObject.error}
                            </div>
                        )
                    }
                    {/*// Default fallback if none of the above conditions are met*/}
                    {
                        jsonObject && !["subjective", "MCQ", "true or false"].includes(jsonObject.question_type) && (
                            <div className="bg-orange-100 text-green-700 border-2-red text-md p-2 m-1 rounded-2xl">
                                {jsonObject.questions}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

}

export function BotCard({
                            children,
                            showAvatar = true
                        }: {
    children: React.ReactNode
  showAvatar?: boolean
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          'flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm',
          !showAvatar && 'invisible'
        )}
      >
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>
  )
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial p-2'}>{children}</div>
    </div>
  )
}


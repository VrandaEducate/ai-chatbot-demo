import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

// import { auth } from '@/auth'
import { getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import {useChat} from "ai/react";
import {AssisComponent} from "@/app/AssisComponent";

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
                                         params
                                       }: ChatPageProps): Promise<Metadata> {
  // const session = await auth()
  //
  // if (!session?.user) {
  //   return {}
  // }

  // Assuming chat data retrieval is done differently here
  // You will need to replace this with the actual logic for fetching chat data
  const chat = await fetchChatData(params.id) // Example function

  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  console.log("ChatPage");
  // const session = (await auth()) as Session
  //
  // if (!session?.user) {
  //   redirect(`/login?next=/chat/${params.id}`)
  // }

  // const userId = session.user.id as string

  // Assuming chat data retrieval is done differently here
  // You will need to replace this with the actual logic for fetching chat data
  const chat = await fetchChatData(params.id) // Example function

  // if (!chat) {
  //   redirect('/')
  // }
  //
  // if (chat?.userId !== session?.user?.id) {
  //   notFound()
  // }

  return (
      <AI initialAIState={{ threadId: chat.id, chatId: chat.id, messages: chat.messages }}>
        {/*<Chat*/}
        {/*    id={chat.id}*/}
        {/*    // session={session}*/}
        {/*    initialMessages={chat.messages}*/}
        {/*    missingKeys={[]} // Adjust if necessary*/}
        {/*/>*/}
        <AssisComponent threadId={chat.id} />
      </AI>
  )
}

// Placeholder function for fetching chat data
async function fetchChatData(chatId: string ){
  // Implement the logic to fetch chat data based on your requirements
  return {
    id: chatId,
    // userId: userId,
    title: 'Sample Chat Title',
    messages: [] // Add actual messages here
  }
}

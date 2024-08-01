import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
// import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import {AssisComponent} from "@/app/AssisComponent";
import OpenAI from "openai";

export const metadata = {
  title: 'Next.js AI Chatbot'
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export default async function IndexPage() {
  console.log("IndexPage");

  const id = (await openai.beta.threads.create({})).id
  // const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
      <Chat id={id} missingKeys={missingKeys} />
  )
}

import { Chat } from '@/components/chat'
import { getMissingKeys } from '@/app/actions'
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
  const missingKeys = await getMissingKeys()

  return (
      <Chat id={id} missingKeys={missingKeys} />
  )
}

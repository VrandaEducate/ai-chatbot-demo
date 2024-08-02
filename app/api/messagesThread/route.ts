import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});


export async function POST(req: any) {
    try {
        const body = await req.json();
        const {threadId} = body;
        console.log("POST REQ THREAD",threadId);
        const threadMessages = await openai.beta.threads.messages.list(threadId);
        // console.log("threadMessages", threadMessages);
        return NextResponse.json({
            success: true,
            threadMessages: threadMessages.data,
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
        });
    }
}
import { AssistantResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});


export async function POST(req: Request) {
    try {
        const input: {
            threadId: string | null;
            message: string;
            messageId: string | undefined;
            edit: boolean;
        } = await req.json();
        console.log("threadId before", input);

        let threadId = input.threadId;

        const createThread = async (messages: any[] = []) => {
            return (await openai.beta.threads.create({ messages })).id;
        };

        const addMessageToThread = async (threadId: string, content: string) => {
            return await openai.beta.threads.messages.create(threadId, {
                role: 'user',
                content,
            });
        };

        const handleToolOutputs = async (runResult: any, threadId: string, forwardStream: any) => {
            while (
                runResult?.status === 'requires_action' &&
                runResult.required_action?.type === 'submit_tool_outputs'
                ) {
                const tool_outputs = runResult.required_action.submit_tool_outputs.tool_calls.map(
                    (toolCall: any) => {
                        const parameters = JSON.parse(toolCall.function.arguments);

                        switch (toolCall.function.name) {
                            // configure your tool calls here

                            default:
                                throw new Error(`Unknown tool call function: ${toolCall.function.name}`);
                        }
                    },
                );

                runResult = await forwardStream(
                    openai.beta.threads.runs.submitToolOutputsStream(threadId, runResult.id, { tool_outputs })
                );
            }
        };

        if (input.edit && input.messageId && typeof threadId === 'string') {
            // Fetch all previous messages in the thread up to the provided messageId
            const previousMessages = await openai.beta.threads.messages.list(threadId);
            previousMessages.data = previousMessages.data.reverse();
            const newMessageArray = [];

            // Append all previous messages to the new thread up to the messageId
            for (const msg of previousMessages.data) {
                if (msg.id === input.messageId) break;
                newMessageArray.push({
                    role: msg.role,
                    content: msg.content[0].text['value'],
                });
            }

            threadId = await createThread(newMessageArray);
            console.log('newMessageArray', newMessageArray);
        }

        if (!threadId) {
            threadId = await createThread();
        }

        console.log("threadId", threadId);

        const createdMessage = await addMessageToThread(threadId, input.message);

        return AssistantResponse(
            { threadId, messageId: createdMessage.id },
            async ({ forwardStream }) => {
                const runStream = openai.beta.threads.runs.stream(threadId, {
                    assistant_id: process.env.ASSISTANT_ID || (() => {
                        throw new Error('ASSISTANT_ID is not set');
                    })(),
                }, { signal: req.signal });

                let runResult = await forwardStream(runStream);

                await handleToolOutputs(runResult, threadId, forwardStream);
            }
        );
    } catch (error) {
        console.error("Error in POST handler:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

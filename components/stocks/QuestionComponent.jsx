import React, { useState } from 'react';
import { nanoid } from "nanoid";
import { UserMessage } from "@/components/stocks/message";
import { useActions, useUIState } from "ai/rsc";
import { useChat } from "ai/react";
import {useEnterSubmit} from "@/lib/hooks/use-enter-submit";

const QuestionComponent = ({ MID, question, options, submitMessage, setMessages, handleInputChange, messages, setInput, input , setEdit, setMID, threadId,  setThreadId}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isFirstSubmit, setIsFirstSubmit] = useState(true);
    const { formRef } = useEnterSubmit();

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    // const uptoThatIndex = () => {
    //     let index = -1;
    //     for(let i = 0; i < messages.length; i++){
    //         if(messages[i].id === MID){
    //             index = i;
    //             break;
    //         }
    //     }
    //     if (index !== -1) {
    //         return messages.slice(0, index);
    //     }
    //     return messages;
    // }


    const handleSubmit = async (e) => {
        e.preventDefault()
        // setInput(selectedOption);
        console.log(selectedOption);
        // await submitMessage(e, { data: { edit: "true", messageId: MID } });
        // submitMessage();
        //
        setThreadId(threadId);
        // setInput(selectedOption);
        if (isFirstSubmit) {
            // Perform task for the first submission
            console.log('First submit action');
            // setInput(selectedOption);
           // debugger;
            setEdit(false);
          await  submitMessage(e, { data: { edit: "true", messageId: MID } })
            setIsFirstSubmit(false);

        } else {
            // Perform a different task for subsequent submissions
            console.log('Subsequent submit action');
            // const filteredMessages = uptoThatIndex();
            // setMessages(() => {
            //     return [
            //         ...filteredMessages
            //     ];
            // })
            // setInput(selectedOption);
            setEdit(true);
            setMID(MID);
            await submitMessage();

        }
    };


    return (
        <div className="max-w-md mt-10 p-4 rounded-lg shadow-xl" style={{ background: "#abd1f7", maxWidth: "250px" }}>
            <div className="flex flex-col p-2">
                <h1 className="text-3xl font-bold pb-2 text-white text-center">{question}</h1>
                <form className="w-full" onSubmit={(e) =>  {
                    console.log("submit");
                    handleSubmit(e);
                    // submitMessage(e, { data: { edit: "true", messageId: MID } })
                }}>
                    {options.map((option, index) => (
                        <div key={index} className="mb-4 flex">
                            <label className="inline-flex text-white">
                                <input
                                    type="radio"
                                    className="form-radio text-white"
                                    name="options"
                                    value={option}
                                    checked={option === selectedOption}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        handleOptionChange(e);
                                    }}
                                />
                                <span className="ml-3">{option}</span>
                            </label>
                        </div>
                    ))}
                    {options && (
                        <button
                            type="submit"
                            className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-200"
                        >
                            Submit
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default QuestionComponent;

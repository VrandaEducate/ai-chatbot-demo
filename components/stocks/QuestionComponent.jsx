import React, { useState } from 'react';

const QuestionComponent = ({ MID, question, options, submitMessage, setMessages, handleInputChange, messages, setInput, input , setEdit, setMID, threadId,  setThreadId}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isFirstSubmit, setIsFirstSubmit] = useState(true);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(selectedOption);
        // setThreadId(localStorage.getItem('threadId'));
        if (isFirstSubmit) {
            console.log('First submit action');
            await  submitMessage(e, { data: { edit: "false" } })
            setIsFirstSubmit(false);
        } else {
            console.log('Subsequent submit action');
            // debugger;
            localStorage.setItem('isEdit', "true");
            await  submitMessage(e, { data: { edit: "true", messageId: MID } })
        }
    };


    return (
        <div className="max-w-md mt-10 p-4 rounded-lg shadow-xl" style={{ background: "#abd1f7", maxWidth: "250px" }}>
            <div className="flex flex-col p-2">
                <h1 className="text-3xl font-bold pb-2 text-white text-center">{question}</h1>
                <form className="w-full" onSubmit={(e) =>  {
                    console.log("submit");
                    handleSubmit(e);
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
                            className="mt-6 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-200"
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

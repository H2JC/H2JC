'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const TextInputForm = () => {
    const [userInput, setUserInput] = useState(""); // Initialize userInput state with an empty string

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/queries', { queries: userInput });
            console.log('Query Submitted', response);
        } catch (error) {
            console.error('Unable to submit', error);
        }
    };


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>
                User Input:
                <input type="text" value={userInput} onChange={handleInputChange} required /> 
            </label>
            <button type = "submit">Submit</button>
        </form>
        </div>
    );
};

export default TextInputForm;
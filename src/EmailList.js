import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";





function EmailList() {



    const [emails, setEmails] = useState([]);
    const [fullContent, setfullContent] = useState('');

    async function displayFullContent(data) {
        const response = await fetch(`http://localhost:3001/emails/${data.id}`);
        const email = await response.json();
        setfullContent(
            <>
                <h1>{email.sender}</h1>
                <h1>{email.subject}</h1>
                <h1>{email.date}</h1>
                <h1>{email.recipient}</h1>
                <p>{email.message}</p>
            </>
        )
    }

    function searchEmails(text) {
        console.log(text)

    }





    async function fetchData() {
        const response = await fetch("http://localhost:3001/emails/");


        const emails = await response.json();
        const displayEmails = emails.map(email => {
            return (
                <button key={email.id} onClick={() => displayFullContent(email)}>
                    <h1>{email.sender}</h1>
                    <h1>{email.subject}</h1>
                </button>
            );
        })
        setEmails(displayEmails);


    };

    useEffect(() => {
        console.log("hello")
        fetchData();

    });
    return (
        <>
            <form><input type="search" /> <input onClick={searchEmails} type="button" /> </form>
            <div>{fullContent}</div>
            <div>{emails}</div>
        </>
    );
}

export default EmailList;
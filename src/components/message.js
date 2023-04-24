import React from "react";
import MessageStyling from '../styles/Message.module.css';
import UseGlobalValues from "../useHooks/useGlobalValues";

/**
 * @typedef {object} MessageProps
 * @prop {'error' | 'success' | 'info'} type This is the type of Message being displayed
 */

/**
 * 
 * @param {MessageProps} param0 
 * @returns
 */
export default function Message ({ children, type }){

    const {update} = UseGlobalValues();

    function getMessageClassNameByType(){
        if (type === 'error'){
            return MessageStyling.error;
        }
        else if (type === 'success'){
            return MessageStyling.success;
        }
        else if (type === 'info'){
            return MessageStyling.info;
        }
    }

    const messageClasses = [MessageStyling.message];
    messageClasses.push(getMessageClassNameByType());

    function clearMessage() {
        update({error: ''});
    }

    return (
    <>
        <div className={messageClasses.join(' ')} onClick={clearMessage}>
            <p>{children}</p>
        </div>
    </>
    )
}
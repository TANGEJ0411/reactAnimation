import { useContext, useEffect, useState } from "react";
import { isLoginContext } from "../../App";
import liff from "@line/liff";
import { useNavigate } from "react-router-dom";
import './ClipboardCopy.scss';

function ClipboardCopy({ copyText, textClass }) {
    const [isCopied, setIsCopied] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = useContext(isLoginContext)
    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(copyText)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        const getLiffContext = async () => {
            try {
                await liff.ready
                if (isLoggedIn) {
                    const context = liff.getContext();
                    console.log(context);
                    const permissionQueryE = await liff.permission.query("email");
                    console.log(permissionQueryE);
                    const permissionQueryP = await liff.permission.query("profile");
                    console.log(permissionQueryP);
                    const permissionQueryC = await liff.permission.query("chat_message.write");
                    console.log(permissionQueryC);
                    const permissionQueryO = await liff.permission.query("openid");
                    console.log(permissionQueryO);
                }
            } catch (error) {
                throw error
            }
        }
        getLiffContext()
    }, [])
    return (
        <div>
            <input type="text" value={copyText} readOnly className={`clipboard-input ${textClass}`} />
            {/* Bind our handler function to the onClick button property */}
            <button onClick={handleCopyClick}>
                <span>{isCopied ? 'Cd!' : 'C'}</span>
            </button>
            <p>{isCopied && '已複製'}</p>
        </div>
    );
}
export default ClipboardCopy;
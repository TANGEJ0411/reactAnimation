import './OtpInput.css';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function MyOtpInput({ value, valueLength, onChange }) {
    const RE_DIGIT = new RegExp(/^\d+$/);
    // console.log(RE_DIGIT)
    const firstInputRef = useRef(null)
    const [disabled, setDisabled] = useState(false)
    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [value, valueLength]);
    const inputOnChange = (e, idx) => {
        const target = e.target;
        let targetValue = target.value;
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        // if (!RE_DIGIT.test(targetValue)) {
        //     return;
        // }

        const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);

        onChange(newValue);

        if (!isTargetValueDigit) {
            return;
        }

        //控制要往下一個input focus
        const nextElementSibling = target.nextElementSibling;
        if (nextElementSibling) {
            nextElementSibling.focus();
            console.log(target, target.value, nextElementSibling)
        } else if (nextElementSibling === null) {
            console.log(newValue)
            setDisabled(true)
        }
    };
    //控制刪除
    const inputOnKeyDown = (e) => {
        const target = e.target;
        const targetValue = target.value;
        target.setSelectionRange(0, targetValue.length);
        if (e.key !== 'Backspace' || target.value !== '') {
            return;
        }
        const previousElementSibling =
            target.previousElementSibling;

        if (previousElementSibling) {
            previousElementSibling.focus();
            console.log(target, target.value, previousElementSibling)
        }
    };
    const inputOnFocus = (e) => {
        const { target } = e;

        target.setSelectionRange(0, target.value.length);
    };
    // useEffect(() => {
    //     firstInputRef.current.focus()
    // }, [])
    return (
        <div className="otp-group">
            {valueItems.map((digit, idx) => (
                <input
                    ref={idx === 0 ? firstInputRef : null}
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength={valueLength}
                    className="otp-input"
                    value={digit}
                    onChange={(e) => inputOnChange(e, idx)}
                    onKeyDown={inputOnKeyDown}
                    onFocus={inputOnFocus}
                    disabled={disabled}
                />
            ))}
        </div>
    );
}
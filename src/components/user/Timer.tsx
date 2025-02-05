import React, { useState, useEffect } from 'react'
import { tokenExpiry } from '@/_ApiCall/customer'

export default function Timer() {
    const [remainingTime, setRemainingTime] = useState("00:00")

    useEffect(() => {
        const updateRemainingTime = async () => {
            const expiryDate = await tokenExpiry(); // Assuming tokenExpiry is an async function
            const expiryTime = new Date(expiryDate).getTime();
            const currentTime = new Date().getTime();
            // time in milliseconds
            const timeDifference = expiryTime - currentTime;

            if (timeDifference <= 0) {
                // Token expired
                setRemainingTime("00:00");
                clearInterval(timer); // Clear the interval if token is expired
                return;
            }

            const minutes = Math.floor(timeDifference / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setRemainingTime(
                `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            );
        };
        // Initialize and update every second
        const timer = setInterval(updateRemainingTime, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(timer);
    }, [])
    return (
        <div>{remainingTime}</div>
    )
}


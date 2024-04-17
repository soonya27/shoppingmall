import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { PiHeartBold } from "react-icons/pi";

export default function HeartIcon({ color = '#fff', bold = false }) {
    return (
        <>
            {
                bold ? (<PiHeartBold style={{ width: '100%', height: '100%', color }} />)
                    : (<FaRegHeart style={{ width: '100%', height: '100%', color }} />)
            }
        </>

    );
}


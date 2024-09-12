import React from "react";

const Card = ({ children }) => {
    return (
        <div className="p-5 rounded-lg shadow-lg bg-[#FCF8F3]">{children}</div>
    );
};

export default Card;

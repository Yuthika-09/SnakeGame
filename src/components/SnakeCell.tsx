import React from "react";

interface Props{
    isHead?: boolean,
}

const SnakeCell: React.FC<Props> = ({isHead = false}) => (
    <div className={`cell snake ${isHead? 'snake-head': ''}`}>
    {
        isHead && (
            <div className="eyes">
                <div className="eye"/>
            </div>
        )
    }
    </div>
)

export default SnakeCell;
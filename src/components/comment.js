import React from "react";
import * as dateformat from "dateformat";

const Comment = ({ comment }) => {
    const { content, timestamp, posterName } = comment;
    return (
        <div style={{ borderLeft: '2px solid #ddd', marginBottom: 10, paddingLeft: 5 }}>
            <q>
                {content}
            </q>
            <small> at {dateformat(timestamp, 'dddd, mmmm dS, yyyy, h:MM:ss TT')} by {posterName}</small>
        </div>
    )
}

export default Comment;

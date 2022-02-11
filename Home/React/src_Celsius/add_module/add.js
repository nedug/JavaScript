import React from "react";

function Result(props) {
    return props.temperature >= 100 ? <p>Вода кипит.</p> : <p>Вода не кипит.</p>;
}

export {Result};
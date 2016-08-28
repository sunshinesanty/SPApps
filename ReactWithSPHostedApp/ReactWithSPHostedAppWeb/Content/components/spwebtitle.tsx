import * as React from "react";
import {SPWebProps} from "../Interfaces/interfaces"

const SPWebTitle = (props: SPWebProps) => {
    return (
        <h1><a href={props.Url}> {props.Title}</a></h1>
    );
}

SPWebTitle.prototype = {
    children: React.PropTypes.object.isRequired
}

export default SPWebTitle
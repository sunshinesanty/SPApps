import * as React from "react";
import * as ReactDOM from "react-dom";
import DevTools from "mobx-react-devtools";

ReactDOM.render(
    <div>
        <DevTools />
        <h1>Read From SP List</h1>
    </div>,
    document.getElementById("spListData")
);
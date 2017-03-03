import * as React from "react";
const shallowCompare = require('react-addons-shallow-compare');

export default class FabaNativeMobileBaseComponent<TProps> extends React.PureComponent<TProps, void>{
    constructor(props:TProps){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}
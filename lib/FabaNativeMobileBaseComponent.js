"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const shallowCompare = require('react-addons-shallow-compare');
class FabaNativeMobileBaseComponent extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}
exports.default = FabaNativeMobileBaseComponent;
//# sourceMappingURL=FabaNativeMobileBaseComponent.js.map
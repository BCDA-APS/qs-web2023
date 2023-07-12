import {Info} from "react-feather";
import React, {useState} from "react";
import {
    UncontrolledPopover, 
    PopoverHeader, 
    PopoverBody
} from "reactstrap";

const InfoIcon = ({ header, content, id}) => {
    const [ isHover, setHover] = useState(false);
    return (
        <div>
            <Info size={20} style={isHover ? {color: '#0d6efd', margin: '10px'} : {color: 'black', margin: '10px'}} id={id} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}/>
            <UncontrolledPopover
                placement="right"
                target={id}
                trigger="legacy"
            >
                <PopoverHeader>
                    {header}
                </PopoverHeader>
                <PopoverBody>
                    {content}
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    );
}
export default InfoIcon;
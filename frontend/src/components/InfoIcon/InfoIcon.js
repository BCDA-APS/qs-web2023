import {Info} from "react-feather";
import React, {useState} from "react";
import {
    Tooltip
} from "reactstrap";

const InfoIcon = ({ content, id }) => {
    //Value used to set hover state of button
    const [ isHover, setHover] = useState(false);
    //Value used to set whether the tooltip is open or closed
    const [tooltipOpen, setTooltipOpen] = useState(false);
    //Function to change state of the tooltip
    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    return (
        <div>
            <Info size={20} style={isHover ? {color: '#0d6efd', margin: '10px'} : {color: 'black', margin: '10px'}} id={id} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}/>
            <Tooltip
                placement={'bottom'}
                isOpen={tooltipOpen}
                target={id}
                toggle={toggleTooltip}
            >
                {content}
            </Tooltip>
        </div>
    );
}
export default InfoIcon;
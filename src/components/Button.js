import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = classNames("button"); {
 
   if (props.confirm) {
     buttonClass += " button--confirm";
   }
   if (props.danger) {
      buttonClass += " button--danger";
   }
   if (props.alert) {
      buttonClass += " button--alert";
   }
   if (props.warning) {
      buttonClass += " button--warning";
   }
};
   return (
      <button 
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
            {props.children}
      </button>
   );
 }

import React from "react";
import "./CustomAlerts.scss";

type CustomAlertsProps = {
  message: string | string[];
  type: "success" | "error" | "warning" | "info";
};

const CustomAlerts: React.FC<CustomAlertsProps> = ({ message, type }) => {
  const iconClass = {
    success: "icon-check",
    error: "icon-notification",
    warning: "icon-warning",
    info: "icon-info",
  }[type];

  const messageClass = {
    success: "message-success",
    error: "message-error",
    warning: "message-warning",
    info: "message-info",
  }[type];

  return (
    <div className={`custom-alert-position div-custom-alerts-message ${messageClass}`} style={{height:'auto'}}>
      <i className={iconClass}></i>
      <div className="div-custom-alerts-message-content">
        {Array.isArray(message) ? (
          <ul>
            {message.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        ) : (
          <p className="m-0">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CustomAlerts;

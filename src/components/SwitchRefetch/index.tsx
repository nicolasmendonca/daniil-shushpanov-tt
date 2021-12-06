import React from "react";
import "./styles.css";

type SwitchRefetchProps = {
  isToggled: boolean;
  onToggle: () => void;
};

export const SwitchRefetch: React.FC<SwitchRefetchProps> = ({
  isToggled,
  onToggle,
}) => {
  return (
    <div className="toggle-switch-container">
      <label className="toggle-switch">
        <input type="checkbox" checked={isToggled} onChange={onToggle}></input>
        <span className="switch" />
      </label>
      Refetching {isToggled ? "On" : "Off"}
    </div>
  );
};

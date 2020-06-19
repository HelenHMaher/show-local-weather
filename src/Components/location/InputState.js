import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const InputState = (props) => {
  const { tempCountry, getUSState, clearStateData } = props;
  const [tempState, setTempState] = useState("");

  useEffect(() => {
    getUSState(tempState);
  }, [tempState]);

  useEffect(() => {
    if (clearStateData) {
      setTempState("");
    }
  }, [clearStateData]);

  if (
    tempCountry.toUpperCase() === "USA" ||
    tempCountry.toUpperCase() === "UNITED STATES" ||
    tempCountry.toUpperCase() === "THE UNITED STATES OF AMERICA" ||
    tempCountry.toUpperCase() === "UNITED STATES OF AMERICA"
  ) {
    return (
      <div className="inputSet">
        <label htmlFor="stateInput">State </label>
        <input
          value={tempState}
          name="stateInput"
          className="input"
          placeholder="state**"
          required
          onChange={(e) => setTempState(e.target.value)}
        />
        <br />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default InputState;

InputState.propTypes = {
  tempCountry: PropTypes.string,
  getUSState: PropTypes.func,
  clearStateData: PropTypes.bool,
};

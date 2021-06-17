import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ContentSection.scss";

function ContentSection(props) {
  //use effect is like on load
  const [contentNodeID, setContentNodeID] = useState([props.ContentIDSelected]);

  useEffect(() => {
    setContentNodeID(props.ContentIDSelected);
  }, [props.ContentIDSelected]);

  let content = "";

  if (contentNodeID > 0) {
    let frameUrl = "".concat(
      process.env.REACT_APP_FRAME_URL_1,
      contentNodeID.toString(),
      process.env.REACT_APP_FRAME_URL_2
    );

    content = (
      <iframe
        title="Content View"
        className="file_preview_frame"
        width="100%"
        height="100%"
        src={frameUrl}
      ></iframe>
    );
  }

  return content;
}
ContentSection.propTypes = {
  ContentIDSelected: PropTypes.number.isRequired
};
export default ContentSection;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import FolderTreeView from "./FolderTreeView";

function FolderTreeSection(props) {
  function FolderIDChanged(id) {
    props.FolderIDChanged(id);
  }

  function showEmailFolderIDUpdate() {
    props.showEmailFolderIDUpdate();
  }

  function folderFullpath(value) {
   props.folderFullpath(value)
  }
  //use effect is like on load
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <FolderTreeView
        FolderNodeID={2000} //2000 is content server enterprise workspace node ID
        FolderNodeName={"Enterprise"}
        NodeSelected={FolderIDChanged}
        ShowEmailFolderID={props.ShowEmailFolderID}
        showEmailFolderIDUpdate={() => showEmailFolderIDUpdate()}
        folderFullpath={(value) => folderFullpath(value)}
        BreadcrumbId={props.BreadcrumbId}
      />
    </React.Fragment>
  );
}
FolderTreeSection.propTypes = {
  FolderIDChanged: PropTypes.func.isRequired
};
export default FolderTreeSection;

import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PropTypes from "prop-types";
import FolderTreeItem from "./FolderTreeItem";
import AGOApi from "../../api/AGOApi";
import _ from "lodash";
import TreeView from "@material-ui/lab/TreeView";
import { withRouter } from "react-router-dom";
let Fullpath = [];
function FolderTreeView(props) {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  let [NeedtoExpand, setNeedtoExpand] = useState([]);
  const [NodeID, setNodeID] = useState("");
  // const [Fullpath, setFullpath] = useState([]);
  const handleToggle = async (event, nodeIds) => {
    Fullpath = [];
    // let BaseNode  = nodeIds.filter(r => { return (r === "2000") });
    // BaseNode && BaseNode.length ? setNeedtoExpand(nodeIds) : setNeedtoExpand([]);
    // if( BaseNode && BaseNode.length && nodeIds[0] === "2000"){
    //   setExpanded(nodeIds)
    // }

    // setCurrentFolder(event.currentTarget.textContent);
    // Fullpath.push(event.currentTarget.textContent);
    //
    // console.log("fullpath",Fullpath);
    // console.log("CurrentFolder",event.currentTarget.textContent)
    setNeedtoExpand(nodeIds);
    if (nodeIds && nodeIds.length) {
      setNodeID(parseInt(nodeIds[0]));
    }
  };

  function Exceptiontime(value) {
    setNodeID("");

    var ExpandArray =
      NeedtoExpand && NeedtoExpand.length
        ? NeedtoExpand.filter(r => {
            return r !== value;
          })
        : [];
    setNeedtoExpand(ExpandArray);
  }

  useEffect(() => {
    let url = document.referrer;
    let spliturl = _.split(url, "/nodes/", 2);
    let id = _.split(spliturl[1], "?", 1);

    let url1 = decodeURIComponent(props.location.search);
    let spliturl1 = _.split(url1, "/nodes/", 2);
    let id1 = _.split(spliturl1[1], "?", 1);

    const fetchpathData = async () => {
      if (id[0] || id1[0]) {
        const response = await AGOApi.getFoldersPath(
          parseInt(id[0] ? id[0] : id1[0])
        );
        if (response !== null) {
          Fullpath = [];
          for (var i = 0; response.data.length > i; i++) {
            var item = response.data[i];
            NeedtoExpand.unshift(item.NodeID.toString());
            Fullpath.push(item);
            //setNeedtoExpand(NeedtoExpand);
            setSelected(item.NodeID.toString());
            props.folderFullpath(Fullpath);
            // if(i === (response.data.length -1)) {
            //   props.NodeSelected(item.NodeID.toString());
            // }
          }
        }
      }
    };
    if (url || url1) {
      fetchpathData();
    }
  }, []);

  useEffect(() => {
    const fetchpathData = async () => {
      if (props.ShowEmailFolderID) {
        const response = await AGOApi.getFoldersPath(
          parseInt(props.ShowEmailFolderID)
        );
        if (response !== null) {
          NeedtoExpand = [];
          Fullpath = [];
          for (var i = 0; response.data.length > i; i++) {
            var item = response.data[i];
            setSelected(item.NodeID.toString());
            NeedtoExpand.unshift(item.NodeID.toString());
            Fullpath.push(item);
            // if(i === (response.data.length -1)) {
            //   props.NodeSelected(item.NodeID.toString());
            // }
          }
          props.folderFullpath(Fullpath);
          setNeedtoExpand(NeedtoExpand);
        }
      }
    };
    if (props.ShowEmailFolderID) {
      fetchpathData();
    }
  }, [props.ShowEmailFolderID]);

  function ExpandItem() {
    setExpanded(NeedtoExpand);
  }

  function showEmailFolderIDUpdate() {
    props.showEmailFolderIDUpdate();
  }

  function UpdateExpandNodeId(value) {
    var ExpandArray =
      NeedtoExpand && NeedtoExpand.length
        ? NeedtoExpand.filter(function(e) {
            return this.indexOf(e) < 0;
          }, value)
        : [];
    setNeedtoExpand(ExpandArray);
  }

  function FolderIDChanged(value) {
    props.NodeSelected(value.toString());
  }

  useEffect(() => {
    const fetchpathData = async () => {
      setSelected(props.BreadcrumbId.toString());
      props.NodeSelected(props.BreadcrumbId);
      Fullpath = [];
      setNodeID(props.BreadcrumbId);

      const response = await AGOApi.getFoldersPath(
        parseInt(props.BreadcrumbId)
      );
      if (response !== null) {
        for (var i = 0; response.data.length > i; i++) {
          var item = response.data[i];
          Fullpath.push(item);
        }
        props.folderFullpath(Fullpath);
      }
    };
    if (props.BreadcrumbId) {
      fetchpathData();
    }
  }, [props.BreadcrumbId]);

  const handleSelect = async (event, nodeIds) => {
    if (event.target.id !== "expand") {
      setSelected(nodeIds);
      props.NodeSelected(nodeIds);
      Fullpath = [];

      const response = await AGOApi.getFoldersPath(parseInt(nodeIds));
      if (response !== null) {
        for (var i = 0; response.data.length > i; i++) {
          var item = response.data[i];
          Fullpath.push(item);
        }
        props.folderFullpath(Fullpath);
      }
    }
    //nodeIds is "2000"
  };

  //use effect is like on load

  return (
    <TreeView
      defaultCollapseIcon={
        <div style={{ cursor: "pointer", padding: "10px" }}>
          <ExpandMoreIcon
            id="expand"
            style={{ cursor: "pointer" }}
            title="ExpandIcon"
          />
        </div>
      }
      defaultExpandIcon={
        <div style={{ cursor: "pointer", padding: "10px" }}>
          <ChevronRightIcon
            id="expand"
            style={{ cursor: "pointer" }}
            title="ExpandIcon"
          />
        </div>
      }
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <FolderTreeItem
        FolderNodeID={props.FolderNodeID}
        FolderNodeName={props.FolderNodeName}
        ShowEmailFolderID={props.ShowEmailFolderID}
        NodeID={NodeID}
        ExpandItems={() => ExpandItem()}
        showEmailFolderIDUpdate={() => showEmailFolderIDUpdate()}
        UpdateExpandNodeId={value => UpdateExpandNodeId(value)}
        FolderIDChanged={value => FolderIDChanged(value)}
        Exceptiontime={value => Exceptiontime(value)}
      ></FolderTreeItem>
    </TreeView>
  );
}
FolderTreeView.propTypes = {
  NodeSelected: PropTypes.func.isRequired,
  FolderNodeID: PropTypes.number.isRequired,
  FolderNodeName: PropTypes.string.isRequired
};
export default withRouter(FolderTreeView);

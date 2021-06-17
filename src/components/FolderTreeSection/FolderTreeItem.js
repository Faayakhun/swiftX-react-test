import React, { useState, useEffect } from "react";
import AGOApi from "../../api/AGOApi";
import PropTypes from "prop-types";
import StyledTreeItem from "./StyledTreeItem";
// import FolderIcon from "@material-ui/icons/Folder";
import _ from "lodash";
import Loader from "../common/Loader";
import { withRouter } from "react-router-dom";
let NeedtocollapseItems = [];
let NormalFlow = false;
let Loading = false;
let folders = [];
function FolderTreeItem(props) {
  const [DummyData] = useState([
    {
      NodeID: "",
      Name: "Loading...",
      IconUri: null,
      ParentNodeID: "",
      NodeType: null,
      ChildCount: 0
    }
  ]);
  // const [folders, setFolders] = useState([]);
  const [FoldersReady, setFoldersReady] = useState(false);
  const [UserId, setUserId] = useState(0);
  const [RenderingComplete, setCompleterendering] = useState(false);
  const [currentNodeId, SetcurrentNodeId] = useState("");
  const [renderprocess, Setrenderprocess] = useState(false);
  useEffect(() => {
    if (FoldersReady) {
      const fetchData = async ProcessID => {
        Loading = true;
        const res = await AGOApi.getFolders(ProcessID);
        if (res !== null) {
          Loading = false;
          await performload(res, ProcessID);
        } else {
          Loading = false;
          Setrenderprocess(!renderprocess);
          props.Exceptiontime(ProcessID);
        }
      };
      function performload(res, ProcessID) {
        setCompleterendering(false);
        SetcurrentNodeId(ProcessID);
        if (ProcessID === 2000 && folders && folders.length) {
          const folderloop = () => {
            let folderdata = folders;

            folderdata.map(fold => {
              if (fold.NodeID === 2000) {
                fold.Children = res.data;
              }
            });
            return folderdata;
          };
          // setFolders(folderloop())
          folders = folderloop();
        } else if (ProcessID === UserId) {
          const folderloop = () => {
            let folderdata = folders;
            folderdata.map(fold => {
              if (fold.NodeID === UserId) {
                fold.Children = res.data;
              }
            });
            return folderdata;
          };
          // setFolders(folderloop())
          folders = folderloop();
        }
        let setchildren = res.data;
        let set =
          setchildren && setchildren.length
            ? setchildren.map(node => {
                if (node.ChildCount > 0) {
                  DummyData[0].NodeID = `Dummy${node.NodeID}`;
                  node.Children = DummyData;
                }
              })
            : [];
        NeedtocollapseItems = [];
        setchildren.forEach(node => {
          NeedtocollapseItems.push(node.NodeID.toString());
        });
        props.UpdateExpandNodeId(NeedtocollapseItems);

        let user =
          folders && folders.length
            ? folders.map(fold => {
                fold.Children.forEach(node => {
                  if (ProcessID === node.NodeID) {
                    node.Children = setchildren;
                  } else {
                    if (node.Children && node.Children.length) {
                      childNodeUpdate(node.Children);
                    }
                  }
                });
              })
            : null;

        function childNodeUpdate(arraytocheck) {
          arraytocheck.forEach(node => {
            if (ProcessID === node.NodeID) {
              node.Children = setchildren;
            } else {
              if (node.Children && node.Children.length) {
                childNodeUpdate(node.Children);
              }
            }
          });
        }

        //  user = folders && folders.length ? setFolders(folders) :null;
        //setFolders(folders);
        setCompleterendering(true);
      }
      let url = document.referrer;
      let spliturl = _.split(url, "/nodes/", 2);
      let id = _.split(spliturl[1], "?", 1);

      let url1 = decodeURIComponent(props.location.search);
      let spliturl1 = _.split(url1, "/nodes/", 2);
      let id1 = _.split(spliturl1[1], "?", 1);
      const fetchpathData = async () => {
        if (id[0] || id1[0]) {
          Loading = true;
          const response = await AGOApi.getFoldersPath(
            parseInt(id[0] ? id[0] : id1[0])
          );
          if (response !== null) {
            for (var i = 0; response.data.length > i; i++) {
              Loading = true;
              var item = response.data[i];
              //const res = await AGOApi.getFolders(item.NodeID);
              await fetchData(item.NodeID);
              if (i === response.data.length - 1) {
                props.FolderIDChanged(item.NodeID.toString());
              }
            }
          }

          // response.data.forEach((item) => {
          //   const res = await AGOApi.getFolders(ProcessID);
          //    performload(res , ProcessID);
          //   console.log("final",ProcessID);
          //   fetchData(item.NodeID);
          // });
          Loading = false;
          NormalFlow = true;
        }
      };
      if (url && !NormalFlow && id[0]) {
        fetchpathData();
      } else if (url1 && !NormalFlow && id1[0]) {
        fetchpathData();
      } else if (props.NodeID) {
        fetchData(props.NodeID);
      }
    }
  }, [props.NodeID, FoldersReady]);

  useEffect(() => {
    const fetchData = async ProcessID => {
      Loading = true;
      const res = await AGOApi.getFolders(ProcessID);
      Loading = false;
      if (res !== null) {
        Loading = false;
        await performload(res, ProcessID);
      }
    };
    function performload(res, ProcessID) {
      setCompleterendering(false);
      SetcurrentNodeId(ProcessID);
      if (ProcessID === 2000) {
        const folderloop = () => {
          let folderdata = folders;
          folderdata.map(fold => {
            if (fold.NodeID === 2000) {
              fold.Children = res.data;
            }
          });
          return folderdata;
        };
        // setFolders(folderloop())
        folders = folderloop();
      } else if (ProcessID === UserId) {
        const folderloop = () => {
          let folderdata = folders;
          folderdata.map(fold => {
            if (fold.NodeID === UserId) {
              fold.Children = res.data;
            }
          });
          return folderdata;
        };
        // setFolders(folderloop())
        folders = folderloop();
      }
      let setchildren = res.data;
      let set =
        setchildren && setchildren.length
          ? setchildren.map(node => {
              if (node.ChildCount > 0) {
                DummyData[0].NodeID = `Dummy${node.NodeID}`;
                node.Children = DummyData;
              }
            })
          : [];

      let user =
        folders && folders.length
          ? folders.map(fold => {
              fold.Children.forEach(node => {
                if (ProcessID === node.NodeID) {
                  node.Children = setchildren;
                } else {
                  if (node.Children && node.Children.length) {
                    childNodeUpdate(node.Children);
                  }
                }
              });
            })
          : null;

      function childNodeUpdate(arraytocheck) {
        arraytocheck.forEach(node => {
          if (ProcessID === node.NodeID) {
            node.Children = setchildren;
          } else {
            if (node.Children && node.Children.length) {
              childNodeUpdate(node.Children);
            }
          }
        });
      }
      // setFolders(folders);
      setCompleterendering(true);
      Loading = false;
    }
    const fetchpathData = async () => {
      if (props.ShowEmailFolderID) {
        const response = await AGOApi.getFoldersPath(
          parseInt(props.ShowEmailFolderID)
        );
        if (response !== null) {
          for (var i = 0; response.data.length > i; i++) {
            Loading = true;
            var item = response.data[i];
            //const res = await AGOApi.getFolders(item.NodeID);
            await fetchData(item.NodeID);
            if (i === response.data.length - 1) {
              props.FolderIDChanged(item.NodeID.toString());
            }
          }
          // response.data.forEach((item) => {
          //   const res = await AGOApi.getFolders(ProcessID);
          //    performload(res , ProcessID);
          //   console.log("final",ProcessID);
          //   fetchData(item.NodeID);
          // });
          Loading = false;
          props.showEmailFolderIDUpdate();
        }
      }
    };
    if (props.ShowEmailFolderID) {
      fetchpathData();
    }
  }, [props.ShowEmailFolderID]);

  useEffect(() => {
    const fetchData = async () => {
      Loading = true;
      const res = await AGOApi.getSingleFolder(2000);
      if (res !== null) {
        res.data.Children = DummyData;
        let folder = [];
        folder.push(res.data);
        const user = await AGOApi.getUserId("alvin");
        if (user !== null) {
          setUserId(user.data);
          const response = await AGOApi.getSingleFolder(user.data);
          if (response !== null) {
            response.data.Children = DummyData;
            folder.push(response.data);
            // setFolders(folder);
            Loading = false;
          } else {
            Loading = false;
            Setrenderprocess(!renderprocess);
          }
        } else {
          Loading = false;
          Setrenderprocess(!renderprocess);
        }
        folders = folder;
        setFoldersReady(true);
      } else {
        Loading = false;
        Setrenderprocess(!renderprocess);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (RenderingComplete) {
      props.ExpandItems();
    }
  }, [RenderingComplete, props.NodeID]);

  useEffect(() => {
    if (props.NodeID === currentNodeId) {
      props.ExpandItems();
    }
  });

  let folderIconCSUI = () => {
    return (
      <img
        className="ago-csui-icon"
        alt=""
        src={process.env.PUBLIC_URL + "/assets/mime_folder.svg"}
      />
    );
  };

  const renderTree = nodes => (
    <StyledTreeItem
      key={nodes.NodeID}
      nodeId={nodes.NodeID.toString()}
      labelText={nodes.Name}
      labelIcon={folderIconCSUI}
    >
      {Array.isArray(nodes.Children)
        ? nodes.Children.map(node => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  return (
    <div>
      {Loading ? <Loader /> : null}
      {folders && folders.length
        ? folders.map(mapfold => {
            return renderTree(mapfold);
          })
        : null}
    </div>
  );
}
FolderTreeItem.propTypes = {
  FolderNodeID: PropTypes.number.isRequired,
  FolderNodeName: PropTypes.string.isRequired
};
export default withRouter(FolderTreeItem);

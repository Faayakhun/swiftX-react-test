//sticky seems to work
import React, { useState, useEffect } from "react";
import Loader from "../common/Loader";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  useSortBy,
  useTable,
  useExpanded,
  useBlockLayout,
  useResizeColumns
} from "react-table";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import UpDownIcon from "@material-ui/icons/UnfoldMore";
// import AttachmentIcon from "@material-ui/icons/AttachFileRounded";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import EmailAttachmentsSubview from "./EmailAttachmentsSubview";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faCommentDots as faCommentDots_solid
} from "@fortawesome/free-solid-svg-icons";
import { faCommentDots as faCommentDots_regular } from "@fortawesome/free-regular-svg-icons";
import { useSticky } from "react-table-sticky";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import "./react-contextmenu.scss";
import AGOApi from "../../api/AGOApi";
// import { colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
// import CircularProgress from '@material-ui/core/CircularProgress';

//alvin: made use of styled components because the example provided at react-table uses it, and i don't know how to translate into normal css.lol
const Styles = styled.div`
  .table-hover tbody tr:hover td,
  .table-hover tbody tr:hover th {
    background-color: #b3d9ff;
  }
  .expandedRow {
    background: #a6a6a6;
  }
  .childRow {
    background: #e6e6e6;
    font-size: smaller;
  }
  .selectedRow {
    background: #bbceed;
  }
  th {
    background: white;
    position: sticky;
    top: -1px;
  }
  .cell_overflow {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .table {
    .tr {
      text-align: left;
      border-bottom: 1px solid #ddd;
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      :hover {
        background: #bbceed;
      }
    }
    .header {
      background-color: #f1f1f1;
    }
    .headerIcon {
      vertical-align: middle;
      margin-left: 8px;
      margin-right: 4px;
    }
    .th {
    }
    .td {
      //background-color: #fff;//if this is enabled, then we will see weird grid lines
    }
    .th,
    .td {
      color: #333;
      padding-top: 8px;
      padding-bottom: 8px;
      overflow: hidden;
      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        width: 1px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        background: #c4c3d4;
        padding-left: 1px;
        padding-right: 1px;
        cursor: auto !important;
        &.isResizing {
          background: #a4a1d6;
          width: 1px;
          padding-left: 2px;
          padding-right: 2px;
          cursor: auto !important;
        }
      }
    }

    &.sticky {
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 2px 2px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }
    }
  }
  .clickable {
    cursor: pointer;
  }
`;

function CustomTable({
  data,
  EmailIDChanged,
  AttachmentSectionToggle,
  AttachmentSelection,
  SortingUpdate,
  ConversationSet,
  isSearchView,
  normalSortingUpdate,
  Keyword,
  showEmailFolder,
  relatedConversation,
  ConversationView,
  setAttachmentloading
}) {
  // Use the state and functions returned from useTable to build your UI
  const [selectedEmailID, setSelectedEmailID] = useState(-1);
  const [selectedAttachmentID, setSelectedAttachmentID] = useState(-1);
  const [SortFields, setSortFields] = useState("Received");
  const [FinalSortColumn, setFinalSortColumn] = useState("Received");
  const [FinalSortingAPIColumn, setFinalSortingAPIColumn] = useState(
    "OTEmailReceivedDate"
  );
  const [SortingArray, setSortingArray] = useState([]);
  const [conversation, setconversation] = useState(false);
  const [SortType, setSortingType] = useState("Desc");
  const [columns] = useState([
    {
      id: "expander",
      Header: "",
      Rowname: "ShowasConversation",
      width: "4%",
      HeaderSpace: "",
      RowSpace: "",
      Cell: ({ row, rows, toggleRowExpanded }) =>
        // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
        // to build the toggle for expanding a row

        row.canExpand
          ? (row.depth === -2 ? row.toggleRowExpanded() : null,
            (row.depth = row.depth === -2 ? 0 : row.depth),
            (
              <span
                {...row.getToggleRowExpandedProps({
                  style: {
                    // We can even use the row.depth property
                    // and paddingLeft to indicate the depth
                    // of the row
                    //////alvin: styles doesn't seem to be reflected on the expanded rows, seem to only apply to expansion icon
                    //paddingLeft: `${row.depth * 2}rem`
                  },
                  onClick: () => {
                    ///////////////////alvin: this is from an example where they contract all other rows after expanding on a row///////////////
                    //const expandedRow = rows.find(row => row.isExpanded);

                    // if (expandedRow) {
                    //   const isSubItemOfRow = Boolean(
                    //     expandedRow && row.id.split(".")[0] === expandedRow.id
                    //   );

                    //   if (isSubItemOfRow) {
                    //     const expandedSubItem = expandedRow.subRows.find(
                    //       subRow => subRow.isExpanded
                    //     );

                    //     if (expandedSubItem) {
                    //       const isClickedOnExpandedSubItem =
                    //         expandedSubItem.id === row.id;
                    //       if (!isClickedOnExpandedSubItem) {
                    //         toggleRowExpanded(expandedSubItem.id, false);
                    //       }
                    //     }
                    //   } else {
                    //     toggleRowExpanded(expandedRow.id, false);
                    //   }
                    // }
                    ////////////////////////////////alvin:end/////////////////////
                    row.toggleRowExpanded();
                  }
                })}
              >
                {row.isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </span>
            ))
          : null
    },
    {
      Header: <FontAwesomeIcon icon={faPaperclip} size="sm" />,
      id: "attachmentHeader",
      accessor: "hasAttachments",
      Rowname: "HasAttachments",
      width: "3%",
      textAlign: "center",
      HeaderSpace: "",
      RowSpace: "5px",
      Cell: props => {
        return (
          <span>
            {props.row.original.HasAttachments === 1 ? (
              <FontAwesomeIcon
                className="clickable"
                icon={faPaperclip}
                size="sm"
                onClick={e => _AttachmentClicked(e, props.row)}
              />
            ) : null}
          </span>
        );
      }
    },
    {
      Header: "From",
      accessor: "emailFrom",
      Rowname: "EmailFrom",
      SortColumn: "OTEmailFrom",
      width: "18%",
      HeaderSpace: "8px",
      RowSpace: "",
      Cell: props => {
        return (
          <span
            className="draggable-header"
            style={{ marginLeft: "10px" }}
            title={props.row.original.EmailFrom}
          >
            {props.row.original.EmailFrom}
          </span>
        );
      },
      FieldSorted: false,
      isSortedAsc: false,
      isResizing: true
    },
    {
      Header: "Subject",
      Rowname: "EmailSubject",
      accessor: "emailSubject",
      SortColumn: "OTEmailSubject",
      width: "25%",
      HeaderSpace: "8px",
      RowSpace: "",
      isResizing: true,
      Cell: props => {
        return (
          <span
            style={{ marginLeft: "10px" }}
            title={props.row.original.EmailSubject}
          >
            {props.row.original.EmailSubject}
          </span>
        );
      },
      FieldSorted: false,
      isSortedAsc: false
    },
    {
      Header: "Received",
      accessor: "receivedDate",
      Rowname: "ReceivedDate",
      SortColumn: "OTEmailReceivedDate",
      width: "15%",
      HeaderSpace: "8px",
      RowSpace: "",
      Cell: props => {
        const custom_date = moment(props.row.original.ReceivedDate).format(
          "ddd DD-MMM-YYYY hh:mm A"
        );
        return (
          <span style={{ marginLeft: "10px" }} title={custom_date}>
            {custom_date}
          </span>
        );
      },
      FieldSorted: false,
      isSortedAsc: false
    },
    {
      Header: "To",
      accessor: "emailTo",
      Rowname: "EmailTo",
      SortColumn: "OTEmailTo",
      width: "20%",
      HeaderSpace: "8px",
      RowSpace: "",
      Cell: props => {
        let addresses =
          props.row.original.EmailTo &&
          props.row.original.EmailTo.split(";")
            .join(";\n")
            .toString();
        return (
          <span style={{ marginLeft: "10px" }} title={addresses}>
            {addresses}
          </span>
        );
      },
      FieldSorted: false,
      isSortedAsc: false
    },
    {
      Header: "Sent",
      accessor: "sentDate",
      Rowname: "SentDate",
      SortColumn: "OTEmailSentDate",
      width: "15%",
      HeaderSpace: "8px",
      RowSpace: "",
      Cell: props => {
        const custom_date = moment(props.row.original.SentDate).format(
          "ddd DD-MMM-YYYY hh:mm A"
        );
        return (
          <span
            style={{ marginLeft: "10px" }}
            title={custom_date === "Invalid date" ? "" : custom_date}
          >
            {custom_date === "Invalid date" ? "" : custom_date}
          </span>
        );
      },
      FieldSorted: true,
      isSortedAsc: true
    }
  ]);

  const _EmailIDChanged = e => {
    EmailIDChanged(e.original.NodeID);
    setSelectedEmailID(e.original.NodeID);
    setSelectedAttachmentID("");
  };

  const showFolderOption = value => {
    showEmailFolder(value);
  };

  const relatedConversationOption = value => {
    relatedConversation(value);
  };

  const _AttachmentIDChanged = AttachmentID => {
    EmailIDChanged(AttachmentID);
    setSelectedAttachmentID(AttachmentID);
    setSelectedEmailID("");
  };
  const _AttachmentClicked = (e, row) => {
    e.stopPropagation();
    AttachmentSectionToggle(row);
  };

  const defaultColumn =
    (() => ({
      minWidth: 10,
      width: 80
    }),
    []);

  function ColumnOnChange(name, columnName, type, sortcolumn) {
    if (
      columnName !== "ShowasConversation" &&
      columnName !== "HasAttachments"
    ) {
      // if (!ConversationView) {
      let typeofsort = "";
      if (SortFields === name) {
        if (SortType === "Asc") {
          typeofsort = "Desc";
          setSortingType("Desc");
        } else {
          typeofsort = "Asc";
          setSortingType("Asc");
        }
      } else {
        if (name === "From" || name === "Subject" || name === "To") {
          typeofsort = "Asc";
          setSortingType("Asc");
        } else {
          typeofsort = "Desc";
          setSortingType("Desc");
        }
      }
      setSortFields(name);
      setFinalSortColumn(columnName);
      setFinalSortingAPIColumn(sortcolumn);
      SortingUpdate(sortcolumn, typeofsort);
      // } else {
      //   Sorting(name, columnName, type, sortcolumn);
      // }
    } else {
      if (columnName !== "HasAttachments" && !isSearchView) {
        ConversationSet(!conversation);
        setconversation(!conversation);
      }
    }
  }

  // function Sorting(name, columnName, type, sortcolumn) {
  //   let typeofsort = "";
  //   if (type === "sort") {
  //     if (SortFields === name) {
  //       if (SortType === "Asc") {
  //         typeofsort = "Desc";
  //         setSortingType("Desc");
  //       } else {
  //         typeofsort = "Asc";
  //         setSortingType("Asc");
  //       }
  //     } else {
  //       if (name === "From" || name === "Subject" || name === "To") {
  //         typeofsort = "Asc";
  //         setSortingType("Asc");
  //       } else {
  //         typeofsort = "Desc";
  //         setSortingType("Desc");
  //       }
  //     }
  //   } else {
  //     if (type === "Default") {
  //       typeofsort = "Desc";
  //       setSortingType("Desc");
  //     } else {
  //       typeofsort = SortType;
  //     }
  //   }

  //   rows.sort((previous, current) => {
  //     if (previous.original[columnName] === current.original[columnName]) {
  //       return 0;
  //     }
  //     if (previous.original[columnName] > current.original[columnName]) {
  //       return typeofsort === "Desc" ? -1 : 1;
  //     } else {
  //       return typeofsort === "Asc" ? -1 : 1;
  //     }
  //   });
  //   let Mainrows = rows.filter((r) => {
  //     return r.depth === 0;
  //   });
  //   let Subrows = rows.filter((r) => {
  //     return r.depth !== 0;
  //   });
  //   let finalarray = [];
  //   Mainrows.map((item, index) => {
  //     finalarray.push(item);
  //     if (item.isExpanded) {
  //       Subrows.map((item1, index1) => {
  //         item.subRows.map((sub, subIndex) => {
  //           if (sub.id === item1.id && sub.depth !== -1) {
  //             finalarray.push(item1);
  //           }
  //         });
  //       });
  //     }
  //   });
  //   // finalarray = finalarray.filter((r) => {
  //   //   return r.depth !== -1;
  //   // });
  //   // finalarray.map((item, index) => {
  //   //   if(item.depth === -2) {
  //   //     if(typeof item.toggleRowExpanded === "function") {
  //   //       item.toggleRowExpanded();
  //   //     }
  //   //   }
  //   // });
  //   setSortingArray(finalarray);
  //   setFinalSortColumn(columnName);
  //   setSortFields(name);
  //   normalSortingUpdate(sortcolumn, typeofsort);
  // }

  let {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetExpanded: false
    },
    useSortBy,
    useExpanded, // useGroupBy would be pretty useless without useExpanded ;)
    useBlockLayout,
    useSticky,
    useResizeColumns
  );
  useEffect(() => {
    setSelectedEmailID(-1);
    // if (ConversationView) {
    //   Sorting(SortFields, FinalSortColumn, "", FinalSortingAPIColumn);
    // } else {
    setSortingArray(rows);
    //}
  }, [rows]);

  useEffect(() => {
    if (rows && !AttachmentSelection) {
      rows.map(row => {
        if (row.isExpanded) {
          row.isExpanded = false;
          row.depth = -2;
        }
      });
    }
  }, [data]);
  // Render the UI for your table
  return (
    <div {...getTableProps()} className="table sticky text-center ">
      <div className="header" style={{ width: "100%" }}>
        {headerGroups.map(headerGroup => (
          <div
            {...headerGroup.getHeaderGroupProps()}
            className="header_row tr align-middle"
          >
            {headerGroup.headers.map(column => {
              let resizeClasses = classNames({
                resizer:
                  column.id !== "expander" && column.id !== "attachmentHeader",
                isResizing: column.isResizing
              });
              return (
                <div
                  {...column.getHeaderProps()}
                  nowrap="nowrap"
                  className="th align-middle"
                  onClick={() =>
                    ColumnOnChange(
                      column.Header,
                      column.Rowname,
                      "sort",
                      column.SortColumn
                    )
                  }
                  style={{
                    width: column.width,
                    display: "inline-block",
                    boxSizing: "border-box",
                    position: "relative",
                    marginLeft: column.HeaderSpace,
                    textAlign: column.textAlign
                  }}
                >
                  {column.render("Header")}
                  {column.id === "expander" ? (
                    isSearchView || ConversationView ? null : conversation ? (
                      <FontAwesomeIcon
                        className="clickable"
                        icon={faCommentDots_solid}
                        title="Show as Conversations"
                        size="sm"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="clickable"
                        icon={faCommentDots_regular}
                        title="Show as Conversations"
                        size="sm"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                      />
                    )
                  ) : column.id !== "attachmentHeader" ? (
                    <span>
                      {column.Header === SortFields ? (
                        SortType === "Desc" ? (
                          <img
                            className="ago-csui-icon-sm"
                            alt=""
                            src={
                              process.env.PUBLIC_URL + "/assets/sort_down.svg"
                            }
                          />
                        ) : (
                          <img
                            className="ago-csui-icon-sm"
                            alt=""
                            src={
                              process.env.PUBLIC_URL + "/assets/sort_down.svg"
                            }
                            style={{ transform: "scale(-1 , -1)" }}
                          />
                        )
                      ) : null
                      // <FontAwesomeIcon icon={faSort} className="headerIcon" />
                      }
                    </span>
                  ) : null}

                  {/* Use column.getResizerProps to hook up the events correctly */}
                  <div />
                  <span
                    {...column.getResizerProps()}
                    className={resizeClasses}
                  ></span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div
        {...getTableBodyProps()}
        className="body"
        style={{ minHeight: window.innerHeight * (78.5 / 100) + "px" }}
      >
        {SortingArray.map((row, i) => {
          prepareRow(row);
          return TableRow(
            row,
            row.original.Summary,
            Keyword,
            selectedEmailID,
            i,
            _EmailIDChanged,
            _AttachmentIDChanged,
            isSearchView,
            showFolderOption,
            relatedConversationOption,
            ConversationView,
            selectedAttachmentID,
            setAttachmentloading
          );
        })}
      </div>
    </div>
  );
}

function TableRow(
  row,
  summary,
  Keyword,
  selectedEmailID,
  i,
  _EmailIDChanged,
  _AttachmentIDChanged,
  isSearchView,
  showFolderOption,
  relatedConversationOption,
  ConversationView,
  selectedAttachmentID,
  setAttachmentloading
) {
  let rowClasses = classNames({
    tr: true,
    expandedRow: row.isExpanded,
    childRow: row.depth > 0,
    selectedRow: row.original.NodeID === selectedEmailID
  });
  function openInNewTab(e, row) {
    if (row.original.NodeID > 0) {
      let url = "".concat(
        process.env.REACT_APP_FRAME_URL_1,
        row.original.NodeID.toString(),
        process.env.REACT_APP_FRAME_URL_2
      );
      window.open(url, "_blank");
    }
  }
  function openProperties(e, row) {
    if (row.original.NodeID > 0) {
      let url = "".concat(
        process.env.REACT_APP_VIEW_PROPERTIES_URL,
        row.original.NodeID.toString()
      );
      window.open(url, "_blank");
    }
  }

  function permission(e, row) {
    if (row.original.NodeID > 0) {
      let url = "".concat(
        process.env.REACT_APP_VIEW_PROPERTIES_URL,
        row.original.NodeID.toString() + "/permissions/explorer"
      );
      window.open(url, "_blank");
    }
  }

  function downloademail(e, row) {
    if (row.original.NodeID > 0) {
      let url = "".concat(
        process.env.REACT_APP_DOWNLOAD_URL_1,
        row.original.NodeID.toString(),
        process.env.REACT_APP_DOWNLOAD_URL_2
      );
      window.open(url, "_self");
    }
  }

  function showEmailFolder(e, row) {
    if (row.original.NodeID > 0) {
      showFolderOption(row.original.NodeID);
    }
  }

  function relatedEmail(e, row) {
    if (row.original.NodeID > 0) {
      relatedConversationOption(row.original.NodeID);
    }
  }

  let dummydata = `<div><p>Hi this is my print content</p>download<div>`;
  function printemail(e, row) {
    // if (row.original.NodeID > 0) {
    //   let url = "".concat(
    //     process.env.REACT_APP_API_URL,
    //     `/emails/content?id=${row.original.NodeID.toString()}&userName=alvin`,
    //   );
    //   window.open(url, "_blank");
    // }
    // const fetchData = async (id) => {
    //   const res = await AGOApi.emailPrint(id);
    //   const blob = new Blob([res.data], { type: "application/vnd.ms-outlook" });
    //   console.log("blob",blob)
    // }
    if (row.original.NodeID > 0) {
      //   fetchData(row.original.NodeID);

      let url = "".concat(
        process.env.REACT_APP_FRAME_URL_1,
        row.original.NodeID.toString(),
        process.env.REACT_APP_FRAME_URL_2
      );
      let newWindow = window.open();
      newWindow.document.write(dummydata);
      newWindow.focus();
      newWindow.print();
      newWindow.close();
    }
  }

  function getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.toString().split(new RegExp(`(${highlight})`, "gi"));
    return parts.map(part =>
      part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part
    );
  }

  function rowhighlight(text, highlight, rowname) {
    if (
      !_.isEmpty(text.props.cell.row.original[rowname]) &&
      text.props.cell.row.original[rowname] !== "ShowasConversation" &&
      text.props.cell.row.original[rowname] !== "HasAttachments"
    ) {
      const parts = text.props.cell.row.original[rowname]
        .toString()
        .split(new RegExp(`(${highlight})`, "gi"));
      return parts.map(part =>
        part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part
      );
    }
    // Split text on highlight term, include term itself into parts, ignore case
  }

  function setAttachloading(value) {
    setAttachmentloading(value);
  }

  return (
    <div key={i}>
      <ContextMenuTrigger id={"ctxmenuemails" + i}>
        <ContextMenu id={"ctxmenuemails" + i}>
          <MenuItem data={row} onClick={openInNewTab}>
            Open
          </MenuItem>
          <MenuItem divider />
          {/* <MenuItem>Reply</MenuItem>
          <MenuItem>Reply All</MenuItem>
          <MenuItem>Forward</MenuItem> */}
          {!ConversationView ? (
            <MenuItem data={row} onClick={relatedEmail}>
              Find Related Message
            </MenuItem>
          ) : null}
          {isSearchView || ConversationView ? (
            <MenuItem data={row} onClick={showEmailFolder}>
              Show Folder
            </MenuItem>
          ) : null}
          <MenuItem data={row} onClick={downloademail}>
            Download
          </MenuItem>
          {/* <MenuItem data={row} onClick={printemail}>Print</MenuItem> */}
          <MenuItem divider />
          <MenuItem data={row} onClick={openProperties}>
            View Properties
          </MenuItem>
          <MenuItem data={row} onClick={permission}>
            View Permission
          </MenuItem>
          {/* <MenuItem divider />
          <MenuItem>Cancel</MenuItem> */}
        </ContextMenu>
        <div
          {...row.getRowProps()}
          onClick={() => _EmailIDChanged(row)}
          className={rowClasses}
          style={{ width: "100%" }}
        >
          {row.cells.map(cell => {
            let cellClasses = classNames({
              td: true,
              cell_overflow: true
            });
            return (
              <div
                className={cellClasses}
                {...cell.getCellProps()}
                style={{
                  width: cell.column.width,
                  display: "inline-block",
                  boxSizing: "border-box",
                  paddingLeft: cell.column.RowSpace
                }}
              >
                {isSearchView ? (
                  cell.column.Rowname !== "HasAttachments" ? (
                    <span
                      className="row_show"
                      title={
                        cell.render("Cell").props.cell.row.original[
                          cell.column.Rowname
                        ]
                      }
                    >
                      {rowhighlight(
                        cell.render("Cell"),
                        Keyword,
                        cell.column.Rowname
                      )}
                    </span>
                  ) : (
                    <span className="row_show">{cell.render("Cell")}</span>
                  )
                ) : (
                  <span className="row_show">{cell.render("Cell")}</span>
                )}
              </div>
            );
          })}
          { (
            <span className="summary_show" title={summary}>
              {" "}
              {summary !== null && summary !== undefined
                ? getHighlightedText(summary, Keyword)
                : ""}
            </span>
          )}
        </div>
      </ContextMenuTrigger>
      {row.original.attachmentsectionshown ? (
        <EmailAttachmentsSubview
          EmailID={row.original.NodeID}
          AttachmentIDChanged={_AttachmentIDChanged}
          selectedAttachmentID={selectedAttachmentID}
          setAttachloading={setAttachloading}
        />
      ) : null}
    </div>
  );
}

function EmailsSection(props) {
  const [emails, setEmails] = useState([]);
  const [SortDirect, setSortDirect] = useState("");
  const [SortSortColumn, setSortColumn] = useState("");
  const [PrevSortcolumn, setPrevSortcolumn] = useState("OTEmailReceivedDate");
  const [PrevSortdirc, setPrevSortdirc] = useState("Desc");
  const [conversation, setconversation] = useState(false);
  const [conversationID, setconversationID] = useState(""); // conversationview
  const [Loading, setLoading] = useState(false);
  const [Folderview, setFolderview] = useState(false);
  const [Totalcount, setTotalcount] = useState(0); //pagination
  const [Recordfrom, setRecordfrom] = useState(1); //pagination
  const [Paginationpagecount, setPaginationpagecount] = useState(0); //pagination
  const [Pagelimit, setPagelimit] = useState(30); //pagination
  const [PageNumber, setPageNumber] = useState(1); //pagination
  const [Listtotal, setListtotal] = useState(1); //pagination
  const [MaxcountReach, setMaxcountReach] = useState(false);
  const [Maxcount, setMaxcount] = useState(0);
  const [AttachmentSelection, setAttachmentSelection] = useState(false);
  const [isEmailsListingOverflowed, setIsEmailsListingOverflowed] = useState(
    false
  );
  const [emailsListingLimit, setEmailsListingLimit] = useState(0);

  function EmailIDChanged(id) {
    props.ContentIDChanged(id);
  }

  function showEmailFolder(value) {
    props.showEmailFolder(value);
    setFolderview(true);
  }

  function relatedConversation(value) {
    setconversationID(value);
    props.UpdateConversationView(value);
    setFolderview(false);
  }

  const useStyles = makeStyles(theme => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(2)
      }
    }
  }));

  const classes = useStyles();

  function SortingUpdate(sortcolumn, sortdirc) {
    setSortDirect(sortdirc);
    setSortColumn(sortcolumn);
    setPrevSortcolumn(sortcolumn);
    setPrevSortdirc(sortdirc);
    setRecordfrom(1);
    setPageNumber(1);
  }

  function normalSortingUpdate(sortcolumn, sortdirc) {
    setPrevSortcolumn(sortcolumn);
    setPrevSortdirc(sortdirc);
  }

  function ConversationSet(value) {
    setconversation(value);
    setIsEmailsListingOverflowed(value);
  }

  function SelectOptionforSearch() {
    var x = document.getElementById("pagelimit").value;
    setPagelimit(x);
    setRecordfrom(1);
    setPageNumber(1);
  }

  function setAttachmentloading(value) {
    setLoading(value);
  }

  const AttachmentSectionToggle = async row => {
    setAttachmentSelection(true);
    setEmails(prevEmails => {
      let newEmails = [...prevEmails];
      let [prevIndex, prevSubIndex] = row.id.split(".");
      // const fetchAttachmentData = async () => {
      //   setLoading(true);
      //   const res = await AGOApi.getEmailAttachments(row.original.NodeID);
      //   let fetchedData = [];
      //   if (res !== null) {
      //     fetchedData = res.data;
      //   }
      //   if (fetchedData.length > 0) {
      //   }
      //   setLoading(false);
      // };
      // fetchAttachmentData();
      //emails may be nested
      if (prevSubIndex >= 0) {
        //nested
        let newEmail = newEmails[prevIndex];
        let newSubEmail = newEmail.subRows[prevSubIndex];
        if (row.original.attachmentsectionshown) {
          newSubEmail.attachmentsectionshown = false;
        } else {
          newSubEmail.attachmentsectionshown = true;
        }
        newEmail.subRows[prevSubIndex] = newSubEmail;
        newEmails[prevIndex] = newEmail;
      } else {
        //not nested
        let newEmail = newEmails[prevIndex];
        if (row.original.attachmentsectionshown) {
          newEmail.attachmentsectionshown = false;
        } else {
          newEmail.attachmentsectionshown = true;
        }
        newEmails[prevIndex] = newEmail;
      }
      return newEmails;
    });
  };

  useEffect(() => {
    setRecordfrom(1);
    setPageNumber(1);
  }, [props.SearchType]);

  useEffect(() => {
    setRecordfrom(1);
    setPageNumber(1);
  }, [props.FolderIDSelected]);

  useEffect(() => {
    setSortDirect(PrevSortdirc);
    setSortColumn(PrevSortcolumn);
    if (props.Search) setFolderview(false);
  }, [props.Search]);

  useEffect(() => {
    setFolderview(props.FolderView);
  }, [props.FolderView]);

  //use effect is like on load
  useEffect(() => {
    try {
      setAttachmentSelection(false);
      const fetchData = async () => {
        setLoading(true);
        const res = await AGOApi.getEmails(
          props.FolderIDSelected,
          Recordfrom,
          Pagelimit,
          SortSortColumn,
          SortDirect.toLowerCase(),
          conversation
        );
        let fetchedData = null;
        if (res !== null) {
          fetchedData = res.data;
        }
        if (
          fetchedData &&
          fetchedData.EmailInfos &&
          fetchedData.EmailInfos.length > 0
        ) {
          // let grouped = _.mapValues(
          //   _.groupBy(fetchedData, "ConversationId"),
          //   clist => clist.map(conv => _.omit(conv, "ConversationId"))
          // );

          // fetchedData.sort(function (a, b) {
          //   // Turn your strings into dates, and then subtract them
          //   // to get a value that is either negative, positive, or zero.
          //   return new Date(b.ReceivedDate) - new Date(a.ReceivedDate);
          // });

          if (conversation) {
            let grouped = _(fetchedData.EmailInfos)
              // Group the elements of Array based on `color` property
              .groupBy("ConversationId")
              // `key` is group's name (color), `value` is the array of objects
              .map((value, key) => {
                let conv = value[0];
                let emails = value.slice(1, value.length);
                conv.subRows = emails; //alvin: it has to be subrows for the expansion to work
                return conv;
              })
              .value();
            fetchedData.EmailInfos = grouped;
            setPaginationpagecount(0);
            setListtotal(0);
            setTotalcount(0);
            setMaxcountReach(fetchedData.IsMaxCountReached);
            setMaxcount(fetchedData.MaxCount);
          } else {
            setPaginationpagecount(fetchedData.NumberOfPages);
            setListtotal(fetchedData.TotalCount);
            setTotalcount(fetchedData.TotalCount);
            setMaxcountReach(false);
            setMaxcount(0);
          }

          setEmails(fetchedData.EmailInfos);
        } else {
          setEmails([]);
          setTotalcount(0);
          setPaginationpagecount(0);
        }
        setLoading(false);
      };
      const SearchData = async () => {
        setLoading(true);
        const res = await AGOApi.searchEmail(
          props.SearchKeyword,
          props.advanceSearchIn === "All"
            ? 2000
            : props.FolderIDSelected
            ? props.FolderIDSelected
            : 2000,
          Recordfrom,
          Pagelimit,
          SortSortColumn,
          SortDirect.toLowerCase(),
          props.advanceSearchIn,
          props.advanceContainattachment,
          props.advanceSearchFrom,
          props.advanceSearchTo,
          props.advanceSearchSubject,
          props.ReceivedFrom,
          props.ReceivedTo,
          props.advanceSearchEnable
        );
        props.UpdateSearch();
        let fetchedData = [];
        if (res !== null) {
          fetchedData = res.data;
        } else {
          fetchedData = res;
        }
        if (fetchedData !== null) {
          let total = fetchedData.ActualCount;
          setTotalcount(total);
          setListtotal(1);
          let pagecount = total / Pagelimit;
          setPaginationpagecount(pagecount);
          setEmails(fetchedData.EmailInfos);
        } else {
          setEmails([]);
          setTotalcount(0);
          setPaginationpagecount(0);
        }
        setLoading(false);
      };

      const conversationViewData = async () => {
        setLoading(true);
        const res = await AGOApi.getConversation(
          conversationID === "" ? props.ConversationId : conversationID,
          SortSortColumn,
          SortDirect.toLowerCase()
        );
        let fetchedData = [];
        if (res !== null) {
          fetchedData = res.data;
        } else {
          fetchedData = res;
        }
        if (fetchedData !== null) {
          let total = fetchedData.ActualCount;
          setTotalcount(total);
          setListtotal(1);
          let pagecount = total / Pagelimit;
          setPaginationpagecount(pagecount);
          setEmails(fetchedData.EmailInfos);
        } else {
          setEmails([]);
          setTotalcount(0);
          setPaginationpagecount(0);
        }
        setLoading(false);
      };
      if (props.Search) {
        setRecordfrom(1);
        setPageNumber(1);
      } else if (
        Folderview &&
        props.FolderView &&
        !props.Search &&
        !props.ConversationView
      ) {
        fetchData();
      }
      if (
        props.ConversationView &&
        !props.Searchbarshow &&
        !props.FolderView &&
        !Folderview
      ) {
        setIsEmailsListingOverflowed(true);
        conversationViewData();
      } else if (props.IsSearchState && !props.ConversationView) {
        setIsEmailsListingOverflowed(false);
        SearchData();
      } else if (
        props.FolderIDSelected &&
        !props.IsSearchState &&
        !props.Searchbarshow &&
        !props.ConversationView
      ) {
        //is a number
        fetchData();
      } else if (!props.IsSearchState && !props.Searchbarshow) {
        setEmails([]);
      }
    } catch (e) {
      alert(e);
    }
  }, [
    props.FolderIDSelected,
    conversation,
    Pagelimit,
    Recordfrom,
    props.Search,
    props.SearchType,
    SortSortColumn,
    SortDirect,
    props.ConversationView,
    props.FolderClick,
    Folderview
  ]);

  const handlePageChange = (event, value) => {
    let recordfrom = 1;
    if (props.IsSearchState) {
      recordfrom = Pagelimit * (value - 1) + 1;
    } else {
      recordfrom = value;
    }
    value === 1 ? setRecordfrom(1) : setRecordfrom(recordfrom);
    setPageNumber(value);
  };

  return (
    <React.Fragment>
      <Styles>
        {Loading ? <Loader /> : null}
        <CustomTable
          data={emails}
          setAttachmentloading={setAttachmentloading}
          EmailIDChanged={EmailIDChanged}
          SortingUpdate={(sortcolumn, sortdirc) =>
            SortingUpdate(sortcolumn, sortdirc)
          }
          normalSortingUpdate={(sortcolumn, sortdirc) =>
            normalSortingUpdate(sortcolumn, sortdirc)
          }
          ConversationSet={ConversationSet}
          width={400}
          AttachmentSectionToggle={AttachmentSectionToggle}
          AttachmentSelection={AttachmentSelection}
          isSearchView={props.IsSearchState}
          Keyword={props.SearchKeyword}
          ConversationView={props.ConversationView}
          showEmailFolder={value => showEmailFolder(value)}
          relatedConversation={value => relatedConversation(value)}
        />
      </Styles>
      {Totalcount > 0 && !isEmailsListingOverflowed ? (
        <div className="card pagination_card">
          <div style={{ display: "inline" }}>
            {Listtotal > 0 ? (
              <span className="font-weight-bold">About {Totalcount} items</span>
            ) : null}
            <select
              className="Pagination_limit font-weight-bold"
              value={Pagelimit}
              id="pagelimit"
              style={{ height: "40px" }}
              onChange={() => SelectOptionforSearch()}
            >
              <option className="Select_Items" value={30}>
                30 per page
              </option>
              <option className="Select_Items" value={50}>
                50 per page
              </option>
              <option className="Select_Items" value={100}>
                100 per page
              </option>
            </select>
            <Pagination
              count={Math.ceil(Paginationpagecount)}
              size={window.innerWidth > 1600 ? "large" : "medium"}
              page={PageNumber}
              style={{
                float: "right",
                marginTop: window.innerWidth > 1600 ? "" : "5px"
              }}
              shape="rounded"
              showFirstButton
              siblingCount={0}
              showLastButton
              onChange={handlePageChange}
            />
          </div>
        </div>
      ) : null}
      {isEmailsListingOverflowed && MaxcountReach ? (
        <div
          className="card pagination_card font-weight-bold"
          style={{ height: "40px" }}
        >
          <span className="mt-2">
            {" "}
            Showing the top {Maxcount} emails in this folder
          </span>
        </div>
      ) : null}
    </React.Fragment>
  );
}
EmailsSection.propTypes = {
  FolderIDSelected: PropTypes.string.isRequired,
  ContentIDChanged: PropTypes.func.isRequired,
  showAsConversation: PropTypes.bool.isRequired
};
export default EmailsSection;

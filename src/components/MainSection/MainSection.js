import React, { useState, useEffect, useRef } from "react";
import "./MainSection.scss";
import FolderTreeSection from "../FolderTreeSection/FolderTreeSection";
import EmailsSection from "../EmailsSection/EmailsSection";
import ContentSection from "../ContentSection/ContentSection";
import SplitPane from "react-split-pane";
import queryString from "query-string";
import SearchIcon from "../assets/icons/search_header_white.svg";
import SearchDropdown from "../assets/icons/caret_down_white.svg";
import ClearInput from "../assets/icons/formfield_clear24.svg";
import HomeButton from "../assets/icons/home.svg";
import Logo from "../assets/header_content_server.svg";
import CloseImage from "../assets/Close_Icon.png";
import Breadcrumb from "../assets/icons/breadcrumb_arrow.svg";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import { debug } from "js-logger";
import { isIE } from "react-device-detect";
import DatePicker from "react-datepicker";
import CalendarContainer from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const cookies = new Cookies();

// Advance Search Default
// let initialFromDate = `${new Date().getFullYear()}-${(
//   "0" +
//   (new Date().getMonth() + 1)
// ).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`;
// let initialToDate = `${new Date().getFullYear()}-${(
//   "0" +
//   (new Date().getMonth() + 1)
// ).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`;
let initialFromDate = new Date();
let initialToDate = new Date();
let searchIn = "All";
let Containattachment = "UNDEFINED";
let advancesearchstart = false;
let folderfullpathlist = [];
let foldermaxwidth = 0;
let emailminwidth = 0;

function MainSection(props) {
  //   var xhttp = new XMLHttpRequest();
  // var data = {};
  // xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //        // Typical action to be performed when the document is ready:
  //        data = JSON.parse(xhttp.responseText);
  //     }
  // };

  // xhttp.open("GET", `${process.env.PUBLIC_URL}/config.json`, true);
  // console.log("cong",xhttp)
  // xhttp.send();
  //  var cong =  process.env.PUBLIC_URL + '/config.json';
  //  console.log("cong",cong)
  //   // Search Inputs
  // cookie="username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";

  // const [foldermaxwidth, setfoldermaxwidth] = useState(0);
  // const [emailminwidth, setemailminwidth] = useState(0);

  const [BreadcrumbId, setBreadcrumbId] = useState("");
  const [renderPurose, setRenderPurose] = useState(false);
  const [ReceivedFrom, setReceivedFrom] = useState(initialFromDate);
  const [ReceivedTo, setReceivedTo] = useState(initialToDate);
  const [advanceSearchIn, setSearchIn] = useState(searchIn);
  const [advanceContainattachment, setadvanceContainattachment] = useState(
    Containattachment
  );
  const [advanceSearchFrom, setadvanceSearchFrom] = useState("");
  const [advanceSearchSubject, setadvanceSearchSubject] = useState("");
  const [advanceSearchTo, setadvanceSearchTo] = useState("");
  const [advanceSearchEnable, setadvanceSearchEnable] = useState(false);
  const [showAdvanceSearchForm, setshowAdvanceSearchForm] = useState(false);

  const [previousKeyword, setPreviouskeyword] = useState("");
  const [previousSearchtype, setprevioussearchtype] = useState("");

  // End Search
  const [goBacklink, setgoBacklink] = useState("");
  const [Previouslink, setPreviouslink] = useState("");
  const [ConversationId, setConversationId] = useState(false);

  const [folderIDSelected, setFolderIDSelected] = useState("");
  const [contentIDSelected, setContentIDSelected] = useState(-1);
  const [SearchType, setSearchType] = useState("All");
  const [previousContentIDSelected, setPreviousContentIDSelected] = useState(
    -1
  );
  const [positionBeforeEmails, setPositionBeforeEmails] = useState("");
  const [positionAfterEmails, setPositionAfterEmails] = useState("");
  const [panelHidden, setPannelHidden] = useState(false);
  const [ShowFolderID, setShowFolderID] = useState("");
  const [Searchbarshow, setSearchbarshow] = useState(false);
  const [ConversationView, setConversationView] = useState(false); // know the currentview purpose
  const [FolderView, setFolderView] = useState(false);
  const [FolderClick, setFolderClick] = useState(false);
  const [SearchContent, setSearchContent] = useState("");
  const [SearchKeyword, setSearchKeyword] = useState("");
  const [IsSearchState, setIsSearchState] = useState(false);
  const [Search, setSearch] = useState(false);
  // const [emailSectionWidth, setEmailSectionWidth] = React.useState(
  //   positionAfterEmails - positionBeforeEmails
  // );
  const [showAsConversation, setShowAsConversation] = React.useState(true);
  const textInput = useRef(null);

  useEffect(() => {
    if (cookies.get("emailwidth")) {
      setPositionAfterEmails(cookies.get("emailwidth"));
    } else {
      // setPositionAfterEmails(window.innerWidth * (70/100))
    }
    if (cookies.get("folderwidth")) {
      setPositionBeforeEmails(cookies.get("folderwidth"));
    } else {
      // setPositionBeforeEmails(window.innerWidth * (15/100));
    }
  }, []);
  function FolderIDChanged(id) {
    if (folderIDSelected === id) {
      setFolderClick(!FolderClick);
    }
    setPreviouslink(goBacklink !== "folder" ? goBacklink : "");
    setFolderIDSelected(id);
    setFolderView(true);
    setIsSearchState(false);
    setadvanceSearchEnable(false);
    setshowAdvanceSearchForm(false);
    setSearchbarshow(false);
    setPreviouskeyword(SearchContent);
    setSearchContent("");
    setConversationView(false);
    setgoBacklink("folder");
  }
  function ContentIDChanged(id) {
    setContentIDSelected(id);
  }
  function ShowAsConversationChanged(checked) {
    setShowAsConversation(checked);
  }
  function HideContentSection() {
    setPreviousContentIDSelected(contentIDSelected);
    setContentIDSelected(-1); //-1 will force ContentSection to not render
  }
  function ShowContentSection() {
    setContentIDSelected(previousContentIDSelected);
  }
  function SizeChangedAfterEmails(size) {
    setPositionAfterEmails(parseInt(Math.round(size)));
    foldermaxwidth = "";
    if (size - positionBeforeEmails < window.innerWidth * (60 / 100)) {
      emailminwidth = size;
    }
    cookies.set("emailwidth", size);
  }
  function SizeChangedBeforeEmails(size) {
    setPositionBeforeEmails(parseInt(Math.round(size)));
    emailminwidth = "";
    if (positionAfterEmails - size < window.innerWidth * (50 / 100)) {
      foldermaxwidth = size;
    }
    cookies.set("folderwidth", size);
  }

  function CollapsePanel() {
    //setPositionAfterEmails("");
    panelHidden ? setPannelHidden(false) : setPannelHidden(true);
  }

  function UpdateSearch() {
    setSearch(false);
    advancesearchstart = false;
  }

  function UpdateConversationView(value) {
    setFolderView(false);
    setConversationId(value);
    setPreviouslink(goBacklink);
    setConversationView(true);
    setgoBacklink("conversation");
    setIsSearchState(false);
    setadvanceSearchEnable(false);
    setSearchbarshow(false);
    setPreviouskeyword(SearchContent);
    setSearchContent("");
    setshowAdvanceSearchForm(false);
    if (props.location.search !== "") props.history.push("/browser");
  }

  useEffect(() => {
    if (Searchbarshow) {
      textInput.current.focus();
    }
  }, [Searchbarshow]);

  function clearInput() {
    setSearchContent("");
  }

  function showEmailFolder(value) {
    setShowFolderID(value);
    setIsSearchState(false);
    // setConversationView(false);
  }

  function SearchBar(type, keyword, from) {
    setprevioussearchtype(type);
    if (!Searchbarshow && from !== "previous") {
      setSearchbarshow(true);
    } else if (
      keyword !== "" ||
      (advancesearchstart && type === "advanceSearch")
    ) {
      setPreviouslink(goBacklink);
      setIsSearchState(true);
      setSearch(true);
      setSearchKeyword(keyword);
      setConversationView(false);
      setFolderView(false);
      setgoBacklink("search");
      if (props.location.search !== "") props.history.push("/browser");
    }
  }

  function SelectOptionforSearch(e) {
    if (e.target.id === "myadvancesearchattach") {
      var y = document.getElementById("myadvancesearchattach").value;
      setadvanceContainattachment(y);
    }
    if (e.target.id === "myadvancesearchin") {
      var z = document.getElementById("myadvancesearchin").value;
      setSearchIn(z);
    }
  }

  function advanceSearchFormReset() {
    setReceivedFrom(initialFromDate);
    setReceivedTo(initialToDate);
    setSearchIn(searchIn);
    setadvanceContainattachment(Containattachment);
    setadvanceSearchFrom("");
    setadvanceSearchSubject("");
    setadvanceSearchTo("");
    advanceSearchEnable
      ? (advancesearchstart = true)
      : (advancesearchstart = false);
    SearchBar("advanceSearch", SearchContent);
  }

  function handleSearchBar(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      SearchBar("search", SearchContent);
    }
  }

  function showEmailFolderIDUpdate() {
    setShowFolderID("");
  }

  function OnHandleSubmit(e) {
    setadvanceSearchEnable(true);
    e.preventDefault();
    setshowAdvanceSearchForm(false);
    advancesearchstart = true;
    SearchBar("advanceSearch", SearchContent);
  }

  function advancesearchDate(e) {
    if (e.target.id === "todate") {
      setReceivedTo(e.target.value);
    }
    if (e.target.id === "fromdate") {
      setReceivedFrom(e.target.value);
    }
  }

  function folderFullpath(value) {
    folderfullpathlist = value;
    setRenderPurose(!renderPurose);
  }

  function outsideclick(event) {
    if (
      event.target.id !== "search" &&
      event.target.id !== "advancesearch" &&
      event.target.id !== "clear" &&
      event.target.id !== "myinput" &&
      event.target.id !== "myselect" &&
      event.target.id !== "myadvancesearchin" &&
      event.target.id !== "myadvancesearchattach" &&
      event.target.id !== "formlabel" &&
      event.target.id !== "todate" &&
      event.target.id !== "fromdate" &&
      //for IE11, as for some reason, it can't detect the target id
      event.target.parentElement.id !== "search" &&
      event.target.parentElement.id !== "advancesearch" &&
      event.target.parentElement.id !== "clear" &&
      event.target.parentElement.id !== "myinput" &&
      event.target.parentElement.id !== "myselect" &&
      event.target.parentElement.id !== "myadvancesearchin" &&
      event.target.parentElement.id !== "myadvancesearchattach" &&
      event.target.parentElement.id !== "formlabel" &&
      event.target.parentElement.id !== "todate" &&
      event.target.parentElement.id !== "fromdate"
    ) {
      if (
        event.target.className &&
        typeof event.target.className.includes !== "undefined" &&
        event.target.className.includes("datepicker") === false
      ) {
        setSearchbarshow(false);
        setshowAdvanceSearchForm(false);
      }
    }
  }

  function homeClick() {
    window.open(process.env.REACT_APP_HOME_URL, "_self");
  }

  function Breadcrumbclick(id) {
    setBreadcrumbId(id);
  }

  function Breadcrump() {
    let length = folderfullpathlist.length;
    return folderfullpathlist && folderfullpathlist.length ? (
      folderfullpathlist.map((item, i) => {
        if (i === length - 1) {
          return i === 0 ? (
            <span style={{ color: "#c3e5f6" }} key={i}>
              {item.Name}
            </span>
          ) : (
            <span className="ml-2" key={i}>
              <img src={Breadcrumb} alt=""></img>
              <span className={`ml-2`} style={{ color: "#c3e5f6" }} key={i}>
                {" "}
                {item.Name}
              </span>
            </span>
          );
        } else {
          return i === 0 ? (
            <span
              onClick={() => Breadcrumbclick(item.NodeID)}
              className="breadcrumbstyle"
              key={i}
            >
              {item.Name}
            </span>
          ) : (
            <span className="ml-2" key={i}>
              <img src={Breadcrumb} alt=""></img>
              <span
                className={`ml-2`}
                className="breadcrumbstyle"
                key={i}
                onClick={() => Breadcrumbclick(item.NodeID)}
              >
                {" "}
                {item.Name}
              </span>
            </span>
          );
        }
      })
    ) : FolderView ? (
      <span style={{ color: "#c3e5f6" }}>Email in folder </span>
    ) : (
      <span style={{ color: "rgba(0,0,0,.25)" }}>Email in folder </span>
    );
  }

  function previousgo() {
    if (goBacklink === "conversation") {
      setConversationView(false);
      setgoBacklink(Previouslink);
      if (Previouslink === "search") {
        setSearchContent(previousKeyword);
        if (previousSearchtype === "advanceSearch") {
          advancesearchstart = true;
          setadvanceSearchEnable(true);
        }
        SearchBar(previousSearchtype, previousKeyword, "previous");
      }
    } else if (goBacklink === "folder") {
      setFolderView(false);
      if (Previouslink === "search") {
        setSearchContent(previousKeyword);
        if (previousSearchtype === "advanceSearch") {
          advancesearchstart = true;
          setadvanceSearchEnable(true);
        }
        SearchBar(previousSearchtype, previousKeyword, "previous");
      } else {
        setConversationView(true);
        setgoBacklink("conversation");
      }
    }
    setPreviouslink("");
  }

  let userId = 0;

  try {
    let params = queryString.parse(props.location.search);
    let userIdFromQuery = params.userid;
    if (userIdFromQuery > 0) {
      userId = userIdFromQuery;
    }
  } catch (error) {
    //expected, no user id
    console.log("failed to get user id..");
  }

  //console.log("size", positionBeforeEmails, positionAfterEmails);
  return (
    <div onClick={e => outsideclick(e)}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div style={{ width: "50%" }}>
          {/* <FontAwesomeIcon
                icon={faHome}
                title="Home"
                size="sm"
                style={{
                  color: "white",
                  fontSize: "30px",
                  cursor: "pointer",
                  marginLeft: "5%",
                }}
                onClick={() => homeClick()}
              /> */}
          <div>
            <img
              src={HomeButton}
              title="Home"
              height="45px"
              style={{ cursor: "pointer", zIndex: "9999" }}
              alt=""
              onClick={() => homeClick()}
            />
          </div>
        </div>
        <div
          style={{
            marginLeft: "5%",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)"
          }}
          className="navbar-brand mx-auto d-block text-center order-0 order-md-1 w-25"
          hidden={Searchbarshow}
        >
          <img src={Logo} height="30px" alt="" hidden={Searchbarshow} />
        </div>
        <div className="searchpossition">
          <form
            className="form-inline my-2 my-lg-0"
            hidden={!Searchbarshow}
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <div
              style={{ zIndex: "99" }}
              id="advancesearch"
              onClick={() => setshowAdvanceSearchForm(!showAdvanceSearchForm)}
            >
              <img
                src={SearchDropdown}
                title="Advance Search"
                id="advancesearch"
                height="40px"
                alt=""
              />
            </div>
            <input
              ref={textInput}
              id="myinput"
              value={SearchContent}
              onKeyUp={e => handleSearchBar(e)}
              onChange={e => setSearchContent(e.target.value)}
              type="text"
              className="Search_Bar"
              placeholder="Search"
              title="Enter your search term"
              aria-label="Enter your search term"
            ></input>
            {isIE === false ? (
              <div
                style={{ marginLeft: "-25px", zIndex: "999" }}
                id="clear"
                hidden={SearchContent === "" ? true : false}
                onClick={() => clearInput()}
              >
                <img
                  src={ClearInput}
                  title="Clear Search Input"
                  className="responsive"
                  height="20px"
                  alt=""
                  id="clear"
                />
              </div>
            ) : null}
          </form>
          <div
            id="myinput"
            className="card container mt-2"
            style={{
              zIndex: "9",
              width: "38%",
              position: "absolute",
              marginLeft: "3%"
            }}
            hidden={!showAdvanceSearchForm}
          >
            <form
              id="myinput"
              className="mt-3 fullwidth"
              onSubmit={e => OnHandleSubmit(e)}
            >
              <div className="form-group row mt-1">
                <label
                  id="formlabel"
                  className="col-sm-3 col-form-label text-dark"
                >
                  Search In
                </label>
                <div className="col-sm-9">
                  <select
                    id="myadvancesearchin"
                    className="form-control"
                    value={advanceSearchIn}
                    onChange={e => SelectOptionforSearch(e)}
                  >
                    <option value="All">All (Enterprise)</option>
                    <option value="Current">This folder</option>
                  </select>
                </div>
              </div>
              <div className="form-group row mt-1">
                <label
                  id="formlabel"
                  className="col-sm-3 col-form-label text-dark"
                >
                  Contains attachment
                </label>
                <div className="col-sm-9">
                  <select
                    id="myadvancesearchattach"
                    className="form-control"
                    value={advanceContainattachment}
                    onChange={e => SelectOptionforSearch(e)}
                  >
                    <option value="UNDEFINED">Specify</option>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                  </select>
                </div>
              </div>
              <div className="form-group row mt-1">
                <label
                  id="formlabel"
                  className="col-sm-3 col-form-label text-dark"
                >
                  From
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="myinput"
                    value={advanceSearchFrom}
                    onChange={e => setadvanceSearchFrom(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row mt-1">
                <label
                  id="formlabel"
                  className="col-sm-3 col-form-label text-dark"
                >
                  Received From
                </label>
                <div className="col-sm-4">
                  {/* {isIE ? (
                    <DatePicker
                      width="100%"
                      id="fromdate"
                      className="form-control"
                      selected={ReceivedFrom}
                      onChange={date => setReceivedFrom(date)}
                    />
                  ) : (
                    <input
                      type="date"
                      className="form-control"
                      id="fromdate"
                      value={ReceivedFrom.toISOString().substr(0, 10)}
                      onChange={e => advancesearchDate(e)}
                    />
                  )} */}
                  <DatePicker
                    width="100%"
                    id="fromdate"
                    className="form-control"
                    selected={ReceivedFrom}
                    onChange={date => setReceivedFrom(date)}
                  />
                </div>
                <div className="col-sm-1">
                  <label id="formlabel" className="col-form-label text-dark">
                    To
                  </label>
                </div>
                <div className="col-sm-4">
                  {/* {isIE ? (
                    <DatePicker
                      width="100%"
                      id="todate"
                      className="form-control"
                      selected={ReceivedTo}
                      onChange={date => setReceivedTo(date)}
                    />
                  ) : (
                    <input
                      type="date"
                      className="form-control"
                      id="todate"
                      min={ReceivedFrom}
                      value={ReceivedTo}
                      onChange={e => advancesearchDate(e)}
                    />
                  )} */}
                  <DatePicker
                    width="100%"
                    id="todate"
                    className="form-control"
                    selected={ReceivedTo}
                    onChange={date => setReceivedTo(date)}
                  />
                </div>
              </div>
              <div className="form-group row mt-1">
                <label
                  id="formlabel"
                  className="col-sm-3 col-form-label text-dark"
                >
                  Subject
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="myinput"
                    value={advanceSearchSubject}
                    onChange={e => setadvanceSearchSubject(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row mt-1">
                <label
                  id="formlabel"
                  className="col-sm-3 col-form-label text-dark"
                >
                  To
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="myinput"
                    value={advanceSearchTo}
                    onChange={e => setadvanceSearchTo(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3" style={{ float: "right" }}>
                <button
                  id="formlabel"
                  type="submit"
                  className="btn btn-primary"
                >
                  Search
                </button>
                <button
                  id="formlabel"
                  type="button"
                  className="btn btn-primary ml-2"
                  onClick={() => advanceSearchFormReset()}
                >
                  Clear Filter
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          className="brightness nav justify-content-end"
          style={{
            cursor: "pointer"
          }}
          id="search"
        >
          <img
            src={SearchIcon}
            title="Search"
            className="responsive"
            height="45px"
            width={isIE ? "65px" : "45px"}
            alt=""
            id="search"
            onClick={() => SearchBar("search", SearchContent)}
          />
        </div>
      </nav>
      <span className="information_bar row">
        {ConversationView
          ? "Items in Email Conversation"
          : IsSearchState
          ? "Search Results"
          : Breadcrump()}
        {Previouslink !== "" && !IsSearchState ? (
          <span
            className="ml-5"
            style={{ cursor: "pointer" }}
            onClick={() => previousgo()}
          >
            <u>Previous</u>
          </span>
        ) : null}
      </span>
      <SplitPane
        split="vertical"
        // minSize={panelHidden ? "100%" : "70%"}
        minSize={emailminwidth}
        maxSize={window.innerWidth * (90 / 100)}
        size={
          positionAfterEmails !== "" && !panelHidden
            ? positionAfterEmails + "px"
            : panelHidden
            ? "100%"
            : "70%"
        }
        // size={panelHidden ? "100%" : "70%"}
        onDragStarted={HideContentSection}
        // style={{minWidth:"736px"}}
        //we want to show and hide because during resizing the split spane by the user, if the cursor lands in an iframe, the dragging will fail
        onDragFinished={ShowContentSection}
        onChange={size => SizeChangedAfterEmails(size)}
        className="main_section"
      >
        <SplitPane
          split="vertical"
          // size={"300px"}
          size={
            positionBeforeEmails !== "" ? positionBeforeEmails + "px" : `250px`
          }
          // minSize={150}
          // maxSize={700}
          minSize={window.innerWidth * (10 / 100)}
          maxSize={foldermaxwidth}
          // style={{minWidth:"736px"}}
          onChange={size => SizeChangedBeforeEmails(size)}
        >
          <div className="folderview_section">
            {/* <div className="control_section">
            <ControlSection
              showAsConversationChanged={ShowAsConversationChanged}
              showAsConversation={showAsConversation}
            ></ControlSection>
          </div> */}
            <FolderTreeSection
              FolderIDChanged={FolderIDChanged}
              userId={userId}
              ShowEmailFolderID={ShowFolderID}
              showEmailFolderIDUpdate={() => showEmailFolderIDUpdate()}
              folderFullpath={value => folderFullpath(value)}
              BreadcrumbId={BreadcrumbId}
            />
          </div>
          <div className="emails_section flex">
            <EmailsSection
              FolderIDSelected={folderIDSelected}
              ContentIDChanged={ContentIDChanged}
              showAsConversation={showAsConversation}
              userId={userId}
              showEmailFolder={value => showEmailFolder(value)}
              Searchbarshow={Searchbarshow}
              IsSearchState={IsSearchState}
              SearchKeyword={SearchKeyword}
              FolderView={FolderView}
              UpdateSearch={UpdateSearch}
              UpdateConversationView={UpdateConversationView}
              ConversationView={ConversationView}
              ConversationId={ConversationId}
              Search={Search}
              SearchType={SearchType}
              FolderClick={FolderClick}
              advanceSearchEnable={advanceSearchEnable}
              advanceSearchIn={advanceSearchIn}
              advanceContainattachment={advanceContainattachment}
              advanceSearchFrom={advanceSearchFrom}
              advanceSearchTo={advanceSearchTo}
              advanceSearchSubject={advanceSearchSubject}
              ReceivedFrom={ReceivedFrom}
              ReceivedTo={ReceivedTo}
            />
            {/* <TableView /> */}
          </div>
          <div>
            <div className="vl" style={{ float: "left" }}></div>
          </div>
        </SplitPane>
        {/* <div>
      <FontAwesomeIcon icon={faPaperclip} size="sm" />
      </div> */}
        {!panelHidden ? (
          <div className="content_section">
            {/* <span style={{marginTop: "20%"}}>
          <img src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-right-arrow-icon-png-image_956430.jpg" 
          style={{width: "17px",height: "41px"}} ></img></span> */}
            <ContentSection ContentIDSelected={contentIDSelected} />
            <div>
              <div className="vl" style={{ float: "left" }}>
                {/* <FontAwesomeIcon
                  icon={faArrowCircleRight}
                  size="sm"
                  style={{
                    marginTop: "50vh",
                    cursor: "pointer",
                    marginLeft: "-20px",
                    fontSize: "20px",
                  }}
                  onClick={() => CollapsePanel()}
                /> */}
                <div>
                  <img
                    src={CloseImage}
                    style={{
                      marginTop: "50vh",
                      cursor: "pointer",
                      marginLeft: "-30px",
                      transform: "scale(-1 , -1)"
                    }}
                    height="30px"
                    alt=""
                    onClick={() => CollapsePanel()}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div>
          <div className="vl" style={{ float: "left" }}>
            {" "}
          </div>
          {/* <FontAwesomeIcon
            icon={faArrowCircleLeft}
            size="sm"
            style={{
              marginTop: "50vh",
              cursor: "pointer",
              marginLeft: "-20px",
              fontSize: "20px",
            }}
            onClick={() => CollapsePanel()}
          /> */}
          <div>
            <img
              src={CloseImage}
              style={{
                marginTop: "50vh",
                cursor: "pointer",
                marginLeft: "-30px"
              }}
              height="30px"
              alt=""
              onClick={() => CollapsePanel()}
            />
          </div>
        </div>
      </SplitPane>
    </div>
  );
}

export default withRouter(MainSection);

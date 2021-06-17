import React, { useState, useEffect } from "react";
import AGOApi from "../../api/AGOApi";
import PropTypes from "prop-types";
import "./EmailAttachmentsSubview.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Loader from "../common/Loader";
function EmailAttachmentsSubview(props) {
  const [attachments, setAttachments] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      //  setLoading(true);
      props.setAttachloading(true);
      const res = await AGOApi.getEmailAttachments(props.EmailID);
      if (res !== null) {
        // setLoading(false);
        props.setAttachloading(false);
        setAttachments(res.data);
      }
      props.setAttachloading(false);
    };
    fetchData();
  }, [props.EmailID]);

  const DownloadClicked = (e, attachment) => {
    e.stopPropagation();
    if (attachment.CSID > 0) {
      let url = "".concat(
        process.env.REACT_APP_DOWNLOAD_URL_1,
        attachment.CSID.toString(),
        process.env.REACT_APP_DOWNLOAD_URL_2
      );
      window.open(url, "_self");
    }
  };

  const attachmentSelection = id => {
    props.AttachmentIDChanged(id);
  };

  return (
    <div className="root">
      {/* <div className="container-fluid">
        <div className="row">
          
        </div>
      </div> */}
      <table className="table table-sm ">
        <thead>
          <tr>
            <th scope="col" style={{ width: "70%" }}>
              Attachment Name
            </th>
            <th scope="col" style={{ width: "20%" }}>
              Size
            </th>
            <th scope="col" style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(attachments).map(attachment => (
            <tr
              className="attachment"
              key={attachment.No}
              onClick={() => attachmentSelection(attachment.CSID)}
              style={{
                background:
                  attachment.CSID === props.selectedAttachmentID
                    ? "#bbceed"
                    : ""
              }}
            >
              <td>{attachment.FileName}</td>
              <td>{Math.round(attachment.FileSize / 1000)}KB</td>
              <td>
                <FontAwesomeIcon
                  className="clickable"
                  icon={faDownload}
                  size="sm"
                  onClick={e => DownloadClicked(e, attachment)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
EmailAttachmentsSubview.propTypes = {
  EmailID: PropTypes.number.isRequired,
  AttachmentIDChanged: PropTypes.func.isRequired
};
export default EmailAttachmentsSubview;

import Api from "./api";
import Logger from "js-logger";
import moment from "moment";

export default {
  getFolders(id) {
    // return Api()
    //   .get("folders/" + id + `?userName=${process.env.REACT_APP_TESTING_USER}`)
    //   .then(resp => {
    //     return resp;
    //   })
    //   .catch(error => {
    //     Logger.useDefaults();
    //     Logger.error("Logger::", error.message, error.toJSON());
    //     return null;
    //   });
    //MOCK START
    if (id === 2000) {
      return JSON.parse(
        `{"data":[{"NodeID":194424,"Name":"Agency","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":6},{"NodeID":350273,"Name":"anotherfolder","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":0},{"NodeID":196837,"Name":"AnotherFolderWithRM","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":5},{"NodeID":30703,"Name":"Business Admins Workspace","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":7},{"NodeID":256020,"Name":"created thru rest wrapper","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":0},{"NodeID":4440,"Name":"Email Filing Test","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":2},{"NodeID":204363,"Name":"Extended Email Management Workspace","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":1694},{"NodeID":226079,"Name":"Folder of Long path, like very very _ seriously long path. you can_t even phantom of how long this path is . seriously is there even such a long path in practice. it may be _ especially if its an email","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":24},{"NodeID":140158,"Name":"Folder with many folders","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":35},{"NodeID":349943,"Name":"folderWithCategory01","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":1},{"NodeID":181415,"Name":"loadtest","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":4},{"NodeID":338723,"Name":"sensitivitytest","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":1},{"NodeID":159864,"Name":"testofficeonline-govt-tech","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":11},{"NodeID":192031,"Name":"webreports","IconUri":null,"ParentNodeID":2000,"NodeType":"Folder","ChildCount":3}],"status":200,"statusText":"OK","headers":{"cache-control":"no-cache","content-length":"1820","content-type":"application/json; charset=utf-8","expires":"-1","pragma":"no-cache"},"config":{"url":"folders/2000?userName=alvin","method":"get","headers":{"Accept":"application/json, text/plain, */*"},"baseURL":"http://localhost/emailbrowserapi/api/v1","transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1},"request":{}}`
      );
    } else {
      return null;
    }
    //MOCK END//
  },

  getUserId(name) {
    // return Api()
    //   .get(`users/single/?userName=${process.env.REACT_APP_TESTING_USER}`)
    //   .then(resp => {
    //     return resp;
    //   })
    //   .catch(error => {
    //     Logger.useDefaults();
    //     Logger.error("Logger::", error.message, error.toJSON());
    //     return null;
    //   });

    //MOCK START
    return null;
    //MOCK END
  },

  getSingleFolder(id) {
    // return Api()
    //   .get(
    //     "folders/single?id=" +
    //       id +
    //       `&userName=${process.env.REACT_APP_TESTING_USER}`
    //   )
    //   .then(resp => {
    //     return resp;
    //   })
    //   .catch(error => {
    //     Logger.useDefaults();
    //     Logger.error("Logger::", error.message, error.toJSON());
    //     return null;
    //   });
    //MOCK START
    if (id === 2000) {
      return JSON.parse(
        `{"data":{"NodeID":2000,"Name":"Enterprise1","IconUri":null,"ParentNodeID":-1,"NodeType":"EnterpriseWS","ChildCount":23},"status":200,"statusText":"OK","headers":{"cache-control":"no-cache","content-length":"111","content-type":"application/json; charset=utf-8","expires":"-1","pragma":"no-cache"},"config":{"url":"folders/single?id=2000&userName=alvin","method":"get","headers":{"Accept":"application/json, text/plain, */*"},"baseURL":"http://localhost/emailbrowserapi/api/v1","transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1},"request":{}}`
      );
    } else {
      return null;
    }
    //MOCK END//
  },
  getFoldersPath(id) {
    return Api()
      .get(
        "folders/navigationpath/" +
          id +
          `?userName=${process.env.REACT_APP_TESTING_USER}`
      )
      .then(resp => {
        return resp;
      })
      .catch(error => {
        Logger.useDefaults();
        Logger.error("Logger::", error.message, error.toJSON());
        return null;
      });
  },

  getEmails(id, initialpoint, perpagecount, sortBy, sortdirc, conversation) {
    // const url = conversation
    //   ? "emails/list?id=" +
    //     id +
    //     `&includeConversationID=true&userName=${process.env.REACT_APP_TESTING_USER}&sortedBy=${sortBy}&sortDirection=${sortdirc}`
    //   : "emails/list/paginated?id=" +
    //     id +
    //     `&includeConversationID=true&userName=${process.env.REACT_APP_TESTING_USER}&pageNumber=${initialpoint}&pageSize=${perpagecount}&sortedBy=${sortBy}&sortDirection=${sortdirc}`;
    // return Api()
    //   .get(url)
    //   .then(resp => {
    //     console.log(JSON.stringify(resp));
    //     return resp;
    //   })
    //   .catch(error => {
    //     Logger.useDefaults();
    //     Logger.error("Logger::", error.message, error.toJSON());
    //     return null;
    //   });

    let mockData = `{"data":{"EmailInfos":[{"NodeID":226739,"Name":"many locations, like really alot , 18 ok 1 no perm_200528204255.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"many locations, like really alot , 18 ok 1 no perm","EmailTo":"'Alvin Lim'","EmailCC":null,"EmailFrom":"Alvin Lim JC","SentDate":"2020-05-28T20:42:55","ReceivedDate":"2020-05-28T20:42:55","ConversationId":"01D634ED821392EBAB7C9D3A4F0D9CC730C7077E92FA","HasAttachments":0,"FileSize":23552,"Summary":null},{"NodeID":182628,"Name":"RE_ 01 ask me again thread 24_200322141327.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: 01 ask me again thread 24","EmailTo":"'wrong@nothing.com'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T14:13:28","ReceivedDate":"2020-03-22T14:13:27","ConversationId":"0101481E43CA9C79FF12BAB69601CFBB380633CE690F","HasAttachments":0,"FileSize":28672,"Summary":null},{"NodeID":182627,"Name":"RE_ 01 ask me again thread 24_200322141305.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: 01 ask me again thread 24","EmailTo":"'wrong@nothing.com'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T14:13:05","ReceivedDate":"2020-03-22T14:13:05","ConversationId":"0101481E43CA9C79FF12BAB69601CFBB380633CE690F","HasAttachments":0,"FileSize":27136,"Summary":null},{"NodeID":182626,"Name":"01 ask me again thread 24_200322141220.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"01 ask me again thread 24","EmailTo":"'wrong@nothing.com'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T14:12:20","ReceivedDate":"2020-03-22T14:12:20","ConversationId":"01D60010D17E15DBA962426B4E52A0C7A490A6838409","HasAttachments":0,"FileSize":25600,"Summary":null},{"NodeID":182736,"Name":"RE_ ask me again pls_200322140930.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again pls","EmailTo":"'ubi'","EmailCC":null,"EmailFrom":"taiseng","SentDate":"2020-03-22T14:09:30","ReceivedDate":"2020-03-22T14:09:30","ConversationId":"0102B64EF9D71A7B907A2A13A0F2147F22FB36C0BEFF","HasAttachments":0,"FileSize":27136,"Summary":null},{"NodeID":183178,"Name":"RE_ ask me again pls_200322140908.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again pls","EmailTo":"'taiseng'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T14:09:09","ReceivedDate":"2020-03-22T14:09:08","ConversationId":"0102B64EF9D71A7B907A2A13A0F2147F22FB36C0BEFF","HasAttachments":0,"FileSize":32256,"Summary":null},{"NodeID":182406,"Name":"RE_ ask me again pls_200322140816.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again pls","EmailTo":"'ubi'","EmailCC":null,"EmailFrom":"taiseng","SentDate":"2020-03-22T14:08:17","ReceivedDate":"2020-03-22T14:08:16","ConversationId":"0102B64EF9D71A7B907A2A13A0F2147F22FB36C0BEFF","HasAttachments":0,"FileSize":26624,"Summary":null},{"NodeID":182405,"Name":"RE_ ask me again pls_200322140723.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again pls","EmailTo":"'taiseng'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T14:07:23","ReceivedDate":"2020-03-22T14:07:23","ConversationId":"0102B64EF9D71A7B907A2A13A0F2147F22FB36C0BEFF","HasAttachments":0,"FileSize":30720,"Summary":null},{"NodeID":183508,"Name":"RE_ ask me again pls_200322140406.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again pls","EmailTo":"'taiseng'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T14:04:07","ReceivedDate":"2020-03-22T14:04:06","ConversationId":"0102B64EF9D71A7B907A2A13A0F2147F22FB36C0BEFF","HasAttachments":0,"FileSize":30208,"Summary":null},{"NodeID":183177,"Name":"RE_ ask me again pls_200322140337.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again pls","EmailTo":"'ubi'","EmailCC":null,"EmailFrom":"taiseng","SentDate":"2020-03-22T14:03:38","ReceivedDate":"2020-03-22T14:03:37","ConversationId":"0102B64EF9D71A7B907A2A13A0F2147F22FB36C0BEFF","HasAttachments":0,"FileSize":24064,"Summary":null},{"NodeID":182847,"Name":"ask me again pls_200322140157.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"ask me again pls","EmailTo":"'taiseng'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T14:01:57","ReceivedDate":"2020-03-22T14:01:57","ConversationId":"01D6000F6165A83160778F74402497355B49AD6C057F","HasAttachments":0,"FileSize":25600,"Summary":null},{"NodeID":182625,"Name":"RE_ ask me again 1_200322135442.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again 1","EmailTo":"'ubi'","EmailCC":null,"EmailFrom":"taiseng","SentDate":"2020-03-22T13:54:43","ReceivedDate":"2020-03-22T13:54:42","ConversationId":"0102B16753DAE7804DBB022F83E8A6DE38BA4A25C68B","HasAttachments":0,"FileSize":28672,"Summary":null},{"NodeID":183506,"Name":"RE_ ask me again 1_200322135424.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again 1","EmailTo":"'taiseng'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T13:54:25","ReceivedDate":"2020-03-22T13:54:24","ConversationId":"0102B16753DAE7804DBB022F83E8A6DE38BA4A25C68B","HasAttachments":0,"FileSize":31232,"Summary":null},{"NodeID":182956,"Name":"RE_ ask me again 1_200322135339.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again 1","EmailTo":"'taiseng'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T13:53:41","ReceivedDate":"2020-03-22T13:53:39","ConversationId":"01D6000B7D9833FAA08B5D7845629362E00E36299546","HasAttachments":0,"FileSize":31744,"Summary":null},{"NodeID":182846,"Name":"RE_ ask me again 1_200322135321.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again 1","EmailTo":"'ubi'","EmailCC":null,"EmailFrom":"taiseng","SentDate":"2020-03-22T13:53:22","ReceivedDate":"2020-03-22T13:53:21","ConversationId":"01D6000B7D9833FAA08B5D7845629362E00E36299546","HasAttachments":0,"FileSize":26112,"Summary":null},{"NodeID":183176,"Name":"RE_ ask me again 1_200322133538.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again 1","EmailTo":"'taiseng'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T13:35:40","ReceivedDate":"2020-03-22T13:35:38","ConversationId":"01D6000B7D9833FAA08B5D7845629362E00E36299546","HasAttachments":0,"FileSize":28672,"Summary":null},{"NodeID":182296,"Name":"RE_ ask me again 1_200322133459.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again 1","EmailTo":"'ubi'","EmailCC":null,"EmailFrom":"taiseng","SentDate":"2020-03-22T13:35:00","ReceivedDate":"2020-03-22T13:34:59","ConversationId":"01D6000B7D9833FAA08B5D7845629362E00E36299546","HasAttachments":0,"FileSize":23040,"Summary":null},{"NodeID":182955,"Name":"RE_ ask me again 1_200322133433.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: ask me again 1","EmailTo":"'taiseng'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T13:34:34","ReceivedDate":"2020-03-22T13:34:33","ConversationId":"01D6000B7D9833FAA08B5D7845629362E00E36299546","HasAttachments":0,"FileSize":27136,"Summary":null},{"NodeID":183175,"Name":"ask me again 1_200322133407.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"ask me again 1","EmailTo":"'ubi'","EmailCC":null,"EmailFrom":"ubi","SentDate":"2020-03-22T13:34:07","ReceivedDate":"2020-03-22T13:34:07","ConversationId":"01D6000B7D9833FAA08B5D7845629362E00E36299546","HasAttachments":0,"FileSize":25088,"Summary":null},{"NodeID":183505,"Name":"RE_ test do not ask me again_010101000000_00.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: test do not ask me again","EmailTo":"'Alvin Lim JC'","EmailCC":null,"EmailFrom":"Alvin Lim","SentDate":"2020-03-22T13:33:00","ReceivedDate":"2020-03-22T13:33:03","ConversationId":"01D6000A59E2ED9E650482464325917731FB1115D3D3","HasAttachments":0,"FileSize":86016,"Summary":null},{"NodeID":182295,"Name":"RE_ test do not ask me again_010101000000.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: test do not ask me again","EmailTo":"'Alvin Lim JC'","EmailCC":null,"EmailFrom":"Alvin Lim","SentDate":"2020-03-22T13:30:58","ReceivedDate":"2020-03-22T13:30:59","ConversationId":"01D6000A59E2ED9E650482464325917731FB1115D3D3","HasAttachments":0,"FileSize":79360,"Summary":null},{"NodeID":182845,"Name":"test do not ask me again_200322132558.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"test do not ask me again","EmailTo":"'Alvin Lim'","EmailCC":null,"EmailFrom":"Alvin Lim JC","SentDate":"2020-03-22T13:25:58","ReceivedDate":"2020-03-22T13:25:58","ConversationId":"01D6000A59E2ED9E650482464325917731FB1115D3D3","HasAttachments":0,"FileSize":22016,"Summary":null},{"NodeID":149555,"Name":"RE_ test to old version_200309083710.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: test to old version","EmailTo":"'Alvin Lim'","EmailCC":null,"EmailFrom":"Alvin Lim JC","SentDate":"2020-03-09T08:37:10","ReceivedDate":"2020-03-09T08:37:10","ConversationId":"01D5F56BD02FEFCF9E06EFD04BECB6238D05970B211B","HasAttachments":0,"FileSize":25088,"Summary":null},{"NodeID":150103,"Name":"RE_ test to old version_200309013244.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: test to old version","EmailTo":"'Alvin Lim'","EmailCC":null,"EmailFrom":"Alvin Lim JC","SentDate":"2020-03-09T01:32:44","ReceivedDate":"2020-03-09T01:32:44","ConversationId":"01D5F56BD02FEFCF9E06EFD04BECB6238D05970B211B","HasAttachments":0,"FileSize":25088,"Summary":null},{"NodeID":150217,"Name":"RE_ test to old version_200309011239.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: test to old version","EmailTo":"'Alvin Lim'","EmailCC":null,"EmailFrom":"Alvin Lim JC","SentDate":"2020-03-09T01:12:39","ReceivedDate":"2020-03-09T01:12:39","ConversationId":"01D5F56BD02FEFCF9E06EFD04BECB6238D05970B211B","HasAttachments":0,"FileSize":25088,"Summary":null},{"NodeID":150216,"Name":"RE_ test to old version_200309010846.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: test to old version","EmailTo":"'Alvin Lim'","EmailCC":null,"EmailFrom":"Alvin Lim JC","SentDate":"2020-03-09T01:08:46","ReceivedDate":"2020-03-09T01:08:46","ConversationId":"01D5F56BD02FEFCF9E06EFD04BECB6238D05970B211B","HasAttachments":0,"FileSize":25088,"Summary":null},{"NodeID":150327,"Name":"RE_ test to old version_200309010652.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"RE: test to old version","EmailTo":"'Alvin Lim'","EmailCC":null,"EmailFrom":"Alvin Lim JC","SentDate":"2020-03-09T01:06:52","ReceivedDate":"2020-03-09T01:06:52","ConversationId":"01D5F56BD02FEFCF9E06EFD04BECB6238D05970B211B","HasAttachments":0,"FileSize":25088,"Summary":null},{"NodeID":149335,"Name":"test to old version_200309010552.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"test to old version","EmailTo":"'Alvin Lim'","EmailCC":null,"EmailFrom":"Alvin Lim JC","SentDate":"2020-03-09T01:05:53","ReceivedDate":"2020-03-09T01:05:52","ConversationId":"01D5F56BD02FEFCF9E06EFD04BECB6238D05970B211B","HasAttachments":0,"FileSize":22016,"Summary":null},{"NodeID":146811,"Name":"test002_200225161827.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"test002","EmailTo":"'Alvin Lim'","EmailCC":null,"EmailFrom":"Alvin Lim JC","SentDate":"2020-02-25T16:18:27","ReceivedDate":"2020-02-25T16:18:27","ConversationId":"01D5EBB41BFDAD6921E9521042D98BBD1AD6D47423A9","HasAttachments":0,"FileSize":22016,"Summary":null},{"NodeID":140163,"Name":"new recommended test 01 automatic_200219183609.msg","IconUri":null,"ParentNodeID":140158,"EmailSubject":"new recommended test 01 automatic","EmailTo":"'Alvin Lim'","EmailCC":null,"EmailFrom":"Alvin Lim JC","SentDate":"2020-02-19T18:36:10","ReceivedDate":"2020-02-19T18:36:09","ConversationId":"01D5E7106357F1B9F8F60F284E8385DBB413D6775DE9","HasAttachments":0,"FileSize":22016,"Summary":null}],"NumberOfPages":1,"PageNumber":1,"TotalCount":30,"PageSize":30,"SortedBy":"OTEmailReceivedDate","SortDirection":"desc"},"status":200,"statusText":"OK","headers":{"cache-control":"no-cache","content-length":"11822","content-type":"application/json; charset=utf-8","expires":"-1","pragma":"no-cache"},"config":{"url":"emails/list/paginated?id=140158&includeConversationID=true&userName=alvin&pageNumber=1&pageSize=30&sortedBy=OTEmailReceivedDate&sortDirection=desc","method":"get","headers":{"Accept":"application/json, text/plain, */*"},"baseURL":"http://localhost/emailbrowserapi/api/v1","transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1},"request":{}}`;
    let mockJSON = JSON.parse(mockData);
    mockJSON.data.EmailInfos.forEach(function(element) {
      element.Summary =
        "This is the email summary that is to be displayed along with each row.";
    });
    return mockJSON;
  },

  getEmailAttachments(id) {
    return Api()
      .get(
        "attachments/?id=" +
          id +
          `&userName=${process.env.REACT_APP_TESTING_USER}`
      )
      .then(resp => {
        return resp;
      })
      .catch(error => {
        Logger.useDefaults();
        Logger.error("Logger::", error.message, error.toJSON());
        return null;
      });
  },

  searchEmail(
    keyword,
    folderNodeID,
    initialpoint,
    perpagecount,
    sortBy,
    sortdirc,
    searchIn,
    attachment,
    from,
    to,
    subject,
    fromdate,
    todate,
    advancesearch
  ) {
    // let Receivedfrom = "";
    // if (fromdate) {
    //   Receivedfrom = moment(fromdate).format("YYYYMMDD");
    // }
    // let ReceivedTo = "";
    // if (todate) {
    //   ReceivedTo = moment(todate).format("YYYYMMDD");
    // }

    // if (!advancesearch)
    //   return Api()
    //     .get(
    //       "emails/search" +
    //         `?keywords=${keyword}&folderNodeID=${folderNodeID}&firstResultToRetrieve=${initialpoint}&numResultsToRetrieve=${perpagecount}&sortedBy=${sortBy}&sortDirection=${sortdirc}&userName=${process.env.REACT_APP_TESTING_USER}`
    //     )
    //     .then(resp => {
    //       console.log(JSON.stringify(resp));
    //       return resp;
    //     })
    //     .catch(error => {
    //       Logger.useDefaults();
    //       Logger.error("Logger::", error.message, error.toJSON());
    //       return null;
    //     });
    // return Api()
    //   .get(
    //     "emails/search" +
    //       `?keywords=${keyword}&folderNodeID=${folderNodeID}&firstResultToRetrieve=${initialpoint}&numResultsToRetrieve=${perpagecount}&sortedBy=${sortBy}&sortDirection=${sortdirc}&ReceivedDate_From=${Receivedfrom}&ReceivedDate_To=${ReceivedTo}&FilterByAttachment=${attachment}${
    //         subject ? `&EmailSubject=${subject}` : ""
    //       }${from ? `&EmailFrom=${from}` : ""}${
    //         to ? `&EmailTo=${to}` : ""
    //       }&userName=${process.env.REACT_APP_TESTING_USER}`
    //   )
    //   .then(resp => {
    //     return resp;
    //   })
    //   .catch(error => {
    //     Logger.useDefaults();
    //     Logger.error("Logger::", error.message, error.toJSON());
    //     return null;
    //   });

    //MOCK START
    return JSON.parse(
      `{"data":{"EmailInfos":[{"NodeID":401316,"Name":"FW  EAMS-EWP Access Control Management Slides","IconUri":null,"ParentNodeID":181415,"EmailSubject":"FW: EAMS-EWP Access Control Management Slides","EmailTo":"Sarah YAP (NSCS)","EmailCC":"","EmailFrom":"Erica HO (AGO)","SentDate":"2020-12-05T07:09:27","ReceivedDate":"2020-12-05T07:09:27","ConversationId":null,"HasAttachments":0,"FileSize":28160,"Summary":"To: Sarah YAP (NSCS) Cc: Subject: FW: EAMS-EWP Access Control Management Slides.  WARNING : This email may contain privileged and confidential information.  If you are not the intended recipient, please notify the sender immediately and delete the email and its attachments.  Unauthorised communication and disclosure of any information in the email is an offence under the Official Secrets Act (Cap."},{"NodeID":405387,"Name":"Test Email Restricted A.msg","IconUri":null,"ParentNodeID":349943,"EmailSubject":"RE: [Verification of whether all required records have been filed] V2: Record Repository & Document Repository","EmailTo":"Chew, David; Sylvia CHUNG (PUB); Florence POH (PUB); Chin Ai U (PUB); Sally TAN (PUB); Geraldine HO (PUB); Lim, Erlina","EmailCC":null,"EmailFrom":"Bee Cheng TEO (PUB)","SentDate":"2020-06-09T10:03:15","ReceivedDate":"2020-06-09T10:04:11","ConversationId":null,"HasAttachments":1,"FileSize":285696,"Summary":"If we don’t need a form, will it be possible to do like a simple annual declaration via the PUBWIKI portal?  If you are not the intended recipient, please notify the sender and delete the email.  Disclaimer: This email and any attachments are sent in strictest confidence for the sole use of the addressee and may contain legally privileged, confidential, and proprietary data.  If you are not the intended recipient, please advise the sender by replying prompty to this email and then delete and destroy this email and any attachments without any further use, copying or forwarding."}],"ListHead":1,"IncludeCount":2,"ActualCount":2,"Remarks":"Search Results: 1 to 3 of about 2"},"status":200,"statusText":"OK","headers":{"cache-control":"no-cache","content-length":"2020","content-type":"application/json; charset=utf-8","expires":"-1","pragma":"no-cache"},"config":{"url":"emails/search?keywords=recipient&folderNodeID=2000&firstResultToRetrieve=1&numResultsToRetrieve=30&sortedBy=OTEmailReceivedDate&sortDirection=desc&userName=alvin","method":"get","headers":{"Accept":"application/json, text/plain, */*"},"baseURL":"http://localhost/emailbrowserapi/api/v1","transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1},"request":{}}`
    );
    //MOCK END
  },

  getConversation(id, sortBy, sortdirc) {
    return Api()
      .get(
        `emails/conversation?emailID=${id}&userName=${process.env.REACT_APP_TESTING_USER}&sortedBy=${sortBy}&sortDirection=${sortdirc}`
      )
      .then(resp => {
        return resp;
      })
      .catch(error => {
        Logger.useDefaults();
        Logger.error("Logger::", error.message, error.toJSON());
        return null;
      });
  }

  // emailPrint(id) {
  //   return Api().get("emails/content" + `?id=${id}&userName=alvin`).then((resp) => {
  //     return resp
  // })
  // .catch((err) => {
  //   console.log(err,"error")
  // alert(err);

  //    return null
  // });;
  // },
};

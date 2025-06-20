import React, { useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { APP_ID, SERVER_SECRET } from "./Constant";

// Helper to generate a random string of given length
function randomID(length) {
  return Math.random().toString(36).substring(2, 2 + length);
}

const VideoPage = () => {
  const { id } = useParams();
  const roomID = id;
  const meetingRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get("name") || "Guest";

  useEffect(() => {
    if (meetingRef.current) {
      const appID = APP_ID;
      const serverSecret = SERVER_SECRET;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5),
        randomID(5)
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: meetingRef.current,
        sharedLinks: [
          {
            name: "Copy link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true,
      });
    }
  }, [roomID]);

  return <div ref={meetingRef}></div>;
};

export default VideoPage;

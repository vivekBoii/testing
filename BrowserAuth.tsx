import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RECHECK_FOR_AUTH_TIME, STOP_AUTH_POLLING_TIME } from "../../../misc/config";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_BASE_URL, FRONTEND_BASE_URL } from "../../../misc/strings";
import { ErrorPopup, SuccessPopup } from "../../components/Popup";
import axios from "axios";
import { useCheckAuth } from "../../features/auth/auth";
import { toast } from "../../handlers/PluginEventHandler";

// This component shows after the read write keys have been fetched and manages further authentication flow
const BrowserAuth = (props: { data; }) => {
  const data = props.data;
  const keyPair = data;
  React.useEffect(() => {
    if (data) {
      window.open(`${FRONTEND_BASE_URL}/plugin/login?writeKey=${keyPair.write_key}`);
    }
  }, [data]);

  const [rechecks, setRechecks] = React.useState(true);
  const handleAuthFail = () => {
    setRechecks(false);
    toast("Auth failed");
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      handleAuthFail();
    }, STOP_AUTH_POLLING_TIME);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const navigate = useNavigate();

  const authCheckResp = useCheckAuth(keyPair, rechecks, () => {
    handleAuthFail();
  });
  return (
    <>
      {((!authCheckResp.isLoading && !rechecks) && ((authCheckResp?.error) || authCheckResp.data?.message === "Not Granted")) ? (
        <ErrorPopup to="/" />
      ) : (
        ""
      )}
      {(authCheckResp.isSuccess && authCheckResp.data?.message === "Granted") ? <SuccessPopup msg="Successfully Logged in!" to="/projects" /> : ""}

      <span>
        <Link onClick={() => window.open(`${FRONTEND_BASE_URL}/plugin/login?writeKey=${data?.write_key}`)} to="">
          here.
        </Link>
      </span>
    </>
  );
};

export default BrowserAuth;

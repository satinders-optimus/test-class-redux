import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const withRouter = (WrappedComponent: any) => (props: any) => {
  const params = useParams();
  const navigate = useNavigate();

  return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

export default withRouter;

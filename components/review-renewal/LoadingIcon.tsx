import React from "react";
import Spinner from "../Spinner";

const LoadingIcon = ({
  loadingRef,
}: {
  loadingRef?: (node?: Element | null) => void;
}) => {
  return (
    <div ref={loadingRef ? loadingRef : null}>
      <Spinner />
    </div>
  );
};

export default LoadingIcon;

import React, { useEffect } from "react";

const AdBanner = ({ slotId }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: "block",
      }}
      data-ad-client="ca-pub-8492395581433688"
      data-ad-slot={slotId}
    />
  );
};

export default AdBanner;

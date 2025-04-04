import React, { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function SuccessModal({ onClose }) {
  const animationRef = useRef(null);
  return (
    <div
      className="successContainer"
      style={{
        position: "absolute",
        backgroundColor: "#fff",
        borderRadius: "10px",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div
        style={{
          height: "230px",
          width: 230,
          justifySelf: "center",
        }}
      >
        <DotLottieReact
          src="https://lottie.host/9ff92c08-afc7-4bd5-b426-3f1b57a235b6/CDUPi4MUhJ.lottie"
          autoplay
          lottieRef={animationRef}
          onLoad={() => {
            if (animationRef.current) {
              animationRef.current.goToAndPlay(50, true);
            }
          }}
        />
      </div>
    </div>
  );
}

export default SuccessModal;

export function AnimatedBg() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }} aria-hidden>
      <div className="mesh-blobs absolute -inset-[20%]" />
      <div className="mesh-grid absolute inset-0" />
      <img
        src="/school-logo.png"
        alt=""
        className="logo-bg absolute"
        style={{
          width: "55vw",
          height: "55vw",
          maxWidth: 700,
          maxHeight: 700,
          top: "50%",
          left: "50%",
          marginTop: "-27.5vw",
          marginLeft: "-27.5vw",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

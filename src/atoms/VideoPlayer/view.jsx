import ReactHlsPlayer from "react-hls-player";
export default function View({ videoUrl, autoplay=false }) {
  return (
    <>
      <ReactHlsPlayer
        src={videoUrl}
        autoPlay={autoplay}
        controls={true}
        width="100%"
        height="auto"
      />
    </>
  );
}

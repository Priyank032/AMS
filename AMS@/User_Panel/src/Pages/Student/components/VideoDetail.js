import React from "react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>
      
    </div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  console.log(typeof video);
  return (
    <div>
      <div className=" container">
        <iframe src={videoSrc} className="d-none d-md-block mb-5" allowFullScreen title="Video player" height={"300px"} Width={"1100px"}/>
        <iframe src={videoSrc} className="d-block d-md-none mb-5" allowFullScreen title="Video player" height={"300px"} Width={"280px"}/>
      </div>
      <div className="">
        <h4 className="">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;

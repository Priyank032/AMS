import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({videos , handleVideoSelect}) => {
    // const renderedVideos =  videos.map((video) => {
    //     return <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
    //     // console.log(video.id);
    // });

    // return <div className=''>{renderedVideos}</div>;
    return <>
        <div className='row mt-5 mb-5 text-center'>
            {/* <h2>Related Videos</h2> */}
                {videos.map((video)=>(
                    
                    <div className='col-lg-4 col-md-6 col-sm-12 mb-5'><VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} /> </div>
                ))}
        </div>
    </>
};
export default VideoList;
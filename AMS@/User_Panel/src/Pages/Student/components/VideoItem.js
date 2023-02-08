import React from 'react';
import '../style/video.css';

const VideoItem = ({ video, handleVideoSelect }) => {
    return (
        <div onClick={() => handleVideoSelect(video)} className=' video-item item'>
            {/* <div>

                <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description} />
            </div>
            <div className=''>
                <div className=' '>{video.snippet.title}</div>
            </div> */}


            

                    <div class="card" style={{ width: "18rem" }}>
                        <img class="card-img-top" src={video.snippet.thumbnails.medium.url} alt={video.snippet.description} />
                        <div class="card-body">
                            <h5 class="card-title">{video.snippet.title}</h5>
                        </div>
                    </div>
                </div>
           
    )
};
export default VideoItem;
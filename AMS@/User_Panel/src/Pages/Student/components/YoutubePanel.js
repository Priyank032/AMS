import React, { useState } from 'react';
import SearchBar from './Searchbar';
import youtube from '../../../Service/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Youtube_header from './Youtube_header';
import Youtube_text from './Youtube_text';

const YoutubePanel = () => {
    const [data, setData] = useState({
        videos: [],
        selectedVideo: null
    })

    const handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        setData({
            videos: response.data.items
        })
        console.log("this is resp", response);
    };

    const handleVideoSelect = (video) => {
        setData({ selectedVideo: video, videos: data.videos })
    }

    return (
        <div className='container  ' style={{ marginTop: '1em' }}>
            <Youtube_header handleFormSubmit={handleSubmit} />
            {/* <Youtube_text /> */}
            {/* <SearchBar handleFormSubmit={handleSubmit} /> */}
                <div className="">
                    <VideoDetail video={data.selectedVideo} />
                </div>
            <div className="">
                <VideoList handleVideoSelect={handleVideoSelect} videos={data.videos} />
            </div>
        </div>



    )
}

export default YoutubePanel;
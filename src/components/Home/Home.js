import React from 'react'
import Editor from '../Editor/Editor';
import Video from '../Video/Video';

const Home = () => {
    return (
        <div className='outer-home'>
            <div className='home-left'>
                <Editor />
            </div>
            <div className='home-right'>
                <Video />
            </div>
        </div>
    );
}

export default Home;
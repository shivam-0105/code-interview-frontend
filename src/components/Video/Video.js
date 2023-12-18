import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import copy from 'copy-to-clipboard';

const Video = () => {

    const [myPeerId , setMyPeerId] = useState('');
    const [remotePeerIdValue , setRemotePeerIdValue] = useState('');
    const currentUserVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const [micCurrentColor , setMicCurrentColor] = useState('#116466');
    
    useEffect(() => {
        const peer = new Peer();

        peer.on('open' , (userId) => {
            setMyPeerId(userId);
        });

        peer.on('call' , (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserId;

            getUserMedia({ video: true } , (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.addEventListener("loadedmetadata" , () => {
                    currentUserVideoRef.current.play();
                });
                call.answer(mediaStream);
                call.on('stream' , (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.addEventListener("loadedmetadata" , () => {
                        remoteVideoRef.current.play();
                    })
                });
            });
        })

        peerInstance.current = peer;
    } , []);

    const call = (remotePeerId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserId;

        getUserMedia({ video: true } , (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.addEventListener("loadedmetadata" , () => {
                currentUserVideoRef.current.play();
            });

            const call = peerInstance.current.call(remotePeerId , mediaStream); // call a peer providing our mediaStream

            call.on('stream' , (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.addEventListener("loadedmetadata" , () => {
                    remoteVideoRef.current.play();
                })
            });
        });
    }

    const muteButton = () => {
        currentUserVideoRef.current.muted = !currentUserVideoRef.current.muted;
        micCurrentColor === '#116466' ? setMicCurrentColor('red') : setMicCurrentColor('#116466');
    }

    return (
        <div className='video-main'>
            <video className='user-video' ref={currentUserVideoRef} />
            <div className='button'> 
                <span id='muteButton' style={{ backgroundColor: micCurrentColor }} onClick={muteButton} className='mic-on-off'>
                    Mic
                </span>
            </div>
            <div className='video-input'>
                <div>
                    <p>
                        Your User Id
                        <br />
                        <strong>
                            {myPeerId}
                        </strong>
                    </p>
                    <button className='copy-button' onClick={() => {copy(myPeerId)}}>
                        Copy to Clipboard
                    </button>
                </div>
                <hr />
                <div>
                    <input placeholder='Enter the UserId of person to call' type='text' value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
                    <button className='call-button' onClick={() => {call(remotePeerIdValue)}} >Call</button>
                </div>  
            </div>
            <video className='other-video' ref={remoteVideoRef} />
        </div>
    );
}

export default Video;
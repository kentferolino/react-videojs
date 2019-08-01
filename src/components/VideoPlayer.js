import React, { useEffect, useRef } from 'react';
import videojs from 'video.js'

export default (props) => {
  let videoRef = useRef(null)

  useEffect(() => {
    const player = videojs(videoRef.current, props).ready();

    return () => {
      if (player) {
        player.dispose()
      }
    }
  }, [props])


  return (
    <div>
      <div>
        Video Player Source {JSON.stringify(props.sources)}
      </div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js"></video>
      </div>
    </div>
  )
}

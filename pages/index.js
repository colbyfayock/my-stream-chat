import { useState, useRef } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import YouTube from 'react-youtube';

import styles from '../styles/Home.module.css'

export default function Home() {
  const [user, setUser] = useState({});

  const videoRef = useRef();

  /**
   * onStartVideo
   */

  function onStartVideo() {
    const player = videoRef.current.getInternalPlayer();
    player.playVideo();
  }

  /**
   * onStopVideo
   */

  function onStopVideo() {
    const player = videoRef.current.getInternalPlayer();
    player.pauseVideo();
  }

  /**
   * onReplayVideo
   */

  function onReplayVideo() {
    const player = videoRef.current.getInternalPlayer();

    player.pauseVideo();
    player.seekTo(0);
    player.playVideo();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Stream &amp; Chat!</title>
        <meta name="description" content="Watch some youtube and chat with your friends!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        {!user?.id && (
          <>
            <h1>Stream</h1>

            <p>To get started, enter your username or alias:</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              const id = Array.from(e.currentTarget.elements).find(({ name }) => name ==='userId').value;
              setUser({ id });
            }}>
              <input type="text" name="userId" />
              <button>Join</button>
            </form>
          </>
        )}

        {user?.id && (
          <>
            <div className={styles.stream}>
              <div className={styles.streamVideo}>
                <YouTube ref={videoRef} videoId="aYZRRyukuIw"  opts={{
                  playerVars: {
                    controls: 0
                  }
                }} />
                <p>
                  <button onClick={onStartVideo}>Start</button>
                  <button onClick={onStopVideo}>Stop</button>
                  <button onClick={onReplayVideo}>Replay</button>
                </p>
              </div>

              <div>Chat!</div>
            </div>
          </>
        )}

      </main>
    </div>
  )
}

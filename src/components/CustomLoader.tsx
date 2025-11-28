import { useRef, useState, useEffect } from "react";
import vid1 from '../assets/vid1.mp4';
import vid2 from '../assets/vid2.mp4';
import vid3 from '../assets/vid3.mp4';
import vid4 from '../assets/vid4.mp4';
import vid5 from '../assets/vid5.mp4';
import vid6 from '../assets/vid6.mp4';

const videos = [vid1, vid2, vid3, vid4, vid5, vid6];

export default function VideoSequencePlayer() {
  const [index, setIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 1️⃣ First time component loads → give random index
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setIndex(randomIndex);
  }, []);

  // 2️⃣ Auto-play whenever video changes
  useEffect(() => {
    if (index === null) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.load();
    const p = videoEl.play();
    if (p && p.catch) p.catch(() => { });
  }, [index]);

  // 3️⃣ Go to next video (NO random)
  const handleNextAutoVideo = () => {
    setIndex((prev) => {
      if (prev === null) return prev;
      if (prev + 1 < videos.length) {
        return prev + 1; // next video
      }
      return prev; // last video → stay there and DO NOTHING
    });
  };

  if (index === null) return null; // wait for random index to set

  return (
    <div className="h-20 w-20 border-2 overflow-hidden rounded-full border-white/20">
      <video
        ref={videoRef}
        src={videos[index]}
        className="object-cover h-full w-full"
        autoPlay
        muted
        playsInline
        loop={false}
        onEnded={handleNextAutoVideo}
      />
    </div>
  );
}

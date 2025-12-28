import { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";

export const PostVideoFrame = ({ src }) => {
  const videoRef = useRef(null);
  const [bgColor, setBgColor] = useState("#e5e7eb");
  const containterRef = useRef(null);
  //Observar si esta en pantalla y poder reproducir
  useEffect(() => {
    const Observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    if (containterRef.current) Observer.observe(containterRef.current);
    return () => {
      if (containterRef.current) Observer.unobserve(containterRef.current);
    };
  }, []);

  //Capturamos el color del 1 frame
  useEffect(() => {
    const fac = new FastAverageColor();
    const video = videoRef.current;
    if (!video) return;
    const captureFrame = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      const img = new Image();
      img.src = dataUrl;
      img.crossOrigin = "anonymous";
      img.onload = async () => {
        try {
          const color = await fac.getColorAsync(img);
          setBgColor(color.hex);
        } catch (error) {
          console.warn("No se pudo extrar el color del frame", error);
        }
      };
    };
    const onLoaded = () => {
      captureFrame();
    };
    video.addEventListener("loadeddata", onLoaded);
    return () => video.removeEventListener("loadeddata", onLoaded);
  }, [src]);

  return (
    <div
      ref={containterRef}
      className="rounded-lg overflow-hidden flex items-center justify-center max-h-[300px] md:max-h-[500px]"
      style={{ backgroundColor: bgColor }}
    >
      <video
        muted
        ref={videoRef}
        src={src}
        controls
        alt="alterno"
        crossOrigin="anonymous"
        className="object-contain max-h-[300px] md:max-h-[500px] w-full"
      />
    </div>
  );
};

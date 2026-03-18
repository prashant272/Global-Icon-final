import React, { useState } from "react";

function VideoItem({ url }) {
  const [isHovered, setIsHovered] = useState(false);

  // Extract video ID safely with regex
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  const videoId = match ? match[1] : null;

  if (!videoId) return null;

  const thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`;

  return (
    <div
      className="relative aspect-video rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border-2 border-white/5 bg-black group transition-all duration-700 hover:scale-[1.02] hover:border-[#d4af37]/30 shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered ? (
        <>
          <img
            src={thumbnail}
            alt="Video Thumbnail"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-[#d4af37]/80 rounded-full flex items-center justify-center text-black shadow-xl transform transition-transform group-hover:scale-110">
              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <iframe
          className="w-full h-full pointer-events-none"
          src={embedUrl}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      )}
    </div>
  );
}

export default function VideoGallery({ videoLinks = [] }) {
  if (!videoLinks || videoLinks.length === 0) return null;

  return (
    <div className="mb-16 sm:mb-24">
      <h3 className="text-2xl sm:text-3xl font-black text-[#fbd24e] mb-6 sm:mb-10 tracking-wide flex items-center gap-3 sm:gap-4">
        <span className="w-8 sm:w-12 h-1 bg-[#d4af37] rounded-full"></span>
        Video Gallery
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {videoLinks.map((link, idx) => (
          <VideoItem key={idx} url={link} />
        ))}
      </div>
    </div>
  );
}

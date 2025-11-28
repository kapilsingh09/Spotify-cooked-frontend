import React from "react";
import { Music, User, Lock, Globe } from "lucide-react";

const ACCENT_COLOR = "#1DB954"; // Spotify Green

const PlaylistCard = ({ playlist }) => {
  const imageUrl = playlist.images?.[0]?.url || null;
  const trackCount = playlist.tracks?.total || 0;
  const ownerName = playlist.owner?.display_name || "Spotify User";
  const isPublic = playlist.public;

  // console.log("Playlist Data:", playlist);
  return (
    <div
      // Glassmorphism-inspired styles
      className="p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg 
                 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group 
                 transform hover:scale-[1.01] active:scale-[0.98]"

      onClick={()=>window.open(playlist.external_urls.spotify,'_blank')}
    >
      {/* Playlist Cover */}
      <div className="relative mb-4 overflow-hidden rounded-lg aspect-square bg-gray-900 shadow-2xl">
        {imageUrl ? (
          <img
            // onClick={()=> window.open(playlist.external_urls.spotify, "_blank")}
            src={imageUrl}
            alt={playlist.name}
            className="w-full h-full object-cover transition-transform duration-500 "
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 p-4">
            <Music className="w-12 h-12 text-gray-500 mb-2" />
            <p className="text-gray-500 text-xs text-center font-medium">No Image</p>
          </div>
        )}
      </div>

      {/* Playlist Info */}
      <div className="space-y-1">
        <h3 className="text-white font-extrabold text-lg truncate group-hover:text-opacity-90 transition-opacity">
          {playlist.name}
        </h3>

        {/* Tracks and Owner */}
        <div className=" text-sm flex flex-col gap-2 text-gray-400 font-medium">
          <span className="flex items-center gap-1">
            {/* <Music className="w-4 h-4" style={{ color: ACCENT_COLOR }} /> */}
            <h2>

            {trackCount} {trackCount === 1 ? "Song" : "Songs"}
            </h2>
          </span>
          {/* <span className="flex items-center justify-center border w-30 py-0.5 rounded-2xl backdrop-blur-2xl bg-white/10 truncate">
            <User className="w-3.5 h-3.5" />
          {/* <h1 className="">{ownerName}</h1> */}
          {/* </span> */} 
        </div>
        
        {/* Description/Status */}
        {playlist.description == " "  &&<p className="text-xs text-gray-500 line-clamp-2 pt-1">
          {playlist.description || "No description provided."}
        </p>
        }
        {/* Public/Private Status Badge */}
        <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 mt-2 rounded-full text-xs font-semibold ${
                isPublic 
                    ? 'bg-green-600/20 text-green-400 border border-green-700' 
                    : 'bg-red-600/20 text-red-400 border border-red-700'
            }`}
        >
            {isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            {isPublic ? 'Public' : 'Private'}
        </span>
      </div>
    </div>
  );
};

export default PlaylistCard;
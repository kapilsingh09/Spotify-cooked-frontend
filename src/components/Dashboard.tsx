import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Loader2,
  Music,
} from "lucide-react";
import { motion } from "framer-motion";
import PlaylistCard from "./PlaylistCard";

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyProfile {
  display_name: string;
  id: string;
  images?: SpotifyImage[];
  followers?: {
    total: number;
  };
  product?: string;
}

interface PlaylistOwner {
  display_name: string;
  id: string;
}

interface PlaylistTracks {
  total: number;
}

interface ExternalUrls {
  spotify: string;
}

interface Playlist {
  id: string;
  name: string;
  description?: string;
  images?: SpotifyImage[];
  tracks?: PlaylistTracks;
  owner?: PlaylistOwner;
  public?: boolean;
  external_urls: ExternalUrls;
}

// import CustomLoader from "./CustomLoader";

// import vid3 from '../assets/vid3.mp4';

const DEFAULT_AVATAR_PATH = "../assets/Kaoruko Waguri.jpg";
const SPOTIFY_GREEN = "#1DB954";

// export default Dashboard
const Dashboard = () => {
  const [profile, setProfile] = useState<SpotifyProfile | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem("access_token"));
  const [loading, setLoading] = useState<boolean>(true);
  const [isRoasting, setIsRoasting] = useState<boolean>(false);//i have to false it
  const [roastOutput, setRoastOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const intervalRef = useRef<number | null>(null);
  const isMountedRef = useRef<boolean>(true);


  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      isMountedRef.current = false;
    };
  }, []);

  // Parse tokens from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      setAuthToken(accessToken);

      window.history.replaceState({}, document.title, "/dashboard");
    }
  }, []);

  // Fetch profile + playlists
  useEffect(() => {
    if (!authToken) {
      setLoading(false);
      return;
    }

    isMountedRef.current = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Profile
        const profileRes = await axios.get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!isMountedRef.current) return;
        setProfile(profileRes.data);

        console.log("Profile Data:", profileRes.data);
        // Playlists
        const playlistsRes = await axios.get("https://spotify-cooked-frontend.vercel.app/api/playlists", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!isMountedRef.current) return;
        setPlaylists(playlistsRes.data.items || []);

        if (playlistsRes.data.items?.length > 0) {
          setIsChatOpen(true);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load your data. Please login again.");
      } finally {
        if (isMountedRef.current) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMountedRef.current = false;
    };
  }, [authToken]);

  // Roast logic
  const handleRoast = async () => {
    if (isRoasting) return;

    if (playlists.length === 0) {
      setError("You don't have any playlists to roast — add one and try again.");
      setIsChatOpen(true);
      return;
    }

    setIsRoasting(true);
    setRoastOutput("");
    setError(null);
    setIsChatOpen(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    try {
      const response = await axios.post(
        "/api/ai/roast-playlists",
        { playlists },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      let rawText = response.data?.roast || "No roast returned — try again later.";

      if (/roast:/i.test(rawText)) {
        const match = rawText.match(/•[\s\S]*/);
        rawText = match ? match[0] : rawText;
      }

      const text = rawText.trim();
      let index = 0;

      intervalRef.current = setInterval(() => {
        setRoastOutput((prev) => prev + text.charAt(index));
        index++;

        if (index >= text.length) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
          }
          intervalRef.current = null;
          setIsRoasting(false);
        }
      }, 20);
    } catch (err) {
      console.error("Error roasting playlists:", err);
      setError("Something went wrong while roasting — please try again.");
      setRoastOutput("Something went wrong — couldn't generate a roast.");
      setIsRoasting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
  };

  // Avatar logic
  const renderAvatar = () => {
    const imageUrl = profile?.images?.[0]?.url;
    const initial = profile?.display_name?.charAt(0) || "U";

    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={profile.display_name || "User"}
          className="w-full h-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => (e.currentTarget.style.display = "none")}
        />
      );
    }

    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
        <img
          src={DEFAULT_AVATAR_PATH}
          alt="default avatar"
          className="w-full h-full object-cover opacity-70"
          style={{ objectPosition: "top" }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <span className="absolute inset-0 flex items-center justify-center text-7xl font-extrabold text-gray-300 bg-black/30">
          {initial}
        </span>
      </div>
    );
  };

  // No token
  if (!authToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center p-10 bg-gray-900 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-white">Authentication Required</h2>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-8 py-3 rounded-full font-bold text-lg transition duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg"
            style={{
              backgroundColor: SPOTIFY_GREEN,
              color: "#000",
              boxShadow: `0 0 15px rgba(29,185,84,0.6)`,
            }}
          >
            Connect with Spotify
          </button>
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" style={{ color: SPOTIFY_GREEN }} />
          <p className="text-xl font-medium text-gray-400">Pinging Spotify... preparing the roast...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-4xl font-extrabold tracking-tighter flex items-center"
          >
            Cooked !
          </motion.h1>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm text-gray-300 hover:text-red-400 hover:border-red-400 transition bg-white/5 backdrop-blur-sm"
            >
              <span >Log out</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* USER + ROAST */}
        <section className="mb-12">
          <div className="hidden lg:block mb-8">
            <h2 className="text-5xl font-extrabold tracking-tight">
              Welcome back, <span style={{ color: SPOTIFY_GREEN }}>{profile?.display_name}</span>!
            </h2>
            <p className="text-lg text-gray-400 mt-2">
              Check out your playlists below or let the AI do the talking.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* SIDEBAR */}
            <div className="flex flex-col items-center gap-6 w-full lg:w-72 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl shrink-0">
              <div
                className="relative w-40 h-40 rounded-full shadow-2xl overflow-hidden transition duration-300 hover:scale-[1.03]"
                style={{
                  border: `4px solid ${SPOTIFY_GREEN}`,
                  boxShadow: `0 0 20px rgba(0,0,0,0.8), 0 0 10px rgba(29,185,84,0.6)`,
                }}
              >
                {renderAvatar()}
              </div>

              <div className="text-center w-full">
                <h2 className="text-3xl font-black mb-1 truncate">{profile?.display_name}</h2>
                <p className="text-sm font-medium text-gray-400">{profile?.id}</p>
              </div>

              <div className="flex flex-col space-y-3 text-sm text-gray-300 w-full pt-4 border-t border-white/10">
                <span className="flex items-center justify-between">
                  <span>Followers:</span>
                  <span className="font-semibold text-white">{profile?.followers?.total ?? 0}</span>
                </span>

                <span className="flex items-center justify-between">
                  <span>Total Playlists:</span>
                  <span className="font-semibold text-white">{playlists.length}</span>
                </span>

                <span className="flex items-center justify-between">
                  <span>Account Type:</span>
                  <span className="font-semibold text-white capitalize">{profile?.product || "Unknown"}</span>
                </span>
              </div>
            </div>

            {/* ROAST CHAMBER */}
            <div className="flex-1 w-full mt-4 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={
                  isChatOpen
                    ? { opacity: 1, y: 0, height: "auto" }
                    : { opacity: 0, y: 5, height: 0 }
                }
                transition={{ duration: 0.5 }}
                className="rounded-3xl  md:p-8 backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden"
                style={{ minHeight: isChatOpen ? "180px" : "0" }}
              >
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <h3 className="text-2xl font-extrabold text-white ">AI Roast Chamber</h3>

                  <motion.button
                    onClick={handleRoast}
                    disabled={isRoasting || playlists.length === 0}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-full  rounded-full font-bold text-base transition disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: SPOTIFY_GREEN,
                      color: "#000",
                      boxShadow: `0 0 20px rgba(29,185,84,${isRoasting ? 0.8 : 0.4
                        })`,
                    }}
                  >
                    <div className="flex items-center justify-center  ">
                      {isRoasting ? (
                        <>
                           <Loader2 className="w-5 h-5 animate-spin mr-2 inline-block" /> 
                         Roasting... 
                          {/* <div className="h-full w-full"> */}
                          {/* 'Roasting...' */}
                          {/* <div className="flex items-center justify-center">
  <div className="h-20  overflow-hidden rounded-full border border-white/20  ">
    <video
      src={videos[3]}
      className="object-contain object-center h-full w-full"
      autoPlay
      muted
      playsInline
      loop
    />
  </div>
</div> */}
                          {/* <CustomLoader /> */}
                          {/* <myLoader /> */}
                          {/* </div> */}
                        </>
                      ) : roastOutput ? (

                        <span className="py-3 px-4 ">Roast Again</span>
                      ) : (
                        <span className="py-3 px-4 ">Roast my Vibes</span>
                      )}
                    </div>

                  </motion.button>
                </div>

                <div
                  className={`text-lg text-gray-100 leading-relaxed whitespace-pre-wrap  font-bold transition ${isChatOpen ? "block" : "hidden"
                    }`}
                >
                  {roastOutput ? (
                    <span>{roastOutput}</span>
                  ) : (
                    <p className="text-gray-400 text-base  mt-3">
                      Your AI-generated roast will appear here. Click "Roast My Vibes" to get started!
                    </p>
                  )}
                </div>

                {error && (
                  <div className="mt-4 text-base font-semibold text-red-400">{error}</div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <div className="border-t border-white/10 my-10"></div>

        {/* PLAYLISTS */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <h3 className="text-4xl font-extrabold">
              Your Playlists{" "}
              <span className="text-gray-400 font-medium ml-2">
                ({playlists.length})
              </span>
            </h3>
            <p className="text-sm text-gray-500 mt-2 sm:mt-0">
              Click a card to see more details.
            </p>
          </div>

          {playlists.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10 shadow-inner">
              <Music className="w-10 h-10 mx-auto mb-4" style={{ color: SPOTIFY_GREEN }} />
              <p className="text-gray-300 text-xl font-medium">
                No Public Playlists Found
              </p>
              <p className="text-gray-500 text-base mt-2">
                Make sure your playlists are public on Spotify so the AI can find (and judge)
                them!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

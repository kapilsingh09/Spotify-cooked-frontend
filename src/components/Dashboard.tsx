import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loader2, Music } from "lucide-react";
import { motion } from "framer-motion";
import PlaylistCard from "./PlaylistCard";
import defaultAvatar from "../assets/Kaoruko Waguri.jpg";

const SPOTIFY_GREEN = "#1DB954";

// AUTO-SELECT BACKEND URL
const API_BASE_URL = import.meta.env.PROD
  ? "https://YOUR_BACKEND_URL.vercel.app"
  : "http://localhost:3000";

interface SpotifyImage { url: string; height: number; width: number; }
interface SpotifyProfile {
  display_name: string;
  id: string;
  images?: SpotifyImage[];
  followers?: { total: number };
  product?: string;
}
interface PlaylistOwner { display_name: string; id: string; }
interface PlaylistTracks { total: number; }
interface ExternalUrls { spotify: string; }
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

const Dashboard = () => {
  const [profile, setProfile] = useState<SpotifyProfile | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem("access_token"));
  const [loading, setLoading] = useState<boolean>(true);
  const [isRoasting, setIsRoasting] = useState<boolean>(false);
  const [roastOutput, setRoastOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const intervalRef = useRef<number | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // CLEAR INTERVALS ON UNMOUNT
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      isMountedRef.current = false;
    };
  }, []);

  // FETCH TOKENS FROM URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access_token");
    const refresh = params.get("refresh_token");

    if (access && refresh) {
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setAuthToken(access);

      window.history.replaceState({}, document.title, "/dashboard");
    }
  }, []);

  // MAIN DATA FETCH
  useEffect(() => {
    if (!authToken) {
      setLoading(false);
      return;
    }

    const fetchEverything = async () => {
      setLoading(true);
      setError(null);

      try {
        // PROFILE
        const profileRes = await axios.get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setProfile(profileRes.data);

        // PLAYLISTS
        const playlistsRes = await axios.get(`${API_BASE_URL}/api/playlists`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        console.log("Playlist Response:", playlistsRes.data);

        const items =
          playlistsRes.data.items ||
          playlistsRes.data.playlists ||
          playlistsRes.data ||
          [];

        setPlaylists(items);

        if (items.length > 0) {
          setIsChatOpen(true);
        }

      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to load data — login again.");
      }

      if (isMountedRef.current) setLoading(false);
    };

    fetchEverything();
  }, [authToken]);

  // AI ROAST
  const handleRoast = async () => {
    if (isRoasting) return;
    if (playlists.length === 0) {
      setError("No playlists found to roast.");
      setIsChatOpen(true);
      return;
    }

    setIsRoasting(true);
    setRoastOutput("");
    setError(null);
    setIsChatOpen(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/ai/roast-playlists`,
        { playlists },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const text = res.data.roast || "No roast returned.";
      let i = 0;

      intervalRef.current = window.setInterval(() => {
        setRoastOutput((p) => p + text.charAt(i));
        i++;

        if (i >= text.length) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsRoasting(false);
        }
      }, 20);
    } catch (err) {
      console.error(err);
      setError("Roast failed — try again.");
      setIsRoasting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
  };

  const renderAvatar = () => {
    const url = profile?.images?.[0]?.url;

    if (url) {
      return <img src={url} className="w-full h-full object-cover" />;
    }

    return (
      <img
        src={defaultAvatar}
        className="w-full h-full object-cover opacity-80"
        style={{ objectPosition: "top" }}
      />
    );
  };

  // NO TOKEN
  if (!authToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <button onClick={() => (window.location.href = "/")}>Login First</button>
      </div>
    );
  }

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="w-14 h-14 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="sticky top-0 bg-black/80 backdrop-blur-lg p-4 flex justify-between">
        <h1 className="text-4xl font-bold">Cooked!</h1>
        <button onClick={handleLogout} className="border px-4 py-2 rounded-lg">
          Log out
        </button>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto p-8">

        {/* USER & ROAST */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* AVATAR SIDEBAR */}
          <div className="w-full lg:w-72 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
            <div
              className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 shadow-xl"
              style={{ borderColor: SPOTIFY_GREEN }}
            >
              {renderAvatar()}
            </div>

            <h2 className="text-center text-3xl font-bold mt-4">
              {profile?.display_name}
            </h2>

            <p className="text-center text-gray-400">{profile?.id}</p>

            <div className="mt-6 space-y-3 text-gray-300">
              <p>Followers: {profile?.followers?.total}</p>
              <p>Total Playlists: {playlists.length}</p>
              <p>Account Type: {profile?.product}</p>
            </div>
          </div>

          {/* ROAST CHAMBER */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">AI Roast Chamber</h3>

                <button
                  onClick={handleRoast}
                  disabled={isRoasting}
                  className="px-4 py-2 rounded-full font-bold"
                  style={{ backgroundColor: SPOTIFY_GREEN, color: "#000" }}
                >
                  {isRoasting ? "Roasting..." : roastOutput ? "Roast Again" : "Roast My Vibes"}
                </button>
              </div>

              <div className="whitespace-pre-wrap text-lg text-gray-100">
                {roastOutput || "Your roast will appear here..."}
              </div>

              {error && <p className="text-red-400 mt-3">{error}</p>}
            </motion.div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10"></div>

        {/* PLAYLISTS */}
        <div>
          <h3 className="text-4xl font-bold mb-6">
            Your Playlists <span className="text-gray-400">({playlists.length})</span>
          </h3>

          {playlists.length === 0 ? (
            <div className="text-center p-16 bg-white/5 border border-white/10 rounded-xl">
              <Music className="mx-auto w-10 h-10" />
              <p className="mt-4 text-gray-400">No Public Playlists Found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {playlists.map((pl) => (
                <PlaylistCard key={pl.id} playlist={pl} />
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default Dashboard;

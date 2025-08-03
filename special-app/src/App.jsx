import React, { useState, useEffect, useRef } from "react";
import { Heart, Gift, Cake, Star, Sparkles } from "lucide-react";
import { X,  Send } from 'lucide-react';
import music from "./music/Song.mp3";
import special from "../src/img/special.png";
import gift from "../src/img/gift.jpeg";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;;

export default function BirthdayWebsite() {
  const [counter, setCounter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [celebrationStarted, setCelebrationStarted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const [showWishModal, setShowWishModal] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [wishText, setWishText] = useState("");
  const [wishes, setWishes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchWishes();
  }, []);
  const fetchWishes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishes`);
      if (!response.ok) throw new Error("Failed to fetch wishes");
      const data = await response.json();
      setWishes(data);
    } catch (error) {
      console.error("Error fetching wishes:", error);
      // Fallback to localStorage
      const storedWishes = localStorage.getItem("birthdayWishes");
      if (storedWishes) setWishes(JSON.parse(storedWishes));
    }
  };
  const createWish = async (wishData) => {
    const response = await fetch(`${API_BASE_URL}/wishes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: wishData.text }), // Match backend model
    });
    if (!response.ok) throw new Error("Failed to create wish");
    return await response.json();
  };
  const handleSubmit = async () => {
  try {
    setIsSubmitting(true);

    const newWish = {
      text: wishText.trim(),
    };

    // Send to backend
    const createdWish = await createWish(newWish);

    // Update local state
    setWishes((prev) => [...prev, createdWish]);

    // Reset form and close modal
    setWishText("");
    setShowWishModal(false);

    // Removed the alert popup here

  } catch (error) {
    console.error("Error submitting wish:", error);
    // Keep error feedback if needed
  } finally {
    setIsSubmitting(false);
  }
};

  const handleModalClose = () => {
    setShowWishModal(false);
    setWishText("");
    
  };

   const handleOpenGiftModal = () => {
    setIsGiftModalOpen(true);
  };

  const handleCloseGiftModal = () => {
    setIsGiftModalOpen(false);
  };
  useEffect(() => {
    audioRef.current = new Audio(music);
    audioRef.current.loop = true; // Optional: loop the music

    // Attempt to play music automatically on page load
    const playMusic = async () => {
      try {
        await audioRef.current.play();
        setIsMusicPlaying(true);
        console.log("Music started automatically");
      } catch (error) {
        console.log("Autoplay prevented by browser:", error);
      }
    };
    playMusic();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Animated counter from 0 to 20
  useEffect(() => {
    if (!celebrationStarted) return;

    setIsAnimating(true);
    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount += 1;
      setCounter(currentCount);

      if (currentCount >= 20) {
        clearInterval(interval);
        setIsAnimating(false);
        // Trigger confetti when counter reaches 20
        generateConfetti();
      }
    }, 150); // Smooth animation over 3 seconds

    return () => clearInterval(interval);
  }, [celebrationStarted]);

  // Generate confetti particles
  const generateConfetti = () => {
    const newConfetti = [];
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
      });
    }
    setConfetti(newConfetti);

    // Clear confetti after animation
    setTimeout(() => setConfetti([]), 4000);
  };

  const startCelebration = () => {
    setCelebrationStarted(true);
    setCounter(0);
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      // MUSIC CODE: Stop the music here
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsMusicPlaying(false);
      console.log("Music stopped");
    } else {
      // MUSIC CODE: Start playing music here
      audioRef.current.play().catch((error) => {
        console.error("Error playing music:", error);
        // Handle autoplay restrictions
        alert(
          "Please interact with the page first, then try playing music again."
        );
      });
      setIsMusicPlaying(true);
      console.log("Music started");
    }
  };

  const resetCelebration = () => {
    setCelebrationStarted(false);
    setCounter(0);
    setConfetti([]);
  };

  // Music control function
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      // MUSIC CODE: Stop the music here
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsMusicPlaying(false);
      console.log("Music stopped");
    } else {
      // MUSIC CODE: Start playing music here
      audioRef.current.play().catch((error) => {
        console.error("Error playing music:", error);
        // Handle autoplay restrictions
        alert(
          "Please interact with the page first, then try playing music again."
        );
      });
      setIsMusicPlaying(true);
      console.log("Music started");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-blue-950 overflow-hidden relative"
      style={{
        backgroundImage: `
        linear-gradient(90deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      `,
      }}
    >
      {/* Moon and Night Sky Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Moon */}
        <div
          className="absolute top-16 right-16 w-32 h-32 bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-full shadow-2xl opacity-90"
          style={{
            boxShadow:
              "inset -8px -8px 20px rgba(0,0,0,0.2), 0 0 40px rgba(255,255,200,0.3)",
          }}
        >
          {/* Moon craters */}
          <div className="absolute top-6 left-8 w-3 h-3 bg-yellow-300 rounded-full opacity-30"></div>
          <div className="absolute top-12 right-6 w-2 h-2 bg-yellow-300 rounded-full opacity-20"></div>
          <div className="absolute bottom-8 left-12 w-4 h-4 bg-yellow-300 rounded-full opacity-25"></div>
        </div>

        {/* Stars */}
        <div className="absolute top-10 left-10 text-yellow-200 opacity-60 animate-pulse">
          <Star size={20} />
        </div>
        <div
          className="absolute top-32 left-32 text-blue-200 opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <Star size={16} />
        </div>
        <div
          className="absolute top-20 left-1/2 text-white opacity-50 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          <Star size={12} />
        </div>
        <div
          className="absolute bottom-40 left-20 text-yellow-300 opacity-45 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          <Star size={18} />
        </div>
        <div
          className="absolute bottom-20 right-40 text-blue-100 opacity-35 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          <Star size={14} />
        </div>
        <div
          className="absolute top-40 right-1/3 text-white opacity-40 animate-pulse"
          style={{ animationDelay: "3s" }}
        >
          <Star size={10} />
        </div>

        {/* Twinkling effect */}
        <div className="absolute top-24 left-1/4 w-1 h-1 bg-white rounded-full opacity-60 animate-ping"></div>
        <div
          className="absolute bottom-32 right-1/4 w-1 h-1 bg-yellow-200 rounded-full opacity-70 animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-1 h-1 bg-blue-200 rounded-full opacity-50 animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Confetti Animation */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-bounce pointer-events-none opacity-80"
          style={{
            left: `${particle.left}%`,
            top: "-10px",
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            boxShadow: "0 0 4px rgba(255,255,200,0.8)",
          }}
        />
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Animated Counter Section - Most Prominent */}
        <div className="text-center mb-12">
          <div className="bg-gray-800/40 backdrop-blur-md rounded-3xl p-8 mb-8 shadow-2xl border border-blue-300/20">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-blue-100 mb-6 animate-pulse">
              🌙 Happy Level Up Day! ✨
            </h1>

            <div className="relative">
              <div
                className={`text-8xl md:text-9xl font-extrabold text-yellow-200 mb-6 transition-all duration-300 ${
                  isAnimating ? "scale-110 animate-bounce" : "scale-100"
                }`}
                style={{
                  textShadow: "0 0 20px rgba(255,255,200,0.5)",
                }}
              >
                {counter}
              </div>

              {counter === 20 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl animate-ping">🌟</div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!celebrationStarted ? (
                <button
                  onClick={startCelebration}
                  className="text-lg sm:text-lg md:text-lg lg:text-xl bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-4 px-8 rounded-full  transform hover:scale-105 transition-all duration-200 shadow-lg border border-blue-400/30"
                >
                  🌙 Begin the Night Celebration! ✨
                </button>
              ) : (
                <button
                  onClick={resetCelebration}
                  className=" text-lg sm:text-lg md:text-lg lg:text-xl bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg border border-blue-400/30"
                >
                  🔄 Celebrate Under Stars Again!
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Personalization Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-300/20">
            <h2 className="text-3xl font-bold text-blue-100 mb-4 flex items-center gap-2">
              <Cake className="text-yellow-200" />
              Birthday Star
            </h2>
            <div className="bg-gray-700/40 rounded-xl p-4 mb-4 border border-blue-400/20">
              <p className="text-blue-200/80 text-center text-sm">
                <img src={special} alt="" />
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-yellow-200 mb-2">
                Dinda Pradjna Widha
              </h3>
              <p className="text-blue-100/90">
                Tonight is your magical night! 🌟
              </p>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-300/20">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-blue-100 mb-4 flex items-center gap-2">
              <Heart className="text-purple-300" />
              Moonlit Wishes
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-700/40 rounded-lg p-4 border border-blue-400/20">
                <p className="text-blue-100/90 text-lg leading-relaxed">
                  "May your birthday shine as bright as the stars above and
                  bring you dreams as beautiful as moonlight!"
                </p>
              </div>

              {/* User Wishes Display */}
              {wishes.length > 0 && (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {wishes.map((wish) => (
                    <div
                      key={wish._id}
                      className="bg-gray-700/40 rounded-lg p-4 border border-blue-400/20 hover:bg-gray-700/60 transition-colors" // Added hover effect
                    >
                      <blockquote className="text-blue-100/90 text-lg leading-relaxed mb-2">
                        {" "}
                        {/* Semantic <blockquote> */}"{wish.description}"
                      </blockquote>
                      <p className="text-gray-400 text-xs mt-2">
                        Added: {new Date(wish.createdAt).toLocaleString()}{" "}
                        {/* Added label */}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Birthday Features */}
        <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-blue-300/20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-blue-100 mb-6 flex items-center justify-center gap-2">
            <Gift className="text-purple-300" />
            Midnight Birthday Magic
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            <button
              className="bg-gray-700/40 rounded-xl p-6 hover:bg-gray-700/60 transition-all duration-200 cursor-pointer transform hover:scale-105 border border-blue-400/20"
              onClick={() => setShowWishModal(true)}
            >
              <div className="text-4xl mb-3">🕯️</div>
              <h3 className="text-xl font-semibold text-blue-100 mb-2">
                Make a Wish!
              </h3>
              <p className="text-blue-200/80 text-sm">Under the moonlight</p>
            </button>

            <div className="bg-gray-700/40 rounded-xl p-6 hover:bg-gray-700/60 transition-all duration-200 cursor-pointer transform hover:scale-105 border border-blue-400/20" onClick={handleOpenGiftModal}>
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="text-xl font-semibold text-blue-100 mb-2">
                Starlight Gifts
              </h3>
              <p className="text-blue-200/80 text-sm">Celestial surprises!</p>
            </div>

            <div
              className="bg-gray-700/40 rounded-xl p-6 hover:bg-gray-700/60 transition-all duration-200 cursor-pointer transform hover:scale-105 border border-blue-400/20"
              onClick={toggleMusic}
            >
              <div className="text-4xl mb-3">
                {isMusicPlaying ? "🎵" : "🎼"}
              </div>
              <h3 className="text-xl font-semibold text-blue-100 mb-2">
                Night Serenade
              </h3>
              <p className="text-blue-200/80 text-sm">
                {isMusicPlaying ? "Playing..." : "Click to play music!"}
              </p>
            </div>
          </div>
        </div>
        {/* Wish Modal */}
        {showWishModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 w-full max-w-md shadow-2xl border border-blue-300/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-100 flex items-center gap-2">
                  <Star className="text-yellow-300" />
                  Make a Birthday Wish
                </h3>
                <button
                  onClick={handleModalClose}
                  className="text-blue-300 hover:text-blue-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                

                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Your Birthday Wish
                  </label>
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="Write your heartfelt birthday wish..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-blue-400/30 rounded-lg text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent resize-none"
                    maxLength={500}
                  />
                  <p className="text-blue-300/60 text-xs mt-1">
                    {wishText.length}/500 characters
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleModalClose}
                  className="flex-1 px-6 py-3 bg-gray-600/50 text-blue-200 rounded-lg hover:bg-gray-600/70 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Wish
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gift Modal */}
      {isGiftModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl max-w-md w-full border border-blue-400/30 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseGiftModal}
              className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Gift Content */}
            <div className="p-6">
              <div className="text-4xl mb-4 text-center">🎁</div>
              <h3 className="text-2xl font-bold text-center text-blue-100 mb-4">
                Your Special Gift
              </h3>
              
              {/* Replace with your image */}
              <div className="mb-6 rounded-lg overflow-hidden border border-blue-400/20">
                <img 
                  src= {gift}
                  alt="Special gift"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "placeholder-image-url.jpg"
                  }}
                />
              </div>

              <p className="text-blue-200/80 text-center mb-6">
                Here's your celestial surprise! I hope you love it.
              </p>
            </div>
          </div>
        </div>
      )}

        {/* Footer Message */}
        <div className="text-center mt-12">
          <div className="text-blue-200/80 text-base lg:text-xl">
            <p className="mb-2">
              🌙 Another year of adventures under the stars awaits! ✨
            </p>
            <p className="text-xl text-blue-300/60">Made with 💙 Only For Dinda Pradjna Widha</p>
          </div>
        </div>
      </div>
    </div>
  );
}

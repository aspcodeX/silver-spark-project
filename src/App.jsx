import React, { useState, useEffect, useRef } from 'react';
import { User, X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

// 👇 FIREBASE IMPORTS (Keep your existing config)
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";

// 👇 ASSETS (Make sure paths are correct)
import teaserVideo from './assets/teaser.mp4'; 
import anjanayImg from './assets/Anjanay.jpg';  
import aryanImg from './assets/Aryan.jpg';       
import priyanshuImg from './assets/Priyanshu.jpg';
import samuelImg from './assets/Samuel.jpg';    
import shalomImg from './assets/Shalom.jpg';    
import vedantImg from './assets/Vedant.jpg';   
import satyamImg from './assets/Satyam.jpg'; 

/* --- PROFESSIONAL VIDEO PLAYER COMPONENT --- */
const ProfessionalPlayer = ({ src, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  let controlTimeout;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log("Autoplay blocked", err));
    }
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlTimeout);
    controlTimeout = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e) => {
    const progressBar = e.target;
    const newTime = (e.nativeEvent.offsetX / progressBar.offsetWidth) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.parentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      className="fixed inset-0 z-[2000] bg-black flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <div className="relative w-full max-w-6xl aspect-video bg-black shadow-2xl group overflow-hidden">
        <video 
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => { setIsPlaying(false); setShowControls(true); }}
        />
        <div className={`absolute top-6 right-6 z-50 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={onClose} className="bg-black/50 hover:bg-lotus-red p-2 rounded-full text-white backdrop-blur-md transition">
            <X size={24} />
          </button>
        </div>
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-lotus-red/80 p-6 rounded-full text-white shadow-[0_0_50px_rgba(255,0,0,0.5)] backdrop-blur-sm animate-pulse">
              <Play size={48} fill="white" />
            </div>
          </div>
        )}
        <div className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 transition-all duration-500 ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <div className="w-full h-1 bg-gray-600 cursor-pointer mb-4 hover:h-2 transition-all group/bar" onClick={handleSeek}>
             <div className="h-full bg-lotus-red relative" style={{ width: `${progress}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/bar:opacity-100 shadow-[0_0_10px_white]"></div>
             </div>
          </div>
          <div className="flex justify-between items-center text-white font-manrope">
            <div className="flex items-center gap-6">
              <button onClick={togglePlay} className="hover:text-lotus-red transition">
                {isPlaying ? <Pause size={24} fill="white"/> : <Play size={24} fill="white"/>}
              </button>
              <div className="flex items-center gap-2 group/vol">
                <button onClick={toggleMute} className="hover:text-lotus-red transition">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
              <span className="text-xs font-bold tracking-widest text-gray-300">
                {videoRef.current && formatTime(videoRef.current.currentTime)} / {videoRef.current && formatTime(videoRef.current.duration)}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold tracking-[0.2em] text-lotus-red uppercase">Official Teaser</span>
              <button onClick={toggleFullscreen} className="hover:text-lotus-red transition">
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- NEW COMPONENT: ARCHIVES (EVIDENCE BOARD) --- */
const ArchiveSection = () => {
  // Using high quality placeholders. Replace with your actual asset imports if you have them.
  const images = [
    "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=800&q=80", // Dark Alley
    "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80", // Red Light
    "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=800&q=80", // Shadow
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80", // Retro TV
  ];

  return (
    <section className="py-24 px-8 md:px-16 bg-black border-t border-white/10">
      <div className="flex items-center gap-4 mb-12">
         <div className="h-[2px] w-12 bg-lotus-red"></div>
         <h3 className="text-gray-500 tracking-[0.4em] font-bold text-xs uppercase">The Archives</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, idx) => (
          <div key={idx} className={`relative group overflow-hidden border border-white/10 ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
            <img 
              src={src} 
              alt="Evidence" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500"></div>
            <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-[10px] text-lotus-red font-mono border border-lotus-red opacity-0 group-hover:opacity-100 transition-opacity">
              EVIDENCE_#{1024 + idx}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* --- STORY SECTION --- */
const StorySection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const getNextTargetDate = () => {
      const cycleDays = 15;
      const cycleDuration = cycleDays * 24 * 60 * 60 * 1000;
      const baseDate = new Date("2024-01-01T00:00:00").getTime();
      const now = new Date().getTime();
      const timePassed = now - baseDate;
      const nextCycleIndex = Math.ceil(timePassed / cycleDuration);
      return baseDate + (nextCycleIndex * cycleDuration);
    };

    let targetDate = getNextTargetDate();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      let distance = targetDate - now;

      if (distance < 0) {
         targetDate = getNextTargetDate();
         distance = targetDate - now;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-8 md:px-16 bg-[#0a0a0a] overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-lotus-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest animate-pulse">Classified</span>
             <span className="text-gray-500 text-[10px] font-mono tracking-widest">CYCLE_RELOAD_INFINITE</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-anton uppercase text-white mb-8 leading-tight">
            NOT EVERY <span className="text-lotus-red">TRUTH</span> <br/> IS MEANT TO BE <br/> FOUND.
          </h2>
          
          <p className="text-gray-400 text-lg leading-relaxed font-manrope mb-6">
            In the shadowed alleys of <span className="bg-white/10 px-1 text-white">Badlapur</span>, a secret society moves in silence. They don't want money. They don't want power. They want <span className="text-lotus-red font-bold">blood</span>.
          </p>
          
          <p className="text-gray-400 text-lg leading-relaxed font-manrope">
            When Nikhil stumbles upon the <span className="line-through decoration-lotus-red decoration-2 text-gray-600">forbidden archives</span>, he realizes that his life was never his own. The 
            <span className="text-white font-bold tracking-wider mx-1">RED LOTUS</span> is blooming, and its roots are deeper than anyone feared.
          </p>
        </div>

        <div className="bg-neutral-900 border border-white/10 p-10 md:p-14 relative group shadow-[0_0_30px_rgba(0,0,0,0.8)]">
           <div className="absolute top-0 left-0 w-2 h-2 bg-white transition-all duration-300 group-hover:w-full group-hover:bg-lotus-red/50"></div>
           <div className="absolute top-0 right-0 w-2 h-2 bg-white transition-all duration-300 group-hover:h-full group-hover:bg-lotus-red/50"></div>
           <div className="absolute bottom-0 left-0 w-2 h-2 bg-white transition-all duration-300 group-hover:h-full group-hover:bg-lotus-red/50"></div>
           <div className="absolute bottom-0 right-0 w-2 h-2 bg-white transition-all duration-300 group-hover:w-full group-hover:bg-lotus-red/50"></div>

           <h3 className="text-center text-gray-500 text-xs font-bold tracking-[0.4em] uppercase mb-10">Next Occurrence</h3>
           
           <div className="grid grid-cols-4 gap-4 text-center">
             <div>
               <div className="text-4xl md:text-6xl font-anton text-white mb-2">{timeLeft.days}</div>
               <div className="text-[10px] text-lotus-red uppercase tracking-widest">Days</div>
             </div>
             <div>
               <div className="text-4xl md:text-6xl font-anton text-white mb-2">{timeLeft.hours}</div>
               <div className="text-[10px] text-lotus-red uppercase tracking-widest">Hours</div>
             </div>
             <div>
               <div className="text-4xl md:text-6xl font-anton text-white mb-2">{timeLeft.minutes}</div>
               <div className="text-[10px] text-lotus-red uppercase tracking-widest">Mins</div>
             </div>
             <div>
               <div className="text-4xl md:text-6xl font-anton text-white mb-2 animate-pulse">{timeLeft.seconds}</div>
               <div className="text-[10px] text-lotus-red uppercase tracking-widest">Secs</div>
             </div>
           </div>

           <button className="w-full mt-12 border border-white/20 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition duration-300">
             Join the Waitlist
           </button>
        </div>
      </div>
    </section>
  );
};

/* --- MAIN APP COMPONENT --- */
export default function App() {
  const [view, setView] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showTeaser, setShowTeaser] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  // 👇 AUDIO STATE
  const [audioEnabled, setAudioEnabled] = useState(false);
  // Using a royalty-free horror ambience URL
  const audioRef = useRef(new Audio("https://cdn.pixabay.com/download/audio/2022/03/24/audio_108620df68.mp3?filename=horror-ambience-8394.mp3"));

  // 👇 MOUSE CURSOR STATE
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);

  // 👇 MOUSE TRACKING EFFECT
  useEffect(() => {
    const moveCursor = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      // Expand cursor on clickable elements
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('.cursor-pointer')) {
        setCursorHover(true);
      } else {
        setCursorHover(false);
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // 👇 AUDIO TOGGLE FUNCTION
  const toggleAudio = () => {
    if (audioEnabled) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.3; 
      audioRef.current.loop = true;
      audioRef.current.play().catch(e => console.log("Audio blocked", e));
    }
    setAudioEnabled(!audioEnabled);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          username: currentUser.displayName || "Crew Member",
          email: currentUser.email
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (authMode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(userCredential.user, { displayName: formData.username });
        setUser({ username: formData.username, email: formData.email });
        alert("Welcome to the Red Lotus Crew! 🩸");
        setShowAuth(false);
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Welcome back into the Dark. 🌑");
        setShowAuth(false);
      }
    } catch (error) {
      const msg = error.code.replace('auth/', '').replace(/-/g, ' ').toUpperCase();
      alert(`ACCESS DENIED: ${msg}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setView('home');
  };

  const castMembers = [
    { role: "NIKHIL", actor: "PRIYANSHU", img: priyanshuImg },
    { role: "AKSHAY", actor: "SHALOM REDDY", img: shalomImg },
    { role: "VARUN", actor: "SAMUEL", img: samuelImg },
    { role: "AMAN", actor: "ARYAN PAWAR", img: aryanImg },
    { role: "ADITYA", actor: "VEDANT NAMBIAR", img: vedantImg },
    { role: "SUNIL", actor: "ANJANAY", img: anjanayImg },
    { role: "DEV", actor: "SATYAM", img: satyamImg },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-lotus-red selection:text-white overflow-x-hidden cursor-none"> 
      {/* cursor-none added above to hide default cursor */}

      {/* 👇 CUSTOM CURSOR ELEMENT */}
      <div 
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out hidden md:block"
        style={{ 
          left: mousePos.x, 
          top: mousePos.y,
          transform: `translate(-50%, -50%) scale(${cursorHover ? 2.5 : 1})`
        }}
      >
        <div className={`rounded-full bg-lotus-red/80 blur-[2px] transition-all duration-300 ${cursorHover ? 'w-8 h-8 bg-transparent border-2 border-lotus-red' : 'w-3 h-3'}`}></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;700;800&display=swap');
        
        /* --- GOOGLE STYLE FOOTER (DARK THEME) --- */
        .google-footer {
          background-color: #000000;
          color: #ffffff;
          padding: 60px 20px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-family: 'Manrope', sans-serif;
        }
        .footer-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 60px;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
        }
        .newsletter-section h3 {
          font-size: 24px;
          max-width: 400px;
          margin-bottom: 20px;
          font-weight: 300;
          color: #ccc;
        }
        .social-buttons { display: flex; gap: 10px; flex-wrap: wrap; }
        .icon-btn, .signup-btn {
          padding: 10px 20px;
          border: 1px solid rgba(255,255,255,0.3);
          background: transparent;
          color: white;
          border-radius: 30px;
          cursor: pointer;
          font-size: 14px;
          transition: 0.3s;
        }
        .icon-btn:hover, .signup-btn:hover {
          background: #ff0000;
          border-color: #ff0000;
          color: white;
        }
        .footer-nav { display: flex; gap: 60px; }
        .nav-column h4 { margin-bottom: 20px; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
        .nav-column a {
          display: block; color: #999; text-decoration: none; margin-bottom: 12px; font-size: 14px; transition: 0.3s;
        }
        .nav-column a:hover { color: #fff; transform: translateX(5px); }
        
        /* HUGE TEXT */
        .footer-big-text {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 20px;
          text-align: center;
          overflow: hidden;
        }
        .footer-big-text span {
          font-family: 'Anton', sans-serif;
          font-size: 13vw;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.02em;
          display: block;
          text-transform: uppercase;
          background: linear-gradient(to bottom, #fff, #444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* BOTTOM BAR */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          font-size: 12px;
          text-transform: uppercase;
          color: #555;
          letter-spacing: 1px;
        }
        .legal-links a { margin-left: 20px; color: #555; text-decoration: none; }
        .legal-links a:hover { color: #fff; }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center px-8 py-6 fixed w-full z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div onClick={() => setView('home')} className="text-xl md:text-2xl font-anton tracking-wide cursor-pointer uppercase hover:opacity-80">
          SILVER SPARK <span className="text-lotus-red">FILMS</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-xs font-bold tracking-widest text-gray-400 uppercase">
          <button onClick={() => setView('home')} className="hover:text-white hover:tracking-[0.2em] transition-all duration-300">Series</button>
          <button onClick={() => setView('cast')} className="hover:text-white hover:tracking-[0.2em] transition-all duration-300">The Cast</button>
          <button onClick={() => setView('crew')} className="hover:text-white hover:tracking-[0.2em] transition-all duration-300">The Crew</button>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-3 text-lotus-red font-bold text-xs tracking-widest">
              <User size={18} /> {user.username.toUpperCase()}
              <button onClick={handleLogout} className="ml-4 text-gray-500 border border-gray-700 px-3 py-1 hover:text-white hover:border-white transition">LOGOUT</button>
            </div>
          ) : (
            <button onClick={() => setShowAuth(true)} className="bg-lotus-red text-white px-6 py-3 text-xs font-bold tracking-widest hover:bg-red-700 transition uppercase shadow-[0_0_15px_rgba(255,0,0,0.5)]">
              LOGIN
            </button>
          )}
        </div>
      </nav>

      {/* --- AUDIO TOGGLE BUTTON --- */}
      <button 
        onClick={toggleAudio}
        className="fixed bottom-8 right-8 z-[100] bg-lotus-red text-white p-4 rounded-full shadow-[0_0_20px_rgba(255,0,0,0.6)] hover:scale-110 transition-transform animate-pulse"
      >
        {audioEnabled ? <Volume2 size={24}/> : <VolumeX size={24}/>}
      </button>

      {/* --- MAIN CONTENT --- */}
      {view === 'home' && (
        <>
        {/* HERO SECTION */}
        <div className="relative min-h-screen flex items-center px-8 md:px-16 pt-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="relative z-10 w-full max-w-4xl">
            <div className="flex items-center gap-4 mb-4 animate-fade-in">
               <div className="h-[2px] w-12 bg-lotus-red shadow-[0_0_10px_red]"></div>
               <h3 className="text-lotus-red tracking-[0.4em] font-bold text-xs uppercase">UFS Original Series</h3>
            </div>
             
            <h1 className="text-8xl md:text-[11rem] leading-none font-anton uppercase text-white drop-shadow-glow mb-4">
              RED <br /> LOTUS
            </h1>
             
            <p className="text-gray-300 mt-6 text-lg md:text-xl tracking-wide font-light max-w-2xl border-l-4 border-lotus-red pl-6">
              "The bloom is beautiful, but the roots are hidden in the dark."
            </p>

            <div className="mt-12 flex flex-col md:flex-row gap-6">
               <button 
                 onClick={() => setShowTeaser(true)}
                 className="bg-white text-black px-10 py-4 font-black tracking-widest uppercase hover:bg-gray-200 transition text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
               >
                 <Play size={16} fill="black" /> TEASER SOON
               </button>
               
               <button onClick={() => setView('cast')} className="border border-white/30 text-white px-10 py-4 font-bold tracking-widest uppercase hover:bg-white/10 transition text-sm hover:border-white">
                 FULL CAST & CREW
               </button>
            </div>
          </div>
        </div>

        <StorySection />
        
        {/* 👇 NEW ARCHIVE SECTION ADDED HERE */}
        <ArchiveSection />

        </>
      )}

      <div className="px-8 md:px-16 py-20 bg-black">
        {/* CAST */}
        {(view === 'home' || view === 'cast') && (
          <div className="mb-32">
            <h3 className="text-gray-500 tracking-[0.3em] font-bold text-xs uppercase mb-4">The Performance</h3>
            <h2 className="text-5xl md:text-7xl font-anton uppercase text-white mb-12 tracking-wide">STARRING CAST</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {castMembers.map((item, i) => (
                    <div key={i} className="relative h-[450px] bg-dark-card border border-white/10 group overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        <img src={item.img} alt={item.actor} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:via-black/20 transition-all duration-500"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="h-[2px] w-0 bg-lotus-red mb-3 group-hover:w-12 transition-all duration-500"></div>
                            <p className="text-lotus-red font-bold text-[10px] tracking-[0.2em] uppercase mb-1">{item.role}</p>
                            <h3 className="text-white font-anton text-3xl uppercase leading-none tracking-wide drop-shadow-md">{item.actor}</h3>
                        </div>
                        <div className="absolute inset-0 border border-white/5 group-hover:border-lotus-red transition-colors duration-500"></div>
                    </div>
                ))}
            </div>
          </div>
        )}

        {/* CREW */}
        {(view === 'home' || view === 'crew') && (
          <div className="mb-32">
             <h2 className="text-5xl md:text-7xl font-anton uppercase text-white mb-12 tracking-wide">PRODUCTION <span className="text-lotus-red">CREDITS</span></h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-dark-card border border-white/10 p-8 hover:bg-white/5 transition"><p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">WRITER, DIRECTOR & SCREENPLAY</p><h3 className="text-3xl font-anton uppercase text-white tracking-wide">PRIYANSHU @rednose.noir</h3></div>
                <div className="bg-dark-card border border-white/10 p-8 hover:bg-white/5 transition"><p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">CO-WRITER</p><h3 className="text-3xl font-anton uppercase text-white tracking-wide">CHAITRAKSHI</h3></div>
                <div className="bg-dark-card border border-white/10 p-8 hover:bg-white/5 transition"><p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">ASSISTANT DIRECTOR</p><h3 className="text-3xl font-anton uppercase text-white tracking-wide">VEDANT NAMBIAR @pov_notvdt</h3></div>
                <div className="bg-dark-card border border-white/10 p-8 md:col-span-2 hover:bg-white/5 transition"><p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">CAMERAMAN & VISUALS</p><h3 className="text-3xl font-anton uppercase text-white tracking-wide">VAIBHAV @calm_vaibhav <span className="text-gray-500 text-2xl mx-2">&</span> ARYAN PAWAR @aryanpawar.16</h3></div>
                <div className="bg-dark-card border border-white/10 p-8 hover:bg-white/5 transition"><p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">ART DIRECTOR</p><h3 className="text-3xl font-anton uppercase text-white tracking-wide">SHREYAS @shreyasdanane</h3></div>
                <div className="bg-white text-black p-8 md:col-span-2 flex flex-col justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]"><p className="text-lotus-red text-[10px] font-bold tracking-[0.3em] uppercase mb-4">DIALOGUE WRITERS</p><h3 className="text-4xl font-anton uppercase tracking-normal">SHALOM REDDY @reddy_shalom <br/> ARYAN PAWAR</h3></div>
                <div className="bg-dark-card border border-white/10 p-8 hover:bg-white/5 transition"><p className="text-lotus-red text-[10px] font-bold tracking-[0.3em] uppercase mb-4">MUSIC DIRECTOR & BGM</p><h3 className="text-3xl font-anton uppercase text-white tracking-wide">SAMUEL @smamuel_music1</h3></div>
                <div className="bg-dark-card border border-white/10 p-8 md:col-span-3 hover:bg-white/5 transition"><p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">EDITING & LIGHT CGI PART</p><h3 className="text-3xl font-anton uppercase text-white tracking-wide">ANJANAY @laxus_am<span className="text-lotus-red">,</span> ARYAN PAWAR <span className="text-lotus-red">&</span> AKSHAT @cf.vxpor</h3></div>
                <div className="bg-dark-card border border-white/10 p-8 hover:bg-white/5 transition"><p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">VISUALIZER & VISUALS</p><h3 className="text-3xl font-anton uppercase text-white tracking-wide">PRIYANSHU</h3></div>
                <div className="bg-dark-card border border-white/10 p-8 hover:bg-white/5 transition"><p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">LOCATIONS OF SHOOT</p><h3 className="text-2xl font-anton uppercase text-white tracking-wide">BADLAPUR <br/> AMBARNATH</h3></div>
                <div className="bg-dark-card border border-lotus-red p-8 hover:bg-white/5 transition shadow-[0_0_15px_rgba(255,0,0,0.1)]"><p className="text-lotus-red text-[10px] font-bold tracking-[0.3em] uppercase mb-4">WEB DEVELOPER</p><h3 className="text-2xl font-anton uppercase text-white tracking-wide">LUFFY__4567 @luffy__4567</h3></div>
             </div>
          </div>
        )}
      </div>

      {/* --- NEW GOOGLE LABS STYLE FOOTER --- */}
      <footer className="google-footer">
        <div className="footer-top">
          <div className="newsletter-section">
            <h3>Stay connected for early access to our newest films and events.</h3>
            <div className="social-buttons">
              <button className="icon-btn">👾 Discord</button>
              <button className="icon-btn">❌ Twitter</button>
              <button className="signup-btn">Sign up for our newsletter</button>
            </div>
          </div>
          <div className="footer-nav">
            <div className="nav-column">
              <h4>Navigation</h4>
              <a href="#">About</a>
              <a href="#">Experiments</a>
              <a href="#">Sessions</a>
              <a href="#">Community</a>
            </div>
            <div className="nav-column">
              <h4>Projects</h4>
              <a href="#">Short Films</a>
              <a href="#">Documentaries</a>
              <a href="#">Commercials</a>
            </div>
          </div>
        </div>
        <div className="footer-big-text">
          <span>Silver Spark Films</span>
        </div>
        <div className="footer-bottom">
          <div className="brand-small">Silver Spark Films</div>
          <div className="legal-links">
            <a href="#">About</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Help</a>
          </div>
        </div>
      </footer>

      {/* LOGIN MODAL */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
          <div className="w-full max-w-[400px] bg-dark-card border border-white/10 p-10 relative shadow-[0_0_50px_rgba(255,0,0,0.1)]">
            <button onClick={() => setShowAuth(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition"><X size={24}/></button>
            <div className="text-center mb-10"><h2 className="text-4xl font-anton uppercase text-white tracking-wider">{authMode === 'login' ? 'LOGIN' : 'SIGNUP'}</h2><div className="h-1 w-16 bg-lotus-red mx-auto mt-4 rounded-full"></div></div>
            <form onSubmit={handleAuth} className="space-y-6">
              {authMode === 'signup' && <input type="text" name="username" placeholder="USERNAME" className="w-full bg-black border border-white/20 p-4 text-white focus:border-lotus-red outline-none text-sm font-bold tracking-wider placeholder-gray-600 transition-colors" onChange={handleInputChange} required />}
              <input type="email" name="email" placeholder="EMAIL ADDRESS" className="w-full bg-black border border-white/20 p-4 text-white focus:border-lotus-red outline-none text-sm font-bold tracking-wider placeholder-gray-600 transition-colors" onChange={handleInputChange} required />
              <input type="password" name="password" placeholder="PASSWORD" className="w-full bg-black border border-white/20 p-4 text-white focus:border-lotus-red outline-none text-sm font-bold tracking-wider placeholder-gray-600 transition-colors" onChange={handleInputChange} required />
              <button type="submit" className="w-full bg-lotus-red text-white font-bold py-4 mt-8 hover:bg-red-700 tracking-[0.2em] uppercase text-xs transition-all shadow-[0_4px_20px_rgba(255,0,0,0.3)]">{authMode === 'login' ? 'ENTER THE DARK' : 'JOIN THE CREW'}</button>
            </form>
            <p onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-center text-xs text-gray-500 mt-8 cursor-pointer hover:text-lotus-red uppercase tracking-widest transition-colors">{authMode === 'login' ? 'Create an Account' : 'Back to Login'}</p>
          </div>
        </div>
      )}

      {/* --- PROFESSIONAL VIDEO PLAYER TRIGGER --- */}
      {showTeaser && (
        <ProfessionalPlayer 
          src={teaserVideo} 
          onClose={() => setShowTeaser(false)} 
        />
      )}
    </div>
  );
}

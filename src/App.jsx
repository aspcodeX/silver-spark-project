import React, { useState, useEffect } from 'react';
import { User, X, Play } from 'lucide-react';

// 👇 FIREBASE IMPORTS
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";

// 👇 ASSETS
import teaserVideo from './assets/teaser.mp4'; 
import anjanayImg from './assets/Anjanay.jpg';  
import aryanImg from './assets/Aryan.jpg';     
import priyanshuImg from './assets/Priyanshu.jpg';
import samuelImg from './assets/Samuel.jpg';   
import shalomImg from './assets/Shalom.jpg';   
import vedantImg from './assets/Vedant.jpg';  
import satyamImg from './assets/Satyam.jpg'; 

export default function App() {
  const [view, setView] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showTeaser, setShowTeaser] = useState(false);
  
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  // 👇 AUTO LOGIN CHECK
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

  // 👇 AUTH LOGIC
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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-lotus-red selection:text-white overflow-x-hidden">
      
      {/* 👇 INTERNAL CSS FOR FOOTER (Taaki alag se file na edit karni pade) */}
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
          background: #ff0000; /* Lotus Red hover */
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

      {/* --- MAIN CONTENT --- */}
      {view === 'home' && (
        <div className="relative min-h-screen flex items-center px-8 md:px-16 pt-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="relative z-10 w-full max-w-4xl">
            <div className="flex items-center gap-4 mb-4 animate-fade-in">
               <div className="h-[2px] w-12 bg-lotus-red shadow-[0_0_10px_red]"></div>
               <h3 className="text-lotus-red tracking-[0.4em] font-bold text-xs uppercase">SSF Original Series</h3>
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

      {/* --- NEW GOOGLE LABS STYLE FOOTER (SILVER SPARK FILMS) --- */}
      <footer className="google-footer">
        
        {/* Top Section */}
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

        {/* HUGE TEXT */}
        <div className="footer-big-text">
          <span>Silver Spark Films</span>
        </div>

        {/* Bottom Bar */}
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

      {/* TEASER VIDEO MODAL */}
      {showTeaser && (
        <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <button onClick={() => setShowTeaser(false)} className="absolute top-6 right-6 text-gray-400 hover:text-lotus-red transition"><X size={40} /></button>
          <div className="w-full max-w-6xl aspect-video bg-black shadow-[0_0_100px_rgba(255,0,0,0.15)] border border-white/10 relative overflow-hidden">
            <video src={teaserVideo} controls autoPlay className="w-full h-full object-cover">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Onboarding from './components/Onboarding';
import Hero from './components/Hero';
import Auth from './components/Auth';
import FieldSurvey from './components/FieldSurvey';
import ListingIntelligence from './components/ListingIntelligence';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Zap, ChevronRight, Filter, Plus, ArrowLeft, FileText, 
  BarChart3, Globe, Briefcase, LayoutDashboard, Database, TrendingUp, 
  Upload, User as UserIcon, CheckCircle, Clock, ClipboardCheck, 
  Activity, ShieldCheck, Scale 
} from 'lucide-react';
import { mockLandListings } from './data/mockData';
import { authService } from './utils/api';

// Role Context
const RoleContext = createContext();

// Reusable Components
const ParcelCard = ({ parcel, onClick, role }) => (
  <motion.div 
    whileHover={{ scale: 0.98 }}
    whileTap={{ scale: 0.95 }}
    className="glass-card" 
    style={{ marginBottom: '16px', cursor: 'pointer', borderLeft: `4px solid ${role === 'aggregator' ? 'var(--accent-green)' : 'var(--accent-blue)'}` }}
    onClick={onClick}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>{parcel.title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={14} /> {parcel.state}
        </p>
      </div>
      <div className="glass" style={{ padding: '4px 10px', borderRadius: '12px', background: 'rgba(76, 29, 149, 0.1)', border: '1px solid rgba(76, 29, 149, 0.2)' }}>
        <span style={{ color: 'var(--accent-purple)', fontWeight: '700', fontSize: '14px' }}>{parcel.score}</span>
      </div>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
      <div className="glass" style={{ padding: '8px', borderRadius: '12px' }}>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Area</p>
        <p style={{ fontSize: '14px', fontWeight: '500' }}>{parcel.area}</p>
      </div>
      <div className="glass" style={{ padding: '8px', borderRadius: '12px' }}>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Capacity</p>
        <p style={{ fontSize: '14px', fontWeight: '500' }}>{parcel.capacity}</p>
      </div>
    </div>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <p style={{ color: role === 'aggregator' ? 'var(--accent-green)' : 'var(--accent-blue)', fontWeight: '600' }}>{parcel.askingTerms}</p>
      <ChevronRight size={20} color="var(--text-muted)" />
    </div>
  </motion.div>
);

// --- Supply Side: Aggregator ---
const AggregatorDashboard = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="gradient-text" style={{ fontSize: '28px', marginBottom: '4px' }}>My Listings</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Supply: Land Aggregator</p>
        </div>
        <button onClick={() => navigate('/list-land')} className="glass" style={{ padding: '12px', borderRadius: '14px', color: 'var(--accent-green)' }}>
          <Plus size={24} />
        </button>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ACTIVE LISTINGS</p>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>12</p>
        </div>
        <div className="glass-card" style={{ padding: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>TOTAL INTEREST</p>
          <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-green)' }}>48</p>
        </div>
      </div>

      <section>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Recent Submissions</h2>
        {mockLandListings.slice(0, 2).map(parcel => (
          <ParcelCard key={parcel.id} parcel={parcel} role="aggregator" onClick={() => navigate(`/parcel/${parcel.id}`)} />
        ))}
      </section>
    </motion.div>
  );
};

// --- Land Owner Dashboard ---
const LandOwnerDashboard = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 className="gradient-text" style={{ fontSize: '28px', marginBottom: '4px' }}>My Assets</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Property: Land Owner</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>TOTAL ACRES</p>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>150</p>
        </div>
        <div className="glass-card" style={{ padding: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ACTIVE BIDS</p>
          <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-green)' }}>3</p>
        </div>
      </div>

      <section>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>My Properties</h2>
        {mockLandListings.slice(0, 1).map(parcel => (
          <ParcelCard key={parcel.id} parcel={parcel} role="aggregator" onClick={() => navigate(`/parcel/${parcel.id}`)} />
        ))}
      </section>
    </motion.div>
  );
};

// --- Legal Firm Dashboard ---
const LegalDashboard = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 className="gradient-text" style={{ fontSize: '28px', marginBottom: '4px' }}>Legal Queue</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Verification: Legal Partner</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>PENDING DILIGENCE</p>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>8</p>
        </div>
        <div className="glass-card" style={{ padding: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>REPORTS SIGNED</p>
          <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-blue)' }}>142</p>
        </div>
      </div>

      <section>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Verification Requests</h2>
        {mockLandListings.map(parcel => (
          <div key={parcel.id} className="glass-card" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div className="glass" style={{ padding: '10px', borderRadius: '10px' }}><Scale size={18} color="var(--accent-blue)" /></div>
             <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '600', fontSize: '14px' }}>{parcel.title}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Due in 2 days</p>
             </div>
             <button className="glass" style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '8px' }}>Review</button>
          </div>
        ))}
      </section>
    </motion.div>
  );
};

// --- Field Agent Dashboard ---
const AgentDashboard = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 className="gradient-text" style={{ fontSize: '28px', marginBottom: '4px' }}>Field Ops</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Survey: On-site Agent</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>TODAY'S TASKS</p>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>4</p>
        </div>
        <div className="glass-card" style={{ padding: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>COORDS LOGGED</p>
          <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-orange)' }}>842</p>
        </div>
      </div>

      <section>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Active Assignments</h2>
        <div className="glass-card" style={{ marginBottom: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div className="glass" style={{ padding: '10px', borderRadius: '10px' }}><Activity size={18} color="var(--accent-orange)" /></div>
              <p style={{ fontWeight: '600' }}>GSS Substation Scan</p>
           </div>
           <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Rajasthan Sector 4. Locate 220kV GSS and upload geo-tagged photo.</p>
           <button 
             className="btn-primary" 
             style={{ width: '100%', background: 'var(--accent-orange)' }}
             onClick={() => navigate('/field-survey/SURV-882')}
           >
             Open GPS Scanner
           </button>
        </div>
      </section>
    </motion.div>
  );
};

// --- Demand Side: Developer ---
const DeveloperDashboard = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 className="gradient-text" style={{ fontSize: '28px', marginBottom: '4px' }}>Market Insights</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Demand: RE Developer</p>
      </header>
      
      <Link to="/project-intake" style={{ textDecoration: 'none' }}>
        <div className="glass-card" style={{ marginBottom: '24px', background: 'rgba(30, 58, 138, 0.1)', border: '1px solid rgba(30, 58, 138, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="glass" style={{ padding: '10px', borderRadius: '12px' }}>
              <TrendingUp color="var(--accent-blue)" />
            </div>
            <div>
              <p style={{ fontWeight: '600', color: '#fff' }}>Start Project Intake</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Define your MW target and POI.</p>
            </div>
          </div>
        </div>
      </Link>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px' }}>Matched for You</h2>
          <span style={{ color: 'var(--accent-blue)', fontSize: '14px' }}>AI Ranked</span>
        </div>
        {mockLandListings.map(parcel => (
          <ParcelCard key={parcel.id} parcel={parcel} role="developer" onClick={() => navigate(`/parcel/${parcel.id}`)} />
        ))}
      </section>
    </motion.div>
  );
};

const ProjectIntake = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <ArrowLeft size={20} /> Back
      </button>
      <h1 className="gradient-text" style={{ fontSize: '32px', marginBottom: '8px' }}>Project Intake</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Define your procurement needs.</p>
      
      <div className="glass-card">
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Technology Type</label>
          <select style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '16px', appearance: 'none' }}>
            <option>Solar PV</option>
            <option>Wind Onshore</option>
            <option>BESS (Battery Storage)</option>
            <option>Hybrid (Solar + Wind)</option>
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>MW Target</label>
          <input type="number" placeholder="e.g. 100" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '16px' }} />
        </div>
        <button className="btn-primary" style={{ width: '100%', background: 'var(--accent-blue)', color: '#fff' }}>Generate Match Recommendations</button>
      </div>
    </motion.div>
  );
};

const ListLand = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 className="gradient-text" style={{ fontSize: '32px', marginBottom: '8px' }}>List Land</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1, height: '4px', background: step >= i ? 'var(--accent-green)' : 'var(--bg-surface)', borderRadius: '2px' }} />
          ))}
        </div>
      </header>
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
            <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Deal Structure</h2>
            <div className="glass-card">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' }}>
                {['Lease', 'Sale', 'Royalty Model'].map(type => (
                  <div key={type} className="glass" style={{ padding: '16px', borderRadius: '12px', cursor: 'pointer', border: '1px solid var(--border-glass)' }}>
                    <p style={{ fontWeight: '600' }}>{type}</p>
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ width: '100%' }} onClick={() => setStep(2)}>Next: GIS & Zoning</button>
            </div>
          </motion.div>
        )}
        {step >= 2 && <div className="glass-card"><p>Continue listing flow...</p><button className="btn-primary" onClick={() => navigate('/')}>Finish</button></div>}
      </AnimatePresence>
    </motion.div>
  );
};

const ParcelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const parcel = mockLandListings.find(p => p.id === parseInt(id));

  if (!parcel) return <div>Parcel not found</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingTop: '20px', paddingBottom: '100px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <ArrowLeft size={20} /> Back
      </button>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ height: '200px', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
          <div className="glass" style={{ position: 'absolute', top: '16px', right: '16px', padding: '8px 16px', borderRadius: '12px' }}>
            <span style={{ color: 'var(--accent-purple)', fontWeight: '700' }}>Score: {parcel.score}</span>
          </div>
        </div>
        <div style={{ padding: '24px' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>{parcel.title}</h1>
          <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}>
            <MapPin size={16} /> {parcel.state} • {parcel.coordinates}
          </p>

          <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={20} color="var(--accent-purple)" /> Automated Due Diligence
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
             <div className="glass" style={{ padding: '12px', borderRadius: '12px' }}>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>IRRADIANCE</p>
                <p style={{ fontWeight: '600' }}>5.8 kWh/m2</p>
             </div>
             <div className="glass" style={{ padding: '12px', borderRadius: '12px' }}>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>GRID DISTANCE</p>
                <p style={{ fontWeight: '600' }}>{parcel.gssDistance}</p>
             </div>
             <div className="glass" style={{ padding: '12px', borderRadius: '12px' }}>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ZONING</p>
                <p style={{ fontWeight: '600', color: 'var(--accent-green)' }}>Industrial</p>
             </div>
             <div className="glass" style={{ padding: '12px', borderRadius: '12px' }}>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>TITLE</p>
                <p style={{ fontWeight: '600', color: 'var(--accent-green)' }}>Verified</p>
             </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" style={{ flex: 1, background: 'var(--accent-purple)', color: '#fff' }}>Start Due Diligence</button>
            <button className="btn-secondary" style={{ flex: 1 }}>Contact Aggregator</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Profile = ({ role, setRole, setIsOnboarded, setIsAuthenticated, setIsHeroSeen }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('Uploading...');
    try {
      const result = await authService.uploadFile(file);
      setAvatarUrl(result.Location);
      setUploadStatus('Upload successful!');
    } catch (err) {
      setUploadStatus('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <h1 className="gradient-text" style={{ fontSize: '32px', marginBottom: '32px' }}>Settings</h1>
      
      <div className="glass-card" style={{ marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 16px', borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid var(--border-glass)' }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <UserIcon size={48} color="var(--text-muted)" />
          )}
        </div>
        <label className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: isUploading ? 'not-allowed' : 'pointer' }}>
          <Upload size={18} />
          {isUploading ? 'Uploading...' : 'Update Photo'}
          <input type="file" hidden accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
        </label>
        {uploadStatus && (
          <p style={{ marginTop: '12px', fontSize: '14px', color: uploadStatus.includes('failed') ? '#ef4444' : 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            {uploadStatus.includes('successful') && <CheckCircle size={14} />} {uploadStatus}
          </p>
        )}
      </div>

      <div className="glass-card" style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '16px' }}>Platform View</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { id: 'landowner', name: 'Land Owner' },
            { id: 'aggregator', name: 'Aggregator' },
            { id: 'developer', name: 'Developer' },
            { id: 'legal', name: 'Legal' },
            { id: 'agent', name: 'Agent' },
          ].map(r => (
            <button 
              key={r.id}
              className={role === r.id ? 'btn-primary' : 'btn-secondary'} 
              style={{ width: '100%', padding: '12px' }}
              onClick={() => setRole(r.id)}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>
      <div className="glass-card">
        <h3 style={{ marginBottom: '16px' }}>Account Status</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="btn-secondary" style={{ width: '100%', color: 'var(--accent-orange)' }} onClick={() => setIsOnboarded(false)}>
            Restart Onboarding Flow
          </button>
          <button className="btn-secondary" style={{ width: '100%' }} onClick={() => { 
            authService.logout();
            setIsAuthenticated(false); 
            setIsOnboarded(false); 
          }}>
            Logout / Reset Auth
          </button>
          <button className="btn-secondary" style={{ width: '100%' }} onClick={() => { setIsHeroSeen(false); setIsAuthenticated(false); setIsOnboarded(false); }}>
            Back to Hero Landing
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [role, setRole] = useState('aggregator'); 
  const [isHeroSeen, setIsHeroSeen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  useEffect(() => {
    if (authService.isAuthenticated()) {
      setIsHeroSeen(true);
      setIsAuthenticated(true);
    }
  }, []);

  if (!isHeroSeen) {
    return <Hero onGetStarted={() => setIsHeroSeen(true)} />;
  }

  if (!isAuthenticated) {
    return <Auth onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  if (!isOnboarded) {
    return (
      <RoleContext.Provider value={{ role, setRole }}>
        <Onboarding onComplete={() => setIsOnboarded(true)} setRole={setRole} />
      </RoleContext.Provider>
    );
  }

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              role === 'aggregator' ? <AggregatorDashboard /> : 
              role === 'developer' ? <DeveloperDashboard /> :
              role === 'landowner' ? <LandOwnerDashboard /> :
              role === 'legal' ? <LegalDashboard /> :
              role === 'agent' ? <AgentDashboard /> :
              <AggregatorDashboard />
            } />
            <Route path="/search" element={<DeveloperDashboard />} />
            <Route path="/list-land" element={<ListingIntelligence />} />
            <Route path="/project-intake" element={<ProjectIntake />} />
            <Route path="/parcel/:id" element={<ParcelDetail />} />
            <Route path="/field-survey/:id" element={<FieldSurvey />} />
            <Route path="/profile" element={<Profile role={role} setRole={setRole} setIsOnboarded={setIsOnboarded} setIsAuthenticated={setIsAuthenticated} setIsHeroSeen={setIsHeroSeen} />} />
          </Routes>
        </AnimatePresence>
        <Navigation />

        {/* PWA Install Banner for Android */}
        <AnimatePresence>
          {installPrompt && (
            <motion.div 
              initial={{ y: 100 }} 
              animate={{ y: 0 }} 
              exit={{ y: 100 }}
              style={{ position: 'fixed', bottom: '80px', left: '20px', right: '20px', zIndex: 1000 }}
            >
              <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--accent-orange)', border: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="glass flex-center" style={{ width: '40px', height: '40px', borderRadius: '10px' }}>
                     <Upload size={20} color="#fff" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontWeight: '700', color: '#fff', fontSize: '14px' }}>Install Auxilium</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Add to Home Screen</p>
                  </div>
                </div>
                <button className="glass" style={{ padding: '8px 16px', borderRadius: '8px', fontWeight: '700', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }} onClick={handleInstall}>
                  Install
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RoleContext.Provider>
  );
};

export default App;
export { RoleContext };

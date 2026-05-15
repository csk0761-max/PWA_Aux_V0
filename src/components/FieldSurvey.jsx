import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Camera, CheckCircle2, Navigation, Info, Upload, CheckSquare, 
  Send, ShieldCheck, Zap, User as UserIcon, Briefcase, FileText, Layout
} from 'lucide-react';
import { authService } from '../utils/api';

const FieldSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [coords, setCoords] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [photos, setPhotos] = useState([]);
  
  // State for all fields from the provided Land Details form
  const [surveyData, setSurveyData] = useState({
    // 1. Purpose
    acquisitionPurpose: 'ISTS Bid',
    
    // 2. Location (Auto-populated + Editable)
    villageName: '',
    taluka: '',
    district: '',
    state: '',
    gssCoords: '',
    aggregatorName: '',
    contactPerson: '',
    govtOfficialDetails: '',
    
    // 3. Type of Land
    landCategory: 'General',
    ownershipType: 'Private',
    numberOfOwners: '',
    
    // 4. Project Description
    projectCapacity: '',
    pssToGssDistance: '',
    plotArea: ''
  });

  const handleCaptureGPS = () => {
    setIsLocating(true);
    setTimeout(() => {
      const capturedCoords = { 
        lat: '26.9124', 
        lng: '75.7873', 
        accuracy: '3m'
      };
      setCoords(capturedCoords);
      setSurveyData(prev => ({
        ...prev,
        villageName: 'Phalodi',
        taluka: 'Phalodi',
        district: 'Jodhpur',
        state: 'Rajasthan',
        gssCoords: '26.9200, 75.7900',
        pssToGssDistance: '2.4 km'
      }));
      setIsLocating(false);
    }, 2500);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPhotos([...photos, { id: Date.now(), url: previewUrl, status: 'uploading' }]);
    try {
      const res = await authService.uploadFile(file);
      setPhotos(prev => prev.map(p => 
        p.url === previewUrl ? { ...p, url: res.Location, status: 'done' } : p
      ));
    } catch (err) {
      console.error('Photo upload failed:', err);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setStep(6); // Success
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '100px', minHeight: '100vh' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button onClick={() => navigate(-1)} className="glass" style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '20px' }}>Field Survey Detail</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Reference: {id || 'AUX-LS-902'}</p>
        </div>
      </header>

      {/* Progress Bar */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '32px' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ flex: 1, height: '4px', background: step >= i ? 'var(--accent-orange)' : 'var(--bg-surface)', borderRadius: '2px' }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: GPS & Location Auto-fetch */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="glass-card" style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div className="glass flex-center" style={{ width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 20px' }}>
                <Navigation size={32} color="var(--accent-orange)" className={isLocating ? 'spin' : ''} />
              </div>
              <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Location Intelligence</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>Capture site coordinates to auto-populate administrative details.</p>
              
              {!coords ? (
                <button className="btn-primary" style={{ width: '100%', background: 'var(--accent-orange)' }} onClick={handleCaptureGPS} disabled={isLocating}>
                  {isLocating ? 'Scanning Infrastructure...' : 'Run GPS Scanner'}
                </button>
              ) : (
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="glass" style={{ padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-orange)' }}>
                    <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>SITE COORDINATES</p>
                    <p style={{ fontWeight: '700' }}>{coords.lat}, {coords.lng}</p>
                  </div>
                  <div className="glass" style={{ padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-blue)' }}>
                    <p style={{ fontSize: '10px', color: 'var(--accent-blue)' }}>VILLAGE / TEHSIL / DISTRICT</p>
                    <p style={{ fontWeight: '600' }}>{surveyData.villageName}, {surveyData.taluka}, {surveyData.district}</p>
                  </div>
                  <button className="btn-primary" style={{ width: '100%', marginTop: '12px' }} onClick={() => setStep(2)}>Next: Land Details</button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* STEP 2: Land Parcel Details (Section 2 of Image) */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Land Parcel Info</h2>
            <div className="glass-card">
              <div className="form-group">
                <label className="label">Land Aggregator Name</label>
                <input type="text" className="input" placeholder="e.g. Ramesh Singh" value={surveyData.aggregatorName} onChange={e => setSurveyData({...surveyData, aggregatorName: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="label">Contact Person</label>
                <input type="text" className="input" placeholder="Phone or Name" value={surveyData.contactPerson} onChange={e => setSurveyData({...surveyData, contactPerson: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="label">Govt Official Details (If any)</label>
                <input type="text" className="input" placeholder="Patwari/Tehsildar details" value={surveyData.govtOfficialDetails} onChange={e => setSurveyData({...surveyData, govtOfficialDetails: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>Back</button>
                <button className="btn-primary" style={{ flex: 2, background: 'var(--accent-orange)' }} onClick={() => setStep(3)}>Next: Type of Land</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Type of Land (Section 3 of Image) */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Type of Land</h2>
            <div className="glass-card">
              <div className="form-group">
                <label className="label">Land Category</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  {['General', 'SC / ST', 'Both (General + SC/ST)'].map(cat => (
                    <button 
                      key={cat}
                      className="glass" 
                      style={{ padding: '12px', borderRadius: '10px', textAlign: 'left', border: surveyData.landCategory === cat ? '1px solid var(--accent-orange)' : '1px solid var(--border-glass)' }}
                      onClick={() => setSurveyData({...surveyData, landCategory: cat})}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="label">Ownership</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Private', 'Govt'].map(own => (
                    <button 
                      key={own}
                      className="glass" 
                      style={{ flex: 1, padding: '12px', borderRadius: '10px', border: surveyData.ownershipType === own ? '1px solid var(--accent-orange)' : '1px solid var(--border-glass)' }}
                      onClick={() => setSurveyData({...surveyData, ownershipType: own})}
                    >
                      {own}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="label">No. of Owners / Farmers</label>
                <input type="number" className="input" placeholder="e.g. 12" value={surveyData.numberOfOwners} onChange={e => setSurveyData({...surveyData, numberOfOwners: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(2)}>Back</button>
                <button className="btn-primary" style={{ flex: 2, background: 'var(--accent-orange)' }} onClick={() => setStep(4)}>Next: Project Specs</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Project and Land Description (Section 4 of Image) */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Project & Specs</h2>
            <div className="glass-card">
              <div className="form-group">
                <label className="label">Purpose of Acquisition</label>
                <select className="input" value={surveyData.acquisitionPurpose} onChange={e => setSurveyData({...surveyData, acquisitionPurpose: e.target.value})}>
                  <option>Future Acquisition</option>
                  <option>ISTS Bid</option>
                  <option>State Bid</option>
                  <option>Group Captive Projects</option>
                </select>
              </div>
              <div className="form-group">
                <label className="label">AC/DC Capacity (MW)</label>
                <input type="text" className="input" placeholder="e.g. 100 MW" value={surveyData.projectCapacity} onChange={e => setSurveyData({...surveyData, projectCapacity: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="label">Distance: PSS to GSS</label>
                <input type="text" className="input" value={surveyData.pssToGssDistance} readOnly style={{ opacity: 0.7 }} />
              </div>
              <div className="form-group">
                <label className="label">Area of Plot (Acre)</label>
                <input type="number" className="input" placeholder="e.g. 500" value={surveyData.plotArea} onChange={e => setSurveyData({...surveyData, plotArea: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(3)}>Back</button>
                <button className="btn-primary" style={{ flex: 2, background: 'var(--accent-orange)' }} onClick={() => setStep(5)}>Next: Media</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Media Upload */}
        {step === 5 && (
          <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Site Media</h2>
            <div className="glass-card">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {photos.map(p => (
                  <div key={p.id} className="glass" style={{ height: '100px', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={p.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
                <label className="glass flex-center" style={{ height: '100px', border: '2px dashed var(--border-glass)', borderRadius: '12px', cursor: 'pointer' }}>
                  <input type="file" hidden onChange={handlePhotoUpload} />
                  <Camera size={24} color="var(--accent-orange)" />
                </label>
              </div>
              <button className="btn-primary" style={{ width: '100%', background: 'var(--accent-orange)' }} onClick={() => setStep(6)}>Review & Submit Survey</button>
            </div>
          </motion.div>
        )}

        {/* SUCCESS STEP */}
        {step === 6 && (
          <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', paddingTop: '40px' }}>
            <div className="glass flex-center" style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 24px', background: 'rgba(16, 185, 129, 0.1)' }}>
              <CheckCircle2 size={48} color="var(--accent-green)" />
            </div>
            <h2 style={{ marginBottom: '8px' }}>Survey Synced</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Land details have been added to the master repository.</p>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => navigate('/')}>Back to Dashboard</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .form-group { margin-bottom: 16px; }
        .label { display: block; color: var(--text-muted); font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 6px; }
        .input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); borderRadius: 10px; padding: 12px; color: #fff; font-size: 14px; outline: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 2s linear infinite; }
      `}</style>
    </div>
  );
};

export default FieldSurvey;

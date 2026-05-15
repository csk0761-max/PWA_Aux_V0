import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, ShieldCheck, Landmark, Briefcase, ChevronRight, ArrowLeft, CheckCircle2, Plus, TrendingUp, User, Users, Zap, Scale, MapPin } from 'lucide-react';

const Onboarding = ({ onComplete, setRole }) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [kycType, setKycType] = useState(null); // 'individual' or 'entity'

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '100px', minHeight: '100vh' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 className="gradient-text" style={{ fontSize: '28px', marginBottom: '8px' }}>Setup your account</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{ flex: 1, height: '4px', background: step >= i ? 'var(--accent-green)' : 'var(--bg-surface)', borderRadius: '2px', transition: 'var(--transition-smooth)' }} />
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <h2 style={{ fontSize: '20px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={24} color="var(--accent-green)" /> Step 1: Select Your Role
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>Choose how you will interact with the Auxilium platform</p>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { id: 'landowner', name: 'Land Owner', desc: 'Lease or sell my own land parcels', icon: User },
                { id: 'aggregator', name: 'Land Aggregator', desc: 'Aggregate and manage multiple plots', icon: Users },
                { id: 'developer', name: 'Project Developer', desc: 'Discover and acquire land for projects', icon: Zap },
                { id: 'legal', name: 'Legal Firm / Lawyer', desc: 'Due diligence and legal verification', icon: Scale },
                { id: 'agent', name: 'Field Agent', desc: 'On-site surveys and data collection', icon: MapPin },
              ].map(r => (
                <div 
                  key={r.id}
                  className="glass-card" 
                  onClick={() => { setSelectedRole(r.id); setRole(r.id); nextStep(); }}
                  style={{ 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px',
                    padding: '20px',
                    border: selectedRole === r.id ? '1px solid var(--accent-green)' : '1px solid var(--border-glass)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div className="glass" style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selectedRole === r.id ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)' }}>
                    <r.icon size={24} color={selectedRole === r.id ? 'var(--accent-green)' : 'var(--text-muted)'} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '2px' }}>{r.name}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{r.desc}</p>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={24} color="var(--accent-green)" /> Step 2: Identity (KYC)
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div className="glass-card" onClick={() => { setKycType('individual'); nextStep(); }} style={{ cursor: 'pointer', border: kycType === 'individual' ? '1px solid var(--accent-green)' : '' }}>
                <h3 style={{ marginBottom: '4px' }}>Individual</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>PAN + Aadhaar Self-declaration</p>
              </div>
              <div className="glass-card" onClick={() => { setKycType('entity'); nextStep(); }} style={{ cursor: 'pointer', border: kycType === 'entity' ? '1px solid var(--accent-green)' : '' }}>
                <h3 style={{ marginBottom: '4px' }}>Business Entity</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>GSTIN + CIN + Auth Signatory PAN</p>
              </div>
              <button className="btn-secondary" onClick={prevStep}>Back</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Briefcase size={24} color="var(--accent-green)" /> Step 3: Business Profile
            </h2>
            <div className="glass-card">
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Geography</label>
                <input type="text" placeholder="e.g. Rajasthan, Gujarat" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '16px' }} />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Land Types</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Barren', 'Agricultural', 'Industrial', 'Wetland'].map(t => (
                    <span key={t} className="glass" style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={prevStep}>Back</button>
                <button className="btn-primary" style={{ flex: 2 }} onClick={nextStep}>Continue</button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Landmark size={24} color="var(--accent-green)" /> Step 4: Bank Details
            </h2>
            <div className="glass-card">
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Account Number</label>
                <input type="password" placeholder="•••• •••• ••••" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '16px' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>IFSC Code</label>
                <input type="text" placeholder="SBIN0001234" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '16px' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={prevStep}>Back</button>
                <button className="btn-primary" style={{ flex: 2 }} onClick={nextStep}>Verify Bank</button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="step5" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Plus size={24} color="var(--accent-purple)" /> Step 5: First Listing
            </h2>
            <div className="glass-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div className="glass flex-center" style={{ width: '64px', height: '64px', borderRadius: '20px', margin: '0 auto 20px', background: 'rgba(139, 92, 246, 0.1)' }}>
                <CheckCircle2 size={32} color="var(--accent-purple)" />
              </div>
              <h3 style={{ marginBottom: '12px' }}>Profile Ready!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>Let's add your first land parcel to start matching with developers.</p>
              <button className="btn-primary" style={{ width: '100%', background: 'var(--accent-purple)', color: '#fff' }} onClick={nextStep}>Submit First Listing</button>
            </div>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div key="step6" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={24} color="var(--accent-orange)" /> Step 6: Admin Review
            </h2>
            <div className="glass-card" style={{ textAlign: 'center', padding: '40px 24px', border: '1px solid rgba(146, 64, 14, 0.2)' }}>
              <h3 style={{ marginBottom: '12px', color: 'var(--accent-orange)' }}>Verification in Progress</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>Our team is verifying your documents. This usually takes less than 24 hours.</p>
              <div className="glass" style={{ padding: '16px', borderRadius: '12px', marginBottom: '32px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>STATUS</p>
                <p style={{ fontWeight: '600', color: 'var(--accent-orange)' }}>PENDING REVIEW</p>
              </div>
              <button className="btn-primary" style={{ width: '100%' }} onClick={onComplete}>Enter Dashboard</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;

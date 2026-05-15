import { motion } from 'framer-motion';
import { Zap, Shield, Globe } from 'lucide-react';

const Hero = ({ onGetStarted }) => {
  return (
    <div className="hero-container">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="hero-background"
      />
      
      <div className="hero-content">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hero-badge"
        >
          <Zap size={14} fill="currentColor" />
          The Future of Land Procurement
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="hero-title"
        >
          Auxilium
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="hero-subtitle"
        >
          Precision land intelligence for the energy transition. Automate due diligence, 
          rank sites by feasibility, and connect with verified aggregators.
        </motion.p>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="hero-cta"
        >
          <button 
            onClick={onGetStarted}
            className="btn-hero btn-hero-primary"
          >
            Launch Platform
          </button>
          <button className="btn-hero btn-hero-secondary">
            View Analytics
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ 
            marginTop: '80px', 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '40px',
            color: 'var(--text-muted)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} />
            <span style={{ fontSize: '14px' }}>Verified Data</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} />
            <span style={{ fontSize: '14px' }}>Pan-India Coverage</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div style={{ 
        position: 'absolute', 
        bottom: '40px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 1
      }}>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, var(--accent-green), transparent)' }}
        />
      </div>
    </div>
  );
};

export default Hero;

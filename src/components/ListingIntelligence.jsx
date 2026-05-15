import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Zap, 
  Globe, 
  ShieldCheck, 
  BarChart3, 
  Droplets, 
  AlertTriangle, 
  DollarSign, 
  Users, 
  Cpu, 
  Map as MapIcon,
  Plus,
  Save,
  CheckCircle2,
  ChevronRight,
  Info,
  Layout
} from 'lucide-react';

const ListingIntelligence = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('suitability');
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  // Comprehensive State Machine
  const [formData, setFormData] = useState({
    suitability: { type: 'Solar', capacity: '', terrain: 'Flat', contiguity: 'Single Parcel', expandability: 'No' },
    grid: { substations: [], txLines: '', evacuation: 'High', timeline: '12-18 Months', risk: 'Low' },
    legal: { ownership: 'Private', clarity: '90%', mutation: 'Done', encumbrance: 'None', documents: [] },
    resource: { ghi: '5.8', windSpeed: '6.5', hybridScore: '85', bessStability: 'High' },
    infra: { water: 'Borewell', access: 'High', labor: 'Available', town: '' },
    risk: { forest: 'No', wildlife: 'Low', social: 'Low', flood: 'Low' },
    commercials: { lease: '', sale: '', stampDuty: '', irr: '14%' },
    marketplace: { visibility: 'Public', nda: false, status: 'Draft' }
  });

  // Autosave Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      handleAutosave();
    }, 3000);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleAutosave = () => {
    setIsDraftSaving(true);
    localStorage.setItem('aux_draft_listing', JSON.stringify(formData));
    setTimeout(() => {
      setIsDraftSaving(false);
      setLastSaved(new Date().toLocaleTimeString());
    }, 1000);
  };

  const updateField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const calculateCapacity = (acreage) => {
    // Basic formula: 1 Acre = ~0.25 MW for Solar
    return (acreage * 0.25).toFixed(2);
  };

  const tabs = [
    { id: 'suitability', label: 'Suitability', icon: Zap, color: 'var(--accent-blue)' },
    { id: 'grid', label: 'Grid & Evac', icon: Globe, color: 'var(--accent-purple)' },
    { id: 'legal', label: 'Legal & Title', icon: ShieldCheck, color: 'var(--accent-green)' },
    { id: 'resource', label: 'Resource', icon: BarChart3, color: 'var(--accent-orange)' },
    { id: 'infra', label: 'Infra & Water', icon: Droplets, color: 'var(--accent-blue)' },
    { id: 'risk', label: 'ESG & Risk', icon: AlertTriangle, color: '#ef4444' },
    { id: 'commercials', label: 'Commercials', icon: DollarSign, color: 'var(--accent-green)' },
    { id: 'marketplace', label: 'Marketplace', icon: Users, color: 'var(--accent-purple)' },
    { id: 'ai', label: 'AI Insights', icon: Cpu, color: 'var(--accent-orange)' }
  ];

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '100px', maxWidth: '1200px' }}>
      {/* Header & Status */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate(-1)} className="glass" style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '24px' }}>RE Intelligence Listing</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isDraftSaving ? 'var(--accent-orange)' : 'var(--accent-green)' }} />
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {isDraftSaving ? 'Saving draft...' : `Last saved at ${lastSaved || 'Just now'}`}
              </p>
            </div>
          </div>
        </div>
        <button className="btn-primary" style={{ padding: '10px 24px', background: 'var(--accent-green)', color: '#fff' }}>
          Publish to Market
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
        {/* Navigation Sidebar */}
        <aside style={{ position: 'sticky', top: '20px', alignSelf: 'start' }}>
          <div className="glass-card" style={{ padding: '8px' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: activeTab === tab.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: 'none',
                  color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
              >
                <tab.icon size={18} color={activeTab === tab.id ? tab.color : 'var(--text-muted)'} />
                <span style={{ fontSize: '14px', fontWeight: activeTab === tab.id ? '600' : '400' }}>{tab.label}</span>
                {activeTab === tab.id && <motion.div layoutId="activeTab" style={{ marginLeft: 'auto', width: '4px', height: '4px', borderRadius: '50%', background: tab.color }} />}
              </button>
            ))}
          </div>
          
          <div className="glass-card" style={{ marginTop: '20px', background: 'rgba(59, 130, 246, 0.1)' }}>
            <h4 style={{ fontSize: '12px', color: 'var(--accent-blue)', marginBottom: '8px' }}>INTELLIGENCE SCORE</h4>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <p style={{ fontSize: '32px', fontWeight: '800' }}>82</p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/100</p>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>High potential for Solar PV. Title verification pending.</p>
          </div>
        </aside>

        {/* Form Content Area */}
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'suitability' && (
                <div className="glass-card">
                  <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Zap size={24} color="var(--accent-blue)" /> Project Suitability
                  </h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    <div className="form-group">
                      <label className="label">Project Type</label>
                      <select 
                        className="input" 
                        value={formData.suitability.type}
                        onChange={(e) => updateField('suitability', 'type', e.target.value)}
                      >
                        <option>Solar</option>
                        <option>Wind</option>
                        <option>Hybrid</option>
                        <option>BESS</option>
                        <option>RTC</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="label">Terrain Score</label>
                      <select className="input" value={formData.suitability.terrain} onChange={(e) => updateField('suitability', 'terrain', e.target.value)}>
                        <option>Flat</option>
                        <option>Moderate</option>
                        <option>Hilly</option>
                        <option>Rocky</option>
                      </select>
                    </div>
                  </div>

                  <div className="glass" style={{ padding: '20px', borderRadius: '16px', marginBottom: '24px', background: 'rgba(59, 130, 246, 0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <p style={{ fontWeight: '600' }}>Estimated Project Capacity</p>
                      <Info size={16} color="var(--text-muted)" />
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <label className="label">Acreage</label>
                        <input 
                          type="number" 
                          placeholder="Enter acres" 
                          className="input" 
                          onChange={(e) => updateField('suitability', 'capacity', calculateCapacity(e.target.value))}
                        />
                      </div>
                      <div style={{ textAlign: 'center', padding: '0 20px' }}>
                        <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-blue)' }}>=</p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="label">MW Potential (Auto)</label>
                        <input type="text" className="input" value={`${formData.suitability.capacity || 0} MW`} readOnly />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="label">Land Contiguity</label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {['Single Parcel', 'Multi Parcel', 'Fragmented'].map(opt => (
                        <button 
                          key={opt}
                          className="glass" 
                          style={{ flex: 1, padding: '12px', borderRadius: '10px', border: formData.suitability.contiguity === opt ? '1px solid var(--accent-blue)' : '1px solid var(--border-glass)' }}
                          onClick={() => updateField('suitability', 'contiguity', opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'grid' && (
                <div className="glass-card">
                  <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Globe size={24} color="var(--accent-purple)" /> Grid & Evacuation
                  </h2>
                  
                  <div className="glass" style={{ padding: '0', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
                     <div style={{ padding: '16px', background: 'rgba(167, 139, 250, 0.1)', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: '600', fontSize: '14px' }}>Nearby Substations (Auto-Fetch)</p>
                        <button className="text-btn" style={{ color: 'var(--accent-purple)', fontSize: '12px' }}>Refresh GIS</button>
                     </div>
                     <div style={{ padding: '16px' }}>
                        <div className="list-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid var(--border-glass)' }}>
                           <div>
                              <p style={{ fontWeight: '600', fontSize: '14px' }}>Jodhpur Central GSS</p>
                              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>220kV • 4.2 km from site</p>
                           </div>
                           <div style={{ textAlign: 'right' }}>
                              <span className="glass" style={{ fontSize: '10px', color: 'var(--accent-green)', padding: '4px 8px', borderRadius: '8px' }}>HIGH CAPACITY</span>
                           </div>
                        </div>
                        <div className="list-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px' }}>
                           <div>
                              <p style={{ fontWeight: '600', fontSize: '14px' }}>Bikaner Solar Hub</p>
                              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>400kV • 12.8 km from site</p>
                           </div>
                           <div style={{ textAlign: 'right' }}>
                              <span className="glass" style={{ fontSize: '10px', color: 'var(--accent-orange)', padding: '4px 8px', borderRadius: '8px' }}>CONGESTED</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label className="label">Evacuation Feasibility</label>
                      <select className="input" value={formData.grid.evacuation} onChange={(e) => updateField('grid', 'evacuation', e.target.value)}>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="label">Est. Timeline</label>
                      <select className="input" value={formData.grid.timeline} onChange={(e) => updateField('grid', 'timeline', e.target.value)}>
                        <option>6-12 Months</option>
                        <option>12-18 Months</option>
                        <option>18-24 Months</option>
                        <option>24+ Months</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="glass-card" style={{ border: '1px solid var(--accent-orange)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                      <div className="glass flex-center" style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.1)' }}>
                        <Cpu size={24} color="var(--accent-orange)" />
                      </div>
                      <div>
                        <h2 style={{ fontSize: '18px' }}>AI Automation Hub</h2>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Generate investor-ready intelligence reports</p>
                      </div>
                   </div>

                   <div style={{ display: 'grid', gap: '16px' }}>
                      <div className="glass" style={{ padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div>
                            <p style={{ fontWeight: '600' }}>Project Teaser (IM)</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Auto-generate one-page investment summary.</p>
                         </div>
                         <button className="glass" style={{ color: 'var(--accent-orange)' }}>Generate</button>
                      </div>
                      <div className="glass" style={{ padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div>
                            <p style={{ fontWeight: '600' }}>Grid Feasibility Report</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Detailed evacuation analysis via GIS data.</p>
                         </div>
                         <button className="glass" style={{ color: 'var(--accent-orange)' }}>Generate</button>
                      </div>
                      <div className="glass" style={{ padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div>
                            <p style={{ fontWeight: '600' }}>Risk Summary Engine</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ESG and Environmental risk heatmap analysis.</p>
                         </div>
                         <button className="glass" style={{ color: 'var(--accent-orange)' }}>Generate</button>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'legal' && (
                <div className="glass-card">
                  <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={24} color="var(--accent-green)" /> Land Legal & Ownership
                  </h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    <div className="form-group">
                      <label className="label">Ownership Type</label>
                      <select className="input" value={formData.legal.ownership} onChange={(e) => updateField('legal', 'ownership', e.target.value)}>
                        <option>Private</option>
                        <option>Government</option>
                        <option>Forest</option>
                        <option>Tribal</option>
                        <option>Ceiling</option>
                        <option>Industrial</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="label">Ownership Clarity Score</label>
                      <input type="text" className="input" value={formData.legal.clarity} onChange={(e) => updateField('legal', 'clarity', e.target.value)} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                    <div className="form-group">
                      <label className="label">Mutation Status</label>
                      <select className="input" value={formData.legal.mutation} onChange={(e) => updateField('legal', 'mutation', e.target.value)}>
                        <option>Done</option>
                        <option>Pending</option>
                        <option>Not Initiated</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="label">Litigation Status</label>
                      <select className="input">
                        <option>Clear</option>
                        <option>Ongoing Case</option>
                        <option>Disputed</option>
                      </select>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--text-muted)' }}>REQUIRED DOCUMENTS</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {['Sale Deed', 'Khasra/B1', 'Mutation Cert', 'Registry Copy', 'Tax Receipt', 'KML/KMZ'].map(doc => (
                      <div key={doc} className="glass" style={{ padding: '12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px' }}>{doc}</span>
                        <Upload size={14} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'resource' && (
                <div className="glass-card">
                  <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BarChart3 size={24} color="var(--accent-orange)" /> Resource Intelligence
                  </h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    <div className="form-group">
                      <label className="label">Annual GHI (Solar)</label>
                      <input type="text" className="input" value={formData.resource.ghi} onChange={(e) => updateField('resource', 'ghi', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="label">Avg Wind Speed (m/s)</label>
                      <input type="text" className="input" value={formData.resource.windSpeed} onChange={(e) => updateField('resource', 'windSpeed', e.target.value)} />
                    </div>
                  </div>

                  <div className="glass" style={{ padding: '20px', borderRadius: '16px', borderLeft: '4px solid var(--accent-orange)' }}>
                    <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>Hybrid Potential Score</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                          <div style={{ width: '85%', height: '100%', background: 'var(--accent-orange)', borderRadius: '4px' }} />
                       </div>
                       <span style={{ fontWeight: '700' }}>85%</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'risk' && (
                <div className="glass-card">
                  <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertTriangle size={24} color="#ef4444" /> ESG & Risk Engine
                  </h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    <div className="form-group">
                      <label className="label">Forest Proximity</label>
                      <select className="input" value={formData.risk.forest} onChange={(e) => updateField('risk', 'forest', e.target.value)}>
                        <option>No</option>
                        <option>Within 1km</option>
                        <option>Within 5km</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="label">Wildlife Sensitivity</label>
                      <select className="input" value={formData.risk.wildlife} onChange={(e) => updateField('risk', 'wildlife', e.target.value)}>
                        <option>Low</option>
                        <option>Moderate</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>

                  <div className="glass" style={{ padding: '16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <p style={{ color: '#ef4444', fontSize: '13px', fontWeight: '600' }}>Flood Risk Heatmap Integration</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>AI detects low-lying areas. 12% of parcel at risk during monsoon.</p>
                  </div>
                </div>
              )}

              {activeTab === 'commercials' && (
                <div className="glass-card">
                  <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <DollarSign size={24} color="var(--accent-green)" /> Commercials & IRR
                  </h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    <div className="form-group">
                      <label className="label">Expected Lease (per acre/yr)</label>
                      <input type="text" className="input" placeholder="₹ 45,000" />
                    </div>
                    <div className="form-group">
                      <label className="label">Expected Sale (per acre)</label>
                      <input type="text" className="input" placeholder="₹ 8,00,000" />
                    </div>
                  </div>

                  <div className="glass" style={{ padding: '20px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                       <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Estimated Project IRR Impact</p>
                       <span style={{ color: 'var(--accent-green)', fontWeight: '700' }}>+1.2%</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Based on land cost vs state average. High tariff viability.</p>
                  </div>
                </div>
              )}

              {/* Add more section content as needed */}
              {['infra', 'marketplace'].includes(activeTab) && (
                <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
                  <Layout size={48} color="var(--text-muted)" style={{ marginBottom: '20px', opacity: 0.2 }} />
                  <p style={{ color: 'var(--text-muted)' }}>This section ({activeTab.toUpperCase()}) is ready for configuration.</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Please provide specific sub-fields to customize this enterprise module.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <style>{`
        .form-group { margin-bottom: 20px; }
        .label { display: block; color: var(--text-muted); font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px; }
        .input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); borderRadius: 12px; padding: 14px 16px; color: #fff; font-size: 15px; outline: none; transition: border 0.2s; }
        .input:focus { border-color: var(--accent-blue); }
        .text-btn { background: none; border: none; cursor: pointer; font-weight: 600; }
        .list-item { transition: background 0.2s; border-radius: 8px; }
        .list-item:hover { background: rgba(255,255,255,0.02); }
      `}</style>
    </div>
  );
};

export default ListingIntelligence;

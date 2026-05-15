import { LayoutDashboard, Search, PlusSquare, User, MessageCircle, Briefcase } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { RoleContext } from '../App';

const Navigation = () => {
  const { role } = useContext(RoleContext);

  return (
    <nav className="glass" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '80px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0 20px 20px 20px',
      borderTop: '1px solid var(--border-glass)',
      zIndex: 1000
    }}>
      <NavLink to="/" className={({ isActive }) => `flex-center flex-col gap-1 ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none', transition: 'var(--transition-smooth)' }}>
        {({ isActive }) => (
          <>
            <LayoutDashboard size={24} color={isActive ? (role === 'aggregator' ? 'var(--accent-green)' : 'var(--accent-blue)') : 'var(--text-muted)'} />
            <span style={{ fontSize: '12px', fontWeight: isActive ? '600' : '400', color: isActive ? (role === 'aggregator' ? 'var(--accent-green)' : 'var(--accent-blue)') : 'var(--text-muted)' }}>
              {role === 'aggregator' ? 'Supply' : 'Market'}
            </span>
          </>
        )}
      </NavLink>
      
      <NavLink to="/search" className={({ isActive }) => `flex-center flex-col gap-1 ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none', transition: 'var(--transition-smooth)' }}>
        {({ isActive }) => (
          <>
            <Search size={24} color={isActive ? 'var(--accent-blue)' : 'var(--text-muted)'} />
            <span style={{ fontSize: '12px', fontWeight: isActive ? '600' : '400', color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)' }}>Search</span>
          </>
        )}
      </NavLink>

      <NavLink to={role === 'aggregator' ? '/list-land' : '/project-intake'} className="flex-center" style={{
        background: role === 'aggregator' ? 'var(--accent-green)' : 'var(--accent-blue)',
        width: '56px',
        height: '56px',
        borderRadius: '18px',
        marginTop: '-30px',
        boxShadow: `0 4px 20px ${role === 'aggregator' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(30, 58, 138, 0.4)'}`,
        border: '4px solid var(--bg-primary)',
        transition: 'var(--transition-smooth)'
      }}>
        <PlusSquare size={28} color="#fff" />
      </NavLink>

      <NavLink to="/messages" className={({ isActive }) => `flex-center flex-col gap-1 ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none', transition: 'var(--transition-smooth)' }}>
        {({ isActive }) => (
          <>
            <MessageCircle size={24} color={isActive ? 'var(--accent-purple)' : 'var(--text-muted)'} />
            <span style={{ fontSize: '12px', fontWeight: isActive ? '600' : '400', color: isActive ? 'var(--accent-purple)' : 'var(--text-muted)' }}>Inbox</span>
          </>
        )}
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => `flex-center flex-col gap-1 ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none', transition: 'var(--transition-smooth)' }}>
        {({ isActive }) => (
          <>
            <User size={24} color={isActive ? 'var(--text-primary)' : 'var(--text-muted)'} />
            <span style={{ fontSize: '12px', fontWeight: isActive ? '600' : '400', color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>Settings</span>
          </>
        )}
      </NavLink>
    </nav>
  );
};

export default Navigation;

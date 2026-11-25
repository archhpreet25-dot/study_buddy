import React from 'react';
export default function Header() {
  return <header className="topbar">
    <a className="brand" href="/"><span className="brand-mark">S</span><span>study<span className="brand-light">buddy</span><small>STUDENT WORKSPACE</small></span></a>
    <div className="topbar-note"><span className="online-dot"/> Your progress is saved automatically</div>
  </header>;
}

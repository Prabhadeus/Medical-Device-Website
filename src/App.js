import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection';

function App() {
    const [modeIndex, setModeIndex] = useState(0);
    const modeCycle = ['video', 'cad', 'fea'];
    const currentMode = modeCycle[modeIndex];

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Navbar currentMode={currentMode} />
            <HeroSection
                modeIndex={modeIndex}
                setModeIndex={setModeIndex}
                modeCycle={modeCycle}
            />
        </main>
    );
}

export default App;

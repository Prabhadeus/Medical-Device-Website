import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.jsx';
import HeroSection from "./components/HeroSection";

function App() {
    return (
        <div className="font-sans">
            <Navbar />
            <HeroSection />
        </div>
    );
}

export default App;

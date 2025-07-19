import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.jsx';

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="pt-16">
                <div className="p-4">Welcome to MedEdu!</div>
            </main>
        </div>
    );
}

export default App;

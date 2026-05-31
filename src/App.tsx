
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Workflow from './components/Workflow';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="bg-animation">
        <div className="particles"></div>
      </div>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Workflow />
      </main>

      <Footer />
    </>
  );
}

export default App;

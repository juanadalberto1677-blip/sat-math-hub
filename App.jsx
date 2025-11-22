import React, { useState } from 'react';
import { 
  Calculator, 
  BookOpen, 
  Youtube, 
  Sigma, 
  ChevronRight, 
  CheckCircle, 
  Menu, 
  X, 
  PlayCircle, 
  FileText,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

// --- Mock Data ---

const PRACTICE_TOPICS = [
  { id: 'linear', title: 'Linear Equations', count: 15 },
  { id: 'systems', title: 'Systems of Equations', count: 12 },
  { id: 'inequalities', title: 'Linear Inequalities', count: 8 },
  { id: 'quadratics', title: 'Quadratics & Parabolas', count: 20 },
  { id: 'functions', title: 'Function Notation', count: 10 },
];

const SAMPLE_PROBLEMS = [
  {
    id: 1,
    question: "If 3x - 9 = 12, what is the value of x + 2?",
    options: ["5", "7", "9", "11"],
    correctAnswer: "9",
    explanation: "First, solve for x: 3x - 9 = 12 -> 3x = 21 -> x = 7. The question asks for x + 2, so 7 + 2 = 9."
  },
  {
    id: 2,
    question: "A line in the xy-plane passes through the origin and has a slope of 1/7. Which of the following points lies on the line?",
    options: ["(0, 7)", "(1, 7)", "(7, 7)", "(14, 2)"],
    correctAnswer: "(14, 2)",
    explanation: "The equation of the line is y = (1/7)x. We plug in the options. For (14, 2): 2 = (1/7)*14 -> 2 = 2. This is correct."
  },
  {
    id: 3,
    question: "Which of the following is equivalent to 2(x + 3) + 4x + 5?",
    options: ["6x + 8", "6x + 11", "2x + 11", "8x + 8"],
    correctAnswer: "6x + 11",
    explanation: "Distribute the 2: 2x + 6 + 4x + 5. Combine like terms: (2x + 4x) + (6 + 5) = 6x + 11."
  }
];

// --- Components ---

const Header = ({ activePage, setActivePage, mobileMenuOpen, setMobileMenuOpen }) => (
  <nav className="bg-white shadow-sm sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => setActivePage('home')}
        >
          <div className="bg-blue-900 p-2 rounded-lg mr-3">
            <Sigma className="h-6 w-6 text-yellow-400" />
          </div>
          <span className="font-bold text-2xl text-blue-900 tracking-tight">
            SAT Math <span className="text-blue-600">Hub</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {['Home', 'Formulas', 'Desmos', 'Practice', 'Videos'].map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item.toLowerCase())}
              className={`$${
                activePage === item.toLowerCase() 
                  ? 'text-blue-900 font-bold border-b-2 border-yellow-400' 
                  : 'text-gray-600 hover:text-blue-900'
              } px-1 py-2 transition-colors duration-200`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded-full transition shadow-md">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3">
        {['Home', 'Formulas', 'Desmos', 'Practice', 'Videos'].map((item) => (
          <button
            key={item}
            onClick={() => {
              setActivePage(item.toLowerCase());
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-lg font-medium text-gray-700 py-2"
          >
            {item}
          </button>
        ))}
      </div>
    )}
  </nav>
);

const Hero = ({ setActivePage }) => (
  <div className="relative bg-blue-900 overflow-hidden">
    {/* Abstract Background Shapes */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-yellow-400 blur-3xl"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-700 bg-blue-800/50 text-yellow-400 text-sm font-medium mb-6">
          <span className="flex h-2 w-2 rounded-full bg-yellow-400 mr-2"></span>
          Updated for the Digital SAT Suite
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
          Master the Math. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
            Crush the Score.
          </span>
        </h1>
        <p className="text-xl text-blue-100 mb-10 leading-relaxed">
          Your all-in-one resource for SAT Math. Access curated formulas, Desmos mastery guides, and targeted practice problems designed to maximize your potential.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => setActivePage('practice')}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center"
          >
            Start Practicing
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button 
            onClick={() => setActivePage('formulas')}
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg transition flex items-center justify-center"
          >
            View Formulas
          </button>
        </div>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, color, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer group"
  >
    <div className={`inline-flex p-3 rounded-xl ${color} text-white mb-6 group-hover:scale-110 transition-transform`}>
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
    <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
      Explore <ChevronRight className="h-5 w-5 ml-1" />
    </div>
  </div>
);

const Home = ({ setActivePage }) => (
  <>
    <Hero setActivePage={setActivePage} />
    
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={FileText}
            title="Formula Docs"
            description="Essential cheat sheets categorized by Algebra, Geometry, and Trig. Never forget a formula again."
            color="bg-blue-600"
            onClick={() => setActivePage('formulas')}
          />
          <FeatureCard 
            icon={TrendingUp}
            title="Desmos Tutorials"
            description="Learn the calculator hacks that save time. Step-by-step guides for the built-in graphing tool."
            color="bg-green-600"
            onClick={() => setActivePage('desmos')}
          />
          <FeatureCard 
            icon={BookOpen}
            title="Topic Practice"
            description="Target your weak spots with documents consisting entirely of focused practice problems."
            color="bg-purple-600"
            onClick={() => setActivePage('practice')}
          />
          <FeatureCard 
            icon={Youtube}
            title="Video Lessons"
            description="Visual learner? Watch our deep-dive breakdowns of difficult topics and exam strategies."
            color="bg-red-600"
            onClick={() => setActivePage('videos')}
          />
        </div>
      </div>
    </section>

    {/* Social Proof / Stats */}
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-12">Why Students Trust Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="text-4xl font-extrabold text-yellow-500 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Practice Problems</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-extrabold text-yellow-500 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Video Tutorials</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-extrabold text-yellow-500 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Free Resources</div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const ProblemCard = ({ problem, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Problem {index + 1}</span>
        <div className="flex space-x-2">
          <span className="h-2 w-2 rounded-full bg-red-400"></span>
          <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
          <span className="h-2 w-2 rounded-full bg-green-400"></span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-lg text-gray-800 font-medium mb-6">{problem.question}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {problem.options.map((opt, idx) => (
            <button 
              key={idx}
              onClick={() => setSelectedOption(opt)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedOption === opt 
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <span className="font-bold text-gray-500 mr-2">{String.fromCharCode(65 + idx)}</span>
              {opt}
            </button>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <button 
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-blue-600 font-semibold hover:text-blue-800 flex items-center text-sm"
          >
            {showAnswer ? 'Hide Explanation' : 'Show Explanation'}
            <ChevronRight className={`h-4 w-4 ml-1 transform transition-transform ${showAnswer ? 'rotate-90' : ''}`} />
          </button>

          {showAnswer && (
            <div className="mt-4 bg-green-50 border border-green-100 rounded-lg p-4 animate-fadeIn">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-green-900 font-bold mb-1">Correct Answer: {problem.correctAnswer}</p>
                  <p className="text-green-800 text-sm leading-relaxed">{problem.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PracticePage = () => {
  const [activeTopic, setActiveTopic] = useState('linear');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sub-header */}
      <div className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Heart of Algebra</h1>
          <p className="text-blue-200 mt-2">Master linear equations, inequalities, and functions.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-24">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Topics
                </h3>
              </div>
              <div className="p-2">
                {PRACTICE_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopic(topic.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex justify-between items-center text-sm transition-colors ${
                      activeTopic === topic.id 
                        ? 'bg-blue-50 text-blue-900 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {topic.title}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeTopic === topic.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {topic.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Related Videos Widget */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
               <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <Youtube className="h-4 w-4 mr-2 text-red-600" />
                  Related Lessons
                </h4>
                <div className="space-y-3">
                  <div className="group cursor-pointer">
                    <div className="h-24 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition flex items-center justify-center">
                          <PlayCircle className="text-white h-8 w-8 opacity-80 group-hover:scale-110 transition" />
                       </div>
                    </div>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">Solving Linear Equations in 5 Steps</p>
                  </div>
                </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {PRACTICE_TOPICS.find(t => t.id === activeTopic)?.title} Practice
              </h2>
              <div className="flex gap-2">
                 <button className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                    Download PDF
                 </button>
              </div>
            </div>

            {/* Problem List */}
            <div>
              {SAMPLE_PROBLEMS.map((prob, idx) => (
                <ProblemCard key={prob.id} problem={prob} index={idx} />
              ))}
            </div>

            {/* Pagination Mockup */}
            <div className="flex justify-center mt-8 space-x-2">
               <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed">Previous</button>
               <button className="px-4 py-2 rounded-lg bg-blue-900 text-white font-bold">1</button>
               <button className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">2</button>
               <button className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">3</button>
               <button className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-blue-900">Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const PlaceholderPage = ({ title, icon: Icon }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="inline-flex p-6 bg-blue-100 rounded-full mb-6">
        <Icon className="h-12 w-12 text-blue-900" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-8">This section is under construction. Check out the Practice section for the fully interactive demo!</p>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-blue-950 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center mb-4">
          <Sigma className="h-6 w-6 text-yellow-400 mr-2" />
          <span className="font-bold text-xl">SAT Math Hub</span>
        </div>
        <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
          Empowering students to master the Digital SAT Math section through structured practice, clear formulas, and expert video guidance.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-4">Resources</h4>
        <ul className="space-y-2 text-blue-200 text-sm">
          <li className="hover:text-yellow-400 cursor-pointer">Formula Sheets</li>
          <li className="hover:text-yellow-400 cursor-pointer">Desmos Guide</li>
          <li className="hover:text-yellow-400 cursor-pointer">Practice Banks</li>
          <li className="hover:text-yellow-400 cursor-pointer">Video Library</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-4">Legal</h4>
        <ul className="space-y-2 text-blue-200 text-sm">
          <li className="hover:text-yellow-400 cursor-pointer">Privacy Policy</li>
          <li className="hover:text-yellow-400 cursor-pointer">Terms of Service</li>
          <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-blue-900 text-center text-blue-400 text-sm">
      © 2024 SAT Math Hub. Not affiliated with the College Board.
    </div>
  </footer>
);

// --- Main App Component ---

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'practice':
        return <PracticePage />;
      case 'formulas':
        return <PlaceholderPage title="Formula Documents" icon={FileText} />;
      case 'desmos':
        return <PlaceholderPage title="Desmos Tutorials" icon={TrendingUp} />;
      case 'videos':
        return <PlaceholderPage title="Video Section" icon={Youtube} />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen flex flex-col">
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;

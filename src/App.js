import './App.css';
import NabBar from './components/NabBar';
import News from './components/News';

function App() {
  return (
    <div className="App">
      <NabBar />
      <News pageSize={5} country='us' category='business'/>
    </div>
  );
}

export default App;

import './App.css';
import SpeechRecognition,{useSpeechRecognition} from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import VoiceWaves from './VoiceWaves';
function App() {
  const [textToCopy, setTextToCopy] = useState();
  const [value, setValue]=useState('');
  const[copied,setCopied]=useState(false, {
    successDuration:10000
});
  const [iscopied, setIsCopied] = useClipboard(textToCopy);

  
  const { transcript, browserSupportsSpeechRecognition ,listening,stopListening} = useSpeechRecognition();
  const startListening = ()=>SpeechRecognition.startListening({ continuous: true,language:'en-IN' })

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const handleCopied=()=>{
    setCopied(transcript);
    console.log(transcript);
  }
  return (
      <div className="container">
        <div className='heading'>        <h1>Speech To Text Converter</h1></div>
      <br/>
      <div className='main-content' >
            {transcript}
      </div>
      <div >
        <p style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>Microphone: {listening ? 'on' : 'off'}{listening? <VoiceWaves/> : ''}</p>
      </div>
      <div className='btn-style'>
      <CopyToClipboard text={transcript} onCopy={()=>setCopied}>
      <button onClick={handleCopied}>
                        {copied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
      </CopyToClipboard>
     
                            <button onClick={startListening}>Start Listening</button>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      
      </div>

      </div>
  );
}

export default App;

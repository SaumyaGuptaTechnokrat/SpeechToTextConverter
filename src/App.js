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
      <div className="container-fluid">
        <div className='heading'>       
          <h1>Speech To Text Converter</h1>
         </div>
      <br/>
      <div className='container'>
          <div className='card shadow-lg z-5 rounded-4' id='text'>
            <div className='card-body'>
              <div className='main-content'>
                      <textarea className='transcript'  >{transcript}</textarea>
              
              </div>
            </div>
            <div className='card-footer'>
                <div >
                  <p style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>Microphone: {listening ? 'on' : 'off'}{listening? <VoiceWaves/> : ''}</p>
                </div>
            </div>
          </div>
          <div className='btn-style'>
          
          <CopyToClipboard text={transcript} onCopy={()=>setCopied}>
                      <button className='btn btn-success' onClick={handleCopied}>
                          {copied ? <span class="material-symbols-outlined">
done
</span>: <span class="material-symbols-outlined">
content_copy
</span>}
                      </button>
        </CopyToClipboard>
        <button className='btn btn-success' onClick={startListening}><span class="material-symbols-outlined">keyboard_voice</span></button>
          <button className='btn btn-success' onClick={SpeechRecognition.stopListening}><span class="material-symbols-outlined">
mic_off
</span></button>

        </div>

      </div>
      
      </div>
  );
}

export default App;

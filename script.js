const select = document.querySelector("select");
const textarea = document.querySelector("textarea");
const button = document.querySelector("button");
var flag = true
const message = new SpeechSynthesisUtterance();

let voices = [];

textarea.value = ""

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.textContent = `${voice.name}`;

    select.appendChild(option);
  });
}

speechSynthesis.addEventListener("voiceschanged", getVoices);

select.addEventListener("change", (e) => {
  message.voice = voices.find((voice) => voice.name === e.target.value);
});

button.addEventListener("click", () => {

  message.text = textarea.value.trim();
  if (message.text !== "") {
    speechSynthesis.speak(message);
  }
});

getVoices();


const SpeechRecognition = window.SpeechRecognition
 || window.webkitSpeechRecognition;
 const SpeechGrammarList = window.SpeechGrammarList 
 || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent 
|| window.webkitSpeechRecognitionEvent;
microphone = document.getElementById('microphone')

const colors = {
  красный: 'red',
  оранжевый: 'orange',
  желтый: 'yellow',
  зеленый: 'green',
  голубой: 'blue',
  синий: 'darkblue',
  фиолетовый: 'violet'
};

const colorsList = Object.keys(colors);

const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colorsList.join(' | ') + ' ;';

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'ru-RU';
recognition.interimResults = false;
recognition.maxAlternatives = 1;



microphone.onclick = () =>{
    recognition.start();
    console.log('Ready to receive a color command.');
}

function getColor(speechResult) {
  for (let index = 0; index < colorsList.length; index += 1) {
    if (speechResult.indexOf(colorsList[index]) !== -1) {
      const colorKey = colorsList[index];
      return [colorKey, colors[colorKey]];
    }
  }
  return null;
}

recognition.onresult = function(event) {
  const last = event.results.length - 1;
  const colors = getColor(event.results[last][0].transcript);
  recognitionTextResult.textContent = 'Результат: ' + colors[0];
  document.getElementById('wrapper').style.background=colors[1];
  console.log('Confidence: ' + event.results[0][0].confidence);
};
recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onnomatch = function(event) {
  alert("I didn't recognise that color.");
};

recognition.onerror = function(event) {
  alert(`Error occurred in recognition: ${event.error}`);
};
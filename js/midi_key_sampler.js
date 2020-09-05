var kick = document.getElementById("kick");
var snare = document.getElementById("snare");
var garbage1 = document.getElementById("garbage1");
var garbage2 = document.getElementById("garbage2");
var garbage3 = document.getElementById("garbage3");


  
  
  
  function kickTrig() {
      kick.currentTime = 0;
      kick.play();
      snare.pause();
      window.scrollTo(0, 400);
    }
  
  function snareTrig() {
      snare.currentTime = 0;
      snare.play();
      kick.pause();
      window.scrollTo(0, 0);
    }  
  
    function garbage1Trig() {
      garbage1.currentTime = 0;
      garbage1.play();
      garbage2.pause();
      garbage3.pause();
    }  
  
    function garbage2Trig() {
      garbage2.currentTime = 0;
      garbage2.play();
      garbage1.pause();
      garbage3.pause();
    }  
  
    function garbage3Trig() {
      garbage3.currentTime = 0;
      garbage3.play();
      garbage1.pause();
      garbage2.pause();
    }  
  
  

  document.onkeypress = function(e) {
    if ((e || window.event).code === "KeyA" /* enter key */) {
      kickTrig();
    }
    if ((e || window.event).code === "KeyS" /* enter key */) {
      snareTrig();
    }
    if ((e || window.event).code === "KeyJ" /* enter key */) {
      garbage1Trig();
    }
    if ((e || window.event).code === "KeyK" /* enter key */) {
      garbage2Trig();
    }
    if ((e || window.event).code === "KeyL" /* enter key */) {
      garbage3Trig();
    }
    if ((e || window.event).code === "KeyO" /* enter key */) {
      garbage3.currentTime = 0;
      garbage3.pause();
      garbage1.pause();
      garbage2.pause();
      snare.pause();
      kick.pause();
    }
  };
  
  
// window.onscroll = function() {
//     window.scrollTo(0,400);
// };

// kick.playbackRate = 0.7;
// snare.playbackRate = 1.2;

// get key code
// document.body.addEventListener('keyup', function(event) {
//   console.log(event.code);
// });



// MIDI HERE:

// Globals to access them later.
let midiIn = [];
let midiOut = [];
let notesOn = new Map();

connect();

// Start up WebMidi.
function connect() {
  navigator
    .requestMIDIAccess()
    .then(
      midi => midiReady(midi),
      err => console.log("Something went wrong", err)
    );
}

function midiReady(midi) {
  // Also react to device changes.
  midi.addEventListener("statechange", event => initDevices(event.target));
  initDevices(midi);
}

function initDevices(midi) {
  // Reset.
  midiIn = [];
  midiOut = [];

  // MIDI devices that send you data.
  const inputs = midi.inputs.values();
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    midiIn.push(input.value);
  }

  // MIDI devices that you send data to.
  const outputs = midi.outputs.values();
  for (
    let output = outputs.next();
    output && !output.done;
    output = outputs.next()
  ) {
    midiOut.push(output.value);
  }

  startListening();
}

function startListening() {
  // outputIn.innerHTML = '';

  // Start listening to MIDI messages.
  for (const input of midiIn) {
    input.addEventListener("midimessage", midiMessageReceived);
  }
}

function midiMessageReceived(event) {
  // MIDI commands we care about. See
  // http://webaudio.github.io/web-midi-api/#a-simple-monophonic-sine-wave-midi-synthesizer.
  const NOTE_ON = 9;
  const NOTE_OFF = 8;
  const CTRL = 11;

  const cmd = event.data[0] >> 4;
  const pitch = event.data[1];
  const velocity = event.data.length > 2 ? event.data[2] : 1;

  console.log(event.srcElement.name + " " + cmd + " " + pitch + " " + velocity);

  if (cmd === NOTE_ON) {
    if (pitch === 24) {
      kickTrig();
    }

    if (pitch === 42) {
      snareTrig();
    }

    if (pitch === 33) {
      garbage1Trig();
    }

    if (pitch === 34) {
      garbage2Trig();
    }

    if (pitch === 35) {
      garbage3Trig();
    }
  }
  
  
  
    if (cmd === CTRL) {
    if (pitch === 1) {
  console.log( "ccmidi " + velocity);
    }
  }
}  
  
  
  
  
  
  




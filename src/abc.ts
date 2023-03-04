import * as ABCJS from 'abcjs'

const abcOptions = {
  add_classes: true,
  responsive: "resize"
};

function CursorControl() {
  var self = this;

  self.onReady = function() {
  };
  self.onStart = function() {
    var svg = document.querySelector(".abc-js-music-paper svg");
    var cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
    cursor.setAttribute("class", "abcjs-cursor");
    cursor.setAttributeNS(null, 'x1', 0);
    cursor.setAttributeNS(null, 'y1', 0);
    cursor.setAttributeNS(null, 'x2', 0);
    cursor.setAttributeNS(null, 'y2', 0);
    svg.appendChild(cursor);

  };
  self.beatSubdivisions = 2;
  self.onBeat = function(beatNumber, totalBeats, totalTime) {
  };
  self.onEvent = function(ev) {
    if (ev.measureStart && ev.left === null)
      return; // this was the second part of a tie across a measure line. Just ignore it.

    var lastSelection = document.querySelectorAll(".abc-js-music-paper svg .highlight");
    for (var k = 0; k < lastSelection.length; k++)
      lastSelection[k].classList.remove("highlight");

    for (var i = 0; i < ev.elements.length; i++) {
      var note = ev.elements[i];
      for (var j = 0; j < note.length; j++) {
        note[j].classList.add("highlight");
      }
    }

    var cursor = document.querySelector(".abc-js-music-paper svg .abcjs-cursor");
    if (cursor) {
      cursor.setAttribute("x1", ev.left - 2);
      cursor.setAttribute("x2", ev.left - 2);
      cursor.setAttribute("y1", ev.top);
      cursor.setAttribute("y2", ev.top + ev.height);
    }
  };
  self.onFinished = function() {
    var els = document.querySelectorAll("svg .highlight");
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove("highlight");
    }
    var cursor = document.querySelector(".abc-js-music-paper svg .abcjs-cursor");
    if (cursor) {
      cursor.setAttribute("x1", 0);
      cursor.setAttribute("x2", 0);
      cursor.setAttribute("y1", 0);
      cursor.setAttribute("y2", 0);
    }
  };
}


export function load(paperEl: HTMLElement, audioEl: HTMLElement, source: String) {
  console.log("abc load method");
  console.log(paperEl);
  console.log(audioEl);



  let cursorControl = new CursorControl();

  let synthControl;

  if (ABCJS.synth.supportsAudio()) {
    synthControl = new ABCJS.synth.SynthController();
    synthControl.load(audioEl, cursorControl, { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true });
  } else {
    audioEl.innerHTML = "<div class='audio-error'>Audio is not supported in this browser.</div>";
  }
  synthControl.disable(true);

  var visualObj = ABCJS.renderAbc(paperEl, source, abcOptions)[0];

  var midiBuffer = new ABCJS.synth.CreateSynth();

  midiBuffer.init({
    visualObj: visualObj,
  }).then(function(response) {
    console.log(response);
    if (synthControl) {
      synthControl.setTune(visualObj, false).then(function(response) {
        console.log("Audio successfully loaded.")
      }).catch(function(error) {
        console.warn("Audio problem:", error);
      });
    }
  }).catch(function(error) {
    console.warn("Audio problem:", error);
  });
}

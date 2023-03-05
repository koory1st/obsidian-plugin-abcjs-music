import * as ABCJS from 'abcjs'
import { parse } from 'path';
import { parentPort } from 'worker_threads';

const abcOptions = {
  add_classes: true,
  responsive: "resize"
};

class CursorControlClass implements ABCJS.CursorControl {
  paperEl: HTMLElement
  audioEl: HTMLElement
  beatSubdivisions = 2

  constructor(paperEl: HTMLElement, audioEl: HTMLElement) {
    this.paperEl = paperEl
    this.audioEl = audioEl
  }

  onStart() {
    let svg = this.paperEl.querySelector("svg");
    if (!svg) {
      return
    }
    var cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
    cursor.setAttribute("class", "abcjs-cursor");
    cursor.setAttributeNS(null, 'x1', 0);
    cursor.setAttributeNS(null, 'y1', 0);
    cursor.setAttributeNS(null, 'x2', 0);
    cursor.setAttributeNS(null, 'y2', 0);

    svg.appendChild(cursor);
  }

  onFinished() {
    var els = this.paperEl.querySelectorAll("svg .highlight");
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove("highlight");
    }
    var cursor = this.paperEl.querySelector("svg .abcjs-cursor");
    if (cursor) {
      cursor.setAttribute("x1", 0);
      cursor.setAttribute("x2", 0);
      cursor.setAttribute("y1", 0);
      cursor.setAttribute("y2", 0);
    }
  }
  onEvent(event: ABCJS.NoteTimingEvent): void {
    if (event.measureStart && event.left === null)
      return; // this was the second part of a tie across a measure line. Just ignore it.

    var lastSelection = this.paperEl.querySelectorAll("svg .highlight");
    for (var k = 0; k < lastSelection.length; k++)
      lastSelection[k].classList.remove("highlight");

    for (var i = 0; i < event.elements.length; i++) {
      var note = event.elements[i];
      for (var j = 0; j < note.length; j++) {
        note[j].classList.add("highlight");
      }
    }

    var cursor = this.paperEl.querySelector("svg .abcjs-cursor");
    if (cursor) {
      cursor.setAttribute("x1", event.left - 2);
      cursor.setAttribute("x2", event.left - 2);
      cursor.setAttribute("y1", event.top);
      cursor.setAttribute("y2", event.top + event.height);
    }
  }
}


export function load(paperEl: HTMLElement, audioEl: HTMLElement, source: String) {
  console.log("abc load method");
  console.log(paperEl);
  console.log(audioEl);



  let cursorControl = new CursorControlClass(paperEl, audioEl);

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

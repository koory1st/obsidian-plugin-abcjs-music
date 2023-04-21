import * as ABCJS from 'abcjs'
import { parse } from 'path';
import { parentPort } from 'worker_threads';



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
    cursor.setAttributeNS(null, 'x1', '0');
    cursor.setAttributeNS(null, 'y1', '0');
    cursor.setAttributeNS(null, 'x2', '0');
    cursor.setAttributeNS(null, 'y2', '0');

    svg.appendChild(cursor);
  }

  onFinished() {
    var els = this.paperEl.querySelectorAll("svg .highlight");
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove("highlight");
    }
    var cursor = this.paperEl.querySelector("svg .abcjs-cursor");
    if (cursor) {
      cursor.setAttribute("x1", '0');
      cursor.setAttribute("x2", '0');
      cursor.setAttribute("y1", '0');
      cursor.setAttribute("y2", '0');
    }
  }
  onEvent(event: ABCJS.NoteTimingEvent): void {
    if (event.measureStart && event.left === null)
      return; // this was the second part of a tie across a measure line. Just ignore it.

    var lastSelection = this.paperEl.querySelectorAll("svg .highlight");
    for (var k = 0; k < lastSelection.length; k++)
      lastSelection[k].classList.remove("highlight");

    if (!event || !event.elements) {
      return;
    }
    for (var i = 0; i < event.elements.length; i++) {
      var note = event.elements[i];
      for (var j = 0; j < note.length; j++) {
        note[j].classList.add("highlight");
      }
    }

    if (!event.left || !event.top || !event.height) {
      return;
    }

    var cursor = this.paperEl.querySelector("svg .abcjs-cursor");
    if (cursor) {
      let x = String(event.left - 2);
      cursor.setAttribute("x1", x);
      cursor.setAttribute("x2", x);
      let y1 = String(event.top);
      cursor.setAttribute("y1", y1);
      let y2 = String(event.top + event.height);
      cursor.setAttribute("y2", y2);
    }
  }
}


export function load(paperEl: HTMLElement, audioEl: HTMLElement, source: string) {
  console.log("abc load method");
  console.log(paperEl);
  console.log(audioEl);

  if (!ABCJS.synth.supportsAudio()) {
    audioEl.innerHTML = "<div class='audio-error'>Audio is not supported in this browser.</div>";
    return;
  }



  let cursorControl = new CursorControlClass(paperEl, audioEl);

  let synthControl: ABCJS.SynthObjectController;

  synthControl = new ABCJS.synth.SynthController();

  const synthOption: ABCJS.SynthVisualOptions = { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true }
  synthControl.load(audioEl, cursorControl, synthOption);
  synthControl.disable(true);

  const abcOptions: ABCJS.AbcVisualParams = {
    add_classes: true,
    responsive: "resize"
  };
  var visualObj = ABCJS.renderAbc(paperEl, source, abcOptions)[0];

  var midiBuffer = new ABCJS.synth.CreateSynth();

  midiBuffer.init({
    visualObj: visualObj,
  }).then(function(response) {
    console.log(response);
    synthControl.setTune(visualObj, false).then(function(_) {
      console.log("Audio successfully loaded.")
    }).catch(function(error) {
      console.warn("Audio problem:", error);
    });
  }).catch(function(error) {
    console.warn("Audio problem:", error);
  });
}

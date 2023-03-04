export async function addAbcEl(el: HTMLElement): Promise<[HTMLElement, HTMLElement]> {
  let mainEl = await addMainContainer(el)
  let paperEl = await addPaper(mainEl)
  let audioEl = await addAudio(mainEl)
  return Promise.resolve([paperEl, audioEl])
}

function addMainContainer(el: HTMLElement): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    el.createDiv({ cls: "abc-js-music-main" }, mainEl => resolve(mainEl))
  })
}

function addPaper(mainEl: HTMLElement): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    mainEl.createDiv({ cls: "abc-js-music-paper" }, notationEl => resolve(notationEl))
  })
}
function addAudio(mainEl: HTMLElement): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    mainEl.createDiv({ cls: "abc-js-music-audio" }, soundBarEl => resolve(soundBarEl))
  })
}

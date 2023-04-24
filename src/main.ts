import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { addAbcEl } from './html_element_operator';
import * as abc from './abc'

interface AbcJsMusicPluginSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: AbcJsMusicPluginSettings = {
  mySetting: 'default'
}

export default class AbcJsMusicPlugin extends Plugin {
  settings: AbcJsMusicPluginSettings;

  async onload() {
    console.log("AbcJsMusci start");
    this.registerMarkdownCodeBlockProcessor('abc', this.codeProcessor);
  }

  async codeProcessor(source: string, el: HTMLElement, ctx: any) {
    let els = await addAbcEl(el)

    setTimeout(() => {
      abc.load(els[0], els[1], source)

    }, 0)
    console.log("source", source);
    console.log("el", el);
    console.log("ctx", ctx);
  }

  onunload() {

    console.log("AbcJsMusci end");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}



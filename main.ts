import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface AbcJsMusicPluginSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: AbcJsMusicPluginSettings = {
  mySetting: 'default'
}

export default class AbcJsMusicPlugin extends Plugin {
  settings: AbcJsMusicPluginSettings;

  async onload() {

    console.log(123);

  }

  onunload() {

  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}



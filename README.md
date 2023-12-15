# obsidian-plugin-abcjs-music

# Introduction

[中文介绍](https://github.com/koory1st/obsidian-plugin-abcjs-music/blob/main/README.cn.md)

This is an Obsidian plugin that integrates the abc.js library, allowing you to write sheet music and play it within Obsidian.

<iframe src="//player.bilibili.com/player.html?aid=791763848&bvid=BV1zC4y1979J&cid=1356757187&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

# Installation

Download the three files from the "release" section and place them in the `obsidian_vault_folder/.obsidian/plugins/obsidian-plugin-abcjs-music` directory of your Obsidian vault. 

If the directory is missing, please create the missing folders. The name of the last level directory can be anything.

# Usage

Use the `abc` notation within a code block.

```abc
{
  "tablature": [{"instrument": "violin"}]
}
---
X:1
T: Cooley's
M: 4/4
L: 1/8
R: reel
K: G
|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|
```

For more information on using abcjs, please refer to [RenderAbc options | abcjs](https://paulrosen.github.io/abcjs/visual/render-abc-options.html)

# Inspired

This plugin was inspired by [GitHub - abcjs-music/obsidian-plugin-abcjs: Plugin which renders music notations from code blocks](https://github.com/abcjs-music/obsidian-plugin-abcjs)

# Support me

If you find this plugin useful, consider buying me a cup of coffee to give them the motivation to me even better and more interesting things.

[Buy Me a Coffee. ko-fi.co.](https://ko-fi.com/levygu)

<img src="https://blog.matou.dev/images/weixin_qrcode.png" width = "300" height = "300" alt="图片名称" align=center /> <img src="https://blog.matou.dev/images/zhifubao_qrcode.jpg" width = "300" height = "300" alt="图片名称" align=center />

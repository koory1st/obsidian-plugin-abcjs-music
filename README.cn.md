# 前言

这是一个Obsidian插件，整合了abc.js库，所以在obsidian里，可以写乐谱，并播放乐谱。

# 安装

下载release中的三个文件到`obsidian`的vault的`test_obsidian/.obsidian/plugins/obsidian-plugin-abcjs-music`目录中，如果缺少目录层级，请创建缺失的文件夹。最后一级的目录名字随意。

# 使用方式

请用abc标注代码块。

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

更多关于abcjs的使用方式，请参考 https://paulrosen.github.io/abcjs/visual/render-abc-options.html

# 受启发于

https://github.com/abcjs-music/obsidian-plugin-abcjs

# 赞赏

如果你觉得这个插件还不错，可以送作者一杯咖啡，给作者动力去开发更好更有意思的东西。

[为爱发电，交个朋友](https://afdian.net/album/846832aca96311eeb20c5254001e7c00)

[Buy Me a Coffee. ko-fi.co.](https://ko-fi.com/levygu)

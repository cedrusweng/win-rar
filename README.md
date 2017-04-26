# node实现winRar压缩

## 安装

安装 [npm](https://npmjs.org/package/win-rar).

```
npm install win-rar
```
## 注意：
- 此模块只能用于windows系统
- 自动检测系统中的winRar软件的安装目录

## 更新:
v 1.0.0
-  去掉把对应目录添加到系统的环境变量
-  改为执行 rar 执行环境设置为系统中winRar的目录中

## 示例

### 异步方法
```js
var winRar = require('win-rar').aync;
var rar=new winRar({
   inDir:'F:\\csharp',
   outDir:'F:\\csharp',
   name:'good.rar',
   cwd:'F:\\csharp',
   cmd:'a',
   ny:['-r0'],
   filter:function(name){return true}
});
rar.compress();
```
### 同步方法
```js
var winRar = require('win-rar').sync;
var rar=new winRar({
   inDir:'F:\\csharp',
   outDir:'F:\\csharp',
   name:'good.rar',
   cwd:'F:\\csharp',
   cmd:'a',
   ny:['-r0'],
   filter:function(name){return true}
});
rar.compress();  
```
### 参数
- inDir:需要压缩的文件目录
- outDir:输出目录
- name:输出的文件名及格式
- cwd:运行目录，一般与inDir相同
- cmd:winRar对应的命令名
- ny:winRar对应的开关
- filter:用于排除inDir目录下对应的目录或文件，参数name为目录名或文件名（包含格式），返回false为排除


## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ wengxuesong
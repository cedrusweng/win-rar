# node实现winRar压缩

## 安装

安装 [npm](https://npmjs.org/package/win-rar).

```
npm install --save-dev win-rar
```
## 注意：
- 此模块只能用于windows系统
- 自动检测系统中的winRar软件的安装目录
- 并尝试把对应目录添加到系统的环境变量

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

## winRar命令
```
用法: rar <命令> -<开关 1> -<开关 N> <压缩文件> <文件...> 
<@列表文件...> <解压路径\> 
<命令> 
a 添加文件到压缩文件 
c 添加压缩文件注释 
cf 添加文件注释 
ch 改变压缩文件参数 
cw 写入压缩文件注释到文件 
d 删除压缩文件中的文件 
e 解压压缩文件到当前目录 
f 刷新压缩文件中的文件 
i[参数]=<串> 在压缩文件中查找字符串 
k 锁定压缩文件 
l[t,b] 列出压缩文件[技术信息,简洁] 
m[f] 移动到压缩文件[仅对文件] 
p 打印文件到标准输出设备 
r 修复压缩文件 
rc 重建丢失的卷 
rn 重命名压缩文件 
rr[N] 添加数据恢复记录 
rv[N] 创建恢复卷 
s[名字|-] 转换压缩文件为自解压格式或转换回压缩文件 
t 测试压缩文件 
u 更新压缩文件中的文件 
v[t,b] 详细列出压缩文件[技术信息,简洁] 
x 用绝对路径解压文件 
<开关> 
- 停止扫描 
ac 压缩或解压后清除存档属性 
ad 添加压缩文件名到目标路径 
ag[格式] 使用当前日期生成压缩文件名 
ai 忽略文件属性 
ao 添加具有压缩属性的文件 
ap<格式> 添加路径到压缩文件中 
as 同步压缩文件内容 
av 添加用户身份校验(仅注册版本可用) 
av- 禁用用户身份校验 
c- 禁用注释显示 
cfg- 禁用读取配置 
cl 名称转换为小写 
cu 名称转换为大写 
df 压缩后删除文件 
dh 打开共享文件 
dr 删除文件到回收站 
ds 对固实压缩文件禁用名称排序 
dw 档案处理后清除文件 
e[+]<属性> 设置文件排除和包括属性 
ed 不添加空目录 
en 不添加"压缩文件结束"标志 
ep 从名称中排除路径 
ep1 从名称中排除基本目录 
ep2 展开为完整路径 
ep3 扩展路径为包含盘符的完全路径 
f 刷新文件 
hp[密码] 同时加密文件数据和文件头 
id[c,d,p,q] 禁用消息 
ieml[属性] 用 E-mail 发送压缩文件 
ierr 发送所有消息到标准错误设备 
ilog[名称] 把错误写到日志文件(只有注册版本可用) 
inul 禁用所有消息 
ioff 完成一个操作后关闭 PC 电源 
isnd 启用声音 
k 锁定压缩文件 
kb 保留损坏的已解压文件 
m<0..5> 设置压缩级别(0-存储...3-默认...5-最大) 
mc<参数> 设置高级压缩参数 
md<大小> 以KB为单位的字典大小(64,128,256,512,1024,2048,4096 or A-G) 
ms[ext;ext] 指定存储的文件类型 
mt<线程> 设置线程数 
n<文件> 仅包含指定的文件 
n@ 从标准输入设备读取文件名到包括 
n@<列表> 包含在指定的列表文件中列出的文件 
o[+|-] 设置覆盖模式 
oc 设置 NTFS 压缩属性 
or 自动重命名文件 
os 保存 NTFS 流 
ow 保存或恢复文件所有者和组 
p[密码] 设置密码 
p- 不询问密码 
r 递归子目录 
r- 禁用递归 
r0 仅递归通配符名称的子目录 
ri<P>[:<S>] 设置优先级(0-默认,1-最小..15-最大)和以毫秒为单位的休眠时间 
rr[N] 添加数据恢复记录 
rv[N] 创建恢复卷 
s[<N>,v[-],e] 创建固实压缩文件 
s- 禁用固实压缩文件 
sc<chr>[obj] 指定字符集 
sfx[名称] 创建自解压压缩文件 
st[名称] 从标准输入设备读取数据(stdin) 
sl<大小> 处理小于指定大小的文件 
sm<大小> 处理超过指定大小的文件 
t 压缩后测试文件 
ta<日期> 添加日期 <日期> 后修改的文件,日期格式 YYYYMMDDHHMMSS 
tb<日期> 添加日期 <日期> 前修改的文件,日期格式 YYYYMMDDHHMMSS 
tk 保留原始压缩文件时间 
tl 设置压缩文件时间为最新文件时间 
tn<时间> 添加 <时间> 以后的文件 
to<时间> 添加 <时间> 以前的文件 
ts<m,c,a>[N] 保存或恢复文件时间(修改,创建,访问) 
u 更新文件 
v 自动检测创建卷的大小或者列出所有的卷 
v<大小>[k,b] 创建卷大小=<大小>*1000 [*1024, *1] 
vd 创建容量前清除磁盘内容 
ver[n] 文件版本控制 
vn 使用旧风格的卷命名方案 
vp 每卷之前暂停 
w<路径> 指定工作目录 
x<文件> 排除指定的文件 
x@ 从标准输入设备读取要排除的文件名 
x@<列表> 排除在指定的列表文件中列出的文件 
y 假设对全部询问都回答是 
z[文件] 从文件读取压缩文件注释 
```

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ wengxuesong
'use strict';
var fs=require('fs');
var cp=require('child_process');
var path=require('path');
var extend=require('extend');


var RAR_INFO={};
function getRarPath(){
  var that=this;
  var winRARVal=cp.execSync("reg query HKEY_CLASSES_ROOT\\WinRAR\\shell\\open\\command /ve",{encoding:'utf-8'});
  return winRARVal.match(/\"([^\"]+)\"/)[1];
}

function setWinEnvironmentVar(){
  var rarExePath=getRarPath();
  var rarPath=path.dirname(rarExePath);
  RAR_INFO={
    exe:rarExePath,
    path:rarPath
  }
  if(!rarPath)return;
  var pathRE=/<system>[^\\]\s(.*)/igm;
  var envPathStr=cp.execSync('wmic ENVIRONMENT where "name=\'path\' and username=\'<system>\'"',{encoding:'utf-8'});
  var envPathArr=pathRE.exec(envPathStr);
  var pathVal=envPathArr&&envPathArr[1];
  if(!pathVal){
    console.log('未找到系统的环境变量path');
    return;
  }
  if(pathVal.indexOf(pathVal)>-1){
    console.log("已经包含设置的环境变量不进行添加！");
    RAR_INFO.exe='rar';
    return;
  } 
  var cmdstr="wmic ENVIRONMENT where \"name='path' and username='<system>'\" set VariableValue=\""+(pathVal+";"+rarPath)+"\"";
  try{
    cp.execSync(cmdstr,{encoding:'utf-8'});
    console.log("成功添加永久环境变量path："+rarPath);
    RAR_INFO.exe='rar';
  }catch(ex){
    console.log(ex);
  } 
}
function dirListTostring(files,filter){
  var str='';
  filter=filter||function(){return true};
  files.forEach(function(o,i){
    var isOk=filter(o);
    if(isOk){
      str+=o+" ";
    }         
  });
  return str;
}
function getDir(pDir){
  var res=[];
  if(fs.existsSync(pDir)){
    res=fs.readdirSync(pDir); 
  }
  return res;
}




var defaultOpts={
   inDir:'./',
   outDir:'./',
   name:'default.rar',
   cwd:'./',
   cmd:'a',
   ny:['-r0'],
   filter:function(){return true}
}

function Rar(opts){
    this.options=extend({},defaultOpts,opts);
    this.init();
};

Rar.prototype={
  init:function(){
     var opts=this.options;     
     setWinEnvironmentVar();
     this.rarCmd=this.getCmdStr(opts);
     console.log(this.rarCmd);

  },
  run:function(opts){
     var opts=extend({},{encoding:'binary'},opts)
     cp.execSync(opts.cmd,{cwd:opts.cwd,encoding:opts.encoding});
     console.log('创建成功！'); 
  },
  //对外接口
  compress:function(){
    var opts=this.options;
    this.run({cmd:this.rarCmd,cwd:opts.cwd})
  },  
  //获取压缩命令的字符串拼接
  getCmdStr:function(opts){
    if(!fs.existsSync(opts.inDir))return;
    if(!fs.existsSync(opts.outDir)){
       fs.mkdirSync(opts.outDir);
    }
    var cmdStr;
    var nys=opts.ny.join(' ');
    var inDir=opts.inDir;
    var files=dirListTostring(getDir(inDir),opts.filter);
    var out=path.normalize(opts.outDir+'/'+opts.name);//输出
    cmdStr='"'+RAR_INFO.exe+'" '+opts.cmd+' '+nys+' '+out+' '+files+'';
    return  cmdStr;
  },
  test:function(){
     var s=this.compress();
  }
};


module.exports=Rar;
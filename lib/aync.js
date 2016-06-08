'use strict';
var fs=require('fs');
var cp=require('child_process');
var path=require('path');
var extend=require('extend');

function getRarPath(callFn){
  var that=this;
  cp.exec("reg query HKEY_CLASSES_ROOT\\WinRAR\\shell\\open\\command /ve", function(e, stdout, stderr) {
    if(!e){
        var str = stdout.match(/\"([^\"]+)\"/)[1];
        if(str){
          callFn&&callFn.call(that,{exe:str,path:path.dirname(str)});
        }else{
          console.log('没有找到winRar程序，无法完成压缩功能！');
        }
    }
  });
}

function setWinEnvironmentVar(fn){
  console.log('查看环境变量...');
  getRarPath(function(val){     
     if(!val){return;}
     val.path=val.path+'\\';
     cp.exec('wmic ENVIRONMENT where "name=\'path\' and username=\'<system>\'"', function(e, stdout, stderr) {
        if(!e){
          var pathStr=new String(stdout);
          var pathRE=/<system>[^\\]\s(.*)/igm;
          var pathValArr=pathRE.exec(pathStr);
          var pathVal=pathValArr&&pathValArr[1];
          if(!pathVal){
            console.log('未找到系统的环境变量path');
            return;
          }
          if(pathVal.indexOf(val.path)>-1){
            fn&&fn('rar');
            return;
          }    
          var cmdstr="wmic ENVIRONMENT where \"name='path' and username='<system>'\" set VariableValue=\""+(pathVal+";"+val.path)+"\"";
          cp.exec(cmdstr, function(e, stdout, stderr) {
            if(!e){
               console.log("成功添加永久环境变量path："+val.path);
               fn&&fn('rar');
            }else{
               fn&&fn(val.exe);
            }
          })   
        }else{
          console.log('请手动设置环境变量！');
        }
    });
  });  
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
     
  },
  run:function(opts){
     var runOpts=extend({},{encoding:'binary'},opts);
     var opts=this.options;
     console.log('执行中...');
     setWinEnvironmentVar((function(cstr){
         var os=extend({},opts,{cstr:cstr});
         var cmdStr=this.getCmdStr(os);
         cp.exec(cmdStr,{cwd:runOpts.cwd,encoding:runOpts.encoding},function(e,stdout,stderr){
           if(!e){
              console.log('创建成功！');
           }
        });
     }).bind(this));
     
  },
  //对外接口
  compress:function(){
    //通过切换不同的，工作环境，
    //对文件进行压缩，要压缩的文件使用相对路径表示
    console.log('开始压缩...');
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
    cmdStr='"'+opts.cstr+'" '+opts.cmd+' '+nys+' '+out+' '+files+'';  
    return  cmdStr;
  }
};


module.exports=Rar;
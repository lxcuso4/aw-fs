### aw-fs

> 原生 fs 模块的异步函数使用的是 callback 的方式，多次使用时会用 callback hell 的问题，
对应的同步函数会阻塞进程，为了使用性能更好的异步方法，同时使用同步的编码风格， 请使用 aw-fs
  
  aw-fs 是对 fs 模块异步函数的 （async await） 封装，同时保留 fs 模块的其它方法
 
 +  包装fs 异步方法返回一个 promise 实例
 +  保留其它 fs 方法
 +  两种 Promise 返回模式,mode 是指定异步包装的fs promise 如何返回
   
 >  默认的模式是当error 的时候 reject(error),成功的时候 resolve(除过error 外的参数)
    当 mode 为2的时候不论是否发生错误都会执行成功的回调（resolve）这在需要流式处理错误时非常有用，下面有详细的 demo
 
#### 开始 

1.  mode1（default）
```
const Fs = require('aw-fs');
var fs = new Fs();

//fs.readFile返回一个 promise 实例
fs.readFile('filePath').then(
 (data)=>{},
 (err)=>{})

//在 async 函数中使用
async function test() {
  var mode1 = path.join(dir,'mode1');
  var dir = await fs.access(mode1, fs.constants.W_OK);
  if(!dir){
    await fs.writeFile(path.join(aa,'async.json'),JSON.stringify({test:'mode1'}))
  }
}
test().then(a=>log('success',a), b=>{
  //如果mode1文件夹不存在，错误再此抛出
  log('Throw a global error，async method stop',b)
});

```
  
2. mode2
> 通过在实例化的时候传入配置项，启用 mode2
```
//为 access、readFile 启用 mode2 模式，通过在 new 得时候传入参数数组覆盖默认配置
//
var fs = new Fs([{name:'access',mode:2},{name:'readFile',mode:2}]);

//fs.readFile返回一个 promise 实例,不论readfile 是否成功调用成功回调
fs.readFile('filePath').then(
 (err,...)=>{})
 
// 下面的函数在 mode2 下非常有用
async function test2() {
  var mode2 = path.join(dir,'mode2');
  var error = await fs2.access(mode2, fs.constants.W_OK);
  //mode2 下 accss 函数的error 不会抛出，使得可以再业务函数中流式处理
  if(error){
    await fs2.mkdir(mode2);
  }
  await fs2.writeFile(path.join(mode2,'async.json'),JSON.stringify({test:'mode2'}))
}
test2().then(a=>log('success',a), b=>log('fs2.access not thrown error',b));

```
  
默认封装的 fs 方法列表
  ```
  'aaccess', 'appendFile', 'chmod', 'chown', 'close', 'copyFile', 'fchmod', 
  'fchown', 'fdatasync', 'fstat', 'fsync', 'ftruncate', 'futimes', 'lchmod', 
  'lchown', 'link', 'lstat', 'mkdir', 'mkdtemp', 'open', 'read', 'readdir', 
  'readFile', 'readlink', 'realpath', 'rename', 'rmdir', 'stat', 'symlink', 
  'truncate', 'unlink', 'utimes', 'write', 'writeFile',
  
  ```
  


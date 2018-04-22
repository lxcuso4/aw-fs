/**
 * Created by liux on 2018/4/17.
 */
const path = require('path');
const Fs = require('../index');

var fs = new Fs();
var fs2 = new Fs([{name:'access',mode:2}]);


// var fs = require('fs');

var log = console.log;

var dir = path.resolve(__dirname);
var file = path.resolve(dir,'./a.json')

// This is mode1(default), Fs all asynchronous method errors are thrown.
async function test() {
  var mode1 = path.join(dir,'mode1');
  await fs.access(mode1, fs.constants.W_OK);
  await fs.writeFile(path.join(aa,'async.json'),JSON.stringify({test:'mode1'}))

}
test().then(a=>log('success',a), b=>{
  log('Throw a global error，async method stop',b)
});


// This is mode2, Error will not be thrown.
async function test2() {
  var mode2 = path.join(dir,'mode2');
  var error = await fs2.access(mode2, fs.constants.W_OK);
  if(error){
    await fs2.mkdir(mode2);
  }
  await fs2.writeFile(path.join(mode2,'async.json'),JSON.stringify({test:'mode2'}))
}
test2().then(a=>log('success',a), b=>log('fs2.access not thrown error',b));

// This is real fs methods test.
async function test3() {
  var real = path.join(dir,'real');
  if(!fs.existsSync(real)){
    await fs.mkdir(real);
  }
  var file = path.join(real,'real-fs-method.json')
  fs.writeFileSync(file,JSON.stringify({test:'real methods'}))
}
test3().catch(error=>log('real methods',error))
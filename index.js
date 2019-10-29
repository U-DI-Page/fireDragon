const { exec } = require('child_process')
const iconv = require('iconv-lite')
const fs = require('fs')

const fileData = fs.readFileSync('./cubizhiyu.txt', 'utf8')
                   .replace(/\r/g, '')
                   .split('\n')
                   .filter(i => !!i)
const cache = []
const single = {
  1: '.',
  2: '..',
  3: '...'
}

new Promise(resolve => {
  let tag = 1
  console.log(`准备战斗,共收录${fileData.length}条问候语`)
  const waitStart = setInterval(() => {
    tag += 1
    if(tag === 5){
      console.log('start!!!')
      clearInterval(waitStart)
      resolve()
    }else{
      console.log(`${5 - tag}${single[5 - tag]}`)
    }
  }, 1000)
}).then(() => {
  setInterval(() => {
    let randomIndex = makeRandomIndex()
    const text = fileData[randomIndex]
    exec('clip').stdin.end(iconv.encode(text, 'gbk'))
    console.log(new Date().Format("yyyy-MM-dd mm:ss"), text)
  }, 500)
})

function makeRandomIndex(){
  const randomIndex = Math.floor(fileData.length * Math.random())

  /** 排除一样的 */
  if(cache[cache.length-1] === randomIndex){
    return makeRandomIndex()
  }

  cache.push(randomIndex)
  return randomIndex
}

Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
  return fmt
}
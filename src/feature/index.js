/**
 * 千分位过滤器
 * @param {string|number} val - 要过滤的数字
 * @return {String} 
 */
export const split = (val) => {
  if (isNaN(val)) {
    return '--'
  }
  let pattern = /(?=((?!\b)\d{3})+$)/g
  let o = Number(val)
    .toString()
    .split('.')
  let z = o[0].replace(pattern, ', ')
  let l = o[1]
  return l ? `${z}.${l}` : `${z}`
}

/**
 * 比例过滤器，将数字转换成百分比
 * @param {Number} val - 待转换数字
 * @param {Boolean} type - 为true将在倒数第二位添加小数点
 * @return {String}
 */
export const rate = (val, type) => {
  return isNaN(val) ? '--' : type ? `${val.slice(0,-2)+'.'+val.slice(-2)}%` : `${Number(val).toFixed(2)}%`
}

/**
 * 货币过滤器，将数字转换成中文货币样式
 * @param {Number} val - 待转换数字
 * @param {Boolean} type - 1为只带千分位分隔符 2为只带￥  默认,.￥全带
 * @return {String} - 
 */
export const money = (val, type) => {
  if (isNaN(val)) {
    return '--'
  }
  let pattern = /(?=((?!\b)\d{3})+$)/g
  let o
  let z
  o = Number(val)
    .toFixed(2)
    .toString()
    .split('.')
  z = o[0].replace(pattern, ',')
  return type === 1 ? `￥${z}` : type === 2 ? `￥${val}` : `￥${z}.${o[1]}`
}

/**
 * 平均数
 * @param {Number} nums - 要判断的多个数
 * @return {Number}
 */
export const average = (...nums) => nums.reduce((acc, val) => arr + val, 0) / nums.length

/**
 * 去除数组中的无效/无用值
 * @param {Array} arr 
 * @return {Array}
 */
export const compact = arr => arr.filter(Boolean)

/**
 * 返回两个数组的交集
 * @param {Array} a
 * @param {Array} b
 * @return {Array}
 */
export const intersection = (a, b) => {
  const s = new Set(b)
  return a.filter(x => s.has(x))
}

/**
 * 生成指定范围指定长度的随机数组
 * @param {Number} min - min-value
 * @param {Number} max - max-value
 * @param {Number} n - 数量
 * @return {Array}
 */
export const randIntArr = (min, max, n = 1) => Array.from({
    length: n
  },
  () => Math.floor(Math.random() * (max - min + 1)) + min)

/**
 * 从指定数组中随机获取元素
 * @param {Array}  arr
 * @return {Number} 
 */
export const sample = arr => arr[Math.floor(Math.random() * arr.length)]

/**
 * 在指定数组中取出指定长度的随机数组
 * @param {Array} arr 
 * @param {Number} n
 * @return {Array}
 */
export const sampleSize = ([...arr], n = 1) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr.slice(0, n)
}

/**
 * 指定父子id生成父子嵌套结构
 * @example
 * const arr = [
 * {id:1,parent_id:0},
 * {id:2,parent_id:1},
 * {id:3,parent_id:2}
 * ]
 * nest(arr,0,'id','pid') => [{id:1,parent_id:0,children:[{id:2,parent_id:1,children:[{id:3,parent_id:2}]}]}]
 * 
 * @param {Array} arr - 数组
 * @param {Number} start_id - 起始id
 * @param {String} sid - 子id
 * @param {String} pid - 父id
 * @return {Array}
 * 
 */
export const nest = (arr, start_id, sid, pid) =>
  arr
  .filter(item => item[pid] === start_id)
  .map(item => Object.assign({}, item, {
    children: nest(arr, item[sid], sid, pid)
  }))

/**
 * 验证该值的类型 
 * @param {*} v1 - 要判断的值
 * @param {*} type
 * @return {Boolean} 
 * 
 * @example
 * this.$f('is','1',String)
 */
export const is = (v1, type) => v1.constructor === type

/**
 * 计算函数的执行时间
 * @param {function():string} callback - 要判断的函数
 * @return {*} 
 */
export const timeTaken = callback => {
  console.time('timeTaken')
  const r = callback();
  console.timeEnd('timeTaken')
  return r
}

/**
 * 每个单词首字母小写
 * @param {String} str - 要过滤的字符串 
 * @return {String}
 */
export const decapitalize = ([first, ...rest]) => first.toLowerCase() + rest.join('')

/**
 * 字符串首字母大写
 * @param {String} val - 要过滤的字符串
 * @param {Boolean} type - true的话会让剩余字母也成小写
 * @return {String}
 * 
 * @example
 * capitalize('fooBar',[true])
 */
export const capitalize = ([first, ...rest], type) => first.toUpperCase() + (type ? rest.join('').toLowerCase() : rest.join(''))

/**
 * 每个单词首字母大写
 * @param {String} str - 要过滤的字符串
 * @param {Boolean} type - true 则 'fooBar ass' => 'Foobar Ass'
 * @return {String} 
 */
export const caplitalizeAll = (str, type) => {
  let s = str.replace(/\b[a-z]/g, char => char.toUpperCase())
  return type ? s.replace(/\B[a-z]/gi, char => char.toLowerCase()) : s
}

/**
 * 银行卡号校验 Luhn算法
 * @param {Number} num - 要校验的数字
 */
export const luhnCheck = num => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0]
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0)
  sum += lastDigit
  return sum % 10 === 0
}

/**
 * 获得当前日期天数
 * @param {Date} date - new Date()
 * @return {Number}
 * 
 * @example
 * this.$f('dayofYear', new Date())
 * {{ val | dayofYear(new Date)}}
 */
export const dayofYear = date => Math.floor(((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24))

/**
 * 返回当前时间的时分秒（24小时制）
 * @param {Date} date - new Date() 
 * @return {String}
 * 
 * @example
 * this.$f('getCurrentHour', new Date())
 * {{ val | getCurrentHour(new Date)}}
 */
export const getCurrentHour = date => date.toTimeString().slice(0, 8)

/**
 * 返回两个日期间的天数
 * @param {date} v1 - new Date('2019-10-14')
 * @param {date} v2 - new Date('2020-11-12')
 * @return {Number}
 */
export const getDateBetween = (v1, v2) => (v1 - v2) / (1000 * 3600 * 24)

/**
 * 深度判断两个变量是否全等
 *@param {*} a - 待判断变量
 *@param {*} b - 待判断变量
 *@return {Boolean}
 */
export const equals = (a, b) => {
  if (a === b) return true
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b
  if (a.prototype !== b.prototype) return false
  let keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false
  if (keys.length === 0) return Object.keys(b).length === 0 && a.constructor.name === b.constructor.name
  return keys.every(k => equals(a[k], b[k]))
}

/**
 * 返回值或变量的类型名
 * @param {*} v
 * @return {String}
 */
export const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase()

/**
 * 生成指定范围的随机整数
 * @param {Number} min - 最小数
 * @param {Number} max - 最大数
 * @return {Number}
 */
export const ranNumRange = (min, max) => Math.floor(Math.random() * (max - min) + min)

/**
 * 四舍五入指定的小数位数
 * @param {Number} n - 带有小数的数字
 * @param {Number} [decimals=0] - 指定的小数位数
 * @return {Number}
 */
export const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)

/**
 * 计算任意两点之间的距离
 * @param {Number} x0 - 起始点的x轴的数值
 * @param {Number} y0 - 起始点的y轴的数值
 * @param {Number} x1 - 结束点的x轴的数值
 * @param {Number} y1 - 结束点的y轴的数值
 * @return {Number}
 */
export const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)

/**
 * 检查是否在浏览器环境
 * @return {Boolean}
 */
export const isBrowser = () => ![typeof window, typeof document].includes('undefined')

/**
 * 给回到顶部功能一个减缓效果
 * @param {Number} [v1=30] - 速度控制,越小速度越快（回滚每段距离的时间）
 * @param {Number} [v2=6] - 速度控制,越大速度越快（每段时间回滚的距离）
 * @param {Number} [scrollElement=document.documentElement || document.body] - 要操作的元素
 */
export const retard = (v1 = 30, v2 = 6, scrollElement) => {
  let goTopTimer = setInterval(() => {
    var scrollTop = scrollElement.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
    var speed = Math.floor(-scrollTop / v2);
    if (scrollElement) {
      scrollElement.scrollTop = scrollTop + speed;
    } else {
      document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed;
    }
    if (scrollTop == 0) {
      clearInterval(goTopTimer)
    }
  }, v1)
}

/**
 * 检测移动/PC设备
 * @return {String} ['Mobile','Desktop']
 */
export const detectDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
  'Mobile' :
  'Desktop'

/**
 * 获取不同类型变量的长度
 * @param {*} val - 带测量的变量
 * @return {Number}
 */
export const size = val =>
  Array.isArray(val) ?
  val.length :
  val && typeof val === 'object' ?
  val.size || val.length || Object.keys(val).length :
  typeof val === 'string' ?
  new Blob([val]).size :
  0;

/**
 * HTML转义，预防XSS攻击
 * @param {String} str - 需转义的html字符串
 * @return {String}
 */
export const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    } [tag] || tag)
  )

/**
 * 数字转换为中文大写
 * @param {Number} val - 整数部分支持76位数，小数部分转换人民币大写支持4位数，不支持的返回*
 * @param {String} type - 'money' 转化成人民币大写
 * @return {String}
 */
export const digitUppercase = (val, type) => {
  if (val != 0 && isNaN(val) || val === null || val === '') return
  let samplePlate = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unit = ['', '拾', '佰', '仟', '万']
  let units = ['', '万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数']
  let moneyUnit = ['角', '分', '厘', '毫']
  let all = (val.trim() + '').replace(/^0*/, '').split('.')
  let integer = all[0].replace(/(?=((?!\b)\d{4})+$)/g, ',')
  let integerArr = integer.split(',') // [123,4567,8910]
  integerArr.forEach((current, i, array) => {
    array[i] = current.split('').reverse().map((curr, j, arr) => {
      arr[j] = samplePlate[curr]
      if (arr[j] !== '零') arr[j] += unit[j]
      return arr[j]
    }).reverse().join('')
    let reg = /零*$/g
    array[i] = array[i].replace(reg, '')
    let reg1 = /零+/g
    array[i] = array[i].replace(reg1, '零')
    array[i] = array[i] + (units[array.length - 1 - i] === undefined ? '*' : units[array.length - 1 - i])
  })
  let decimals = all[1] ? all[1].split('').map((ite, i, arr) => {
    arr[i] = samplePlate[ite] + (type === 'money' ? moneyUnit[i] || '*' : '')
    return arr[i]
  }).join('') : ''
  return integerArr.join('') + (type === 'money' ? '元' : '') + (type === 'money' ? (decimals || '整') : decimals ? '点' + decimals : '')
}

/**
 * 用来格式化日期,需要引入moment库,npm i moment
 * @param {string|number} val - 要格式化的时间
 * @see http://momentjs.cn/
 * @param {String} type - 要转变成的格式
 * @return {String}
 */
export const moment = (val, type) => {
  return val ? (type ? moment(val).format(type) : moment(val).format()) : '--'
}

/**
 * 时间插件增加去年和今年
 * @return {Object}
 */
export const putYear = (type) => {
  let mDate, data
  type === 1 ?
    (data = [
      moment()
      .subtract(1, 'years')
      .startOf('years'),
      moment()
      .subtract(1, 'years')
      .endOf('years')
    ]) :
    (data = [moment().startOf('years'), moment().endOf('years')])
  mDate = {
    text: type === 1 ? '去年' : '今年',
    onClick(picker) {
      picker.$emit('pick', data)
    }
  }
  return mDate
}

/**
 * 时间插件增加最后上个月和這個月
 * @return {Object}
 */
export const putMonth = (type) => {
  let mDate, data
  type === 1 ?
    (data = [
      moment()
      .subtract(1, 'month')
      .startOf('month'),
      moment()
      .subtract(1, 'month')
      .endOf('month')
    ]) :
    (data = [moment().startOf('month'), moment().endOf('month')])
  mDate = {
    text: type === 1 ? '上个月' : '本月',
    onClick(picker) {
      picker.$emit('pick', data)
    }
  }
  return mDate
}
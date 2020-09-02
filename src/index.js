import * as ft from './feature/index.js'

function validate(arr) {
  return arr.every((ite) => {
    return typeof ite === 'string' && ite && !/^\d+$/.test((ite + '').trim()) && ft[ite]
  })
}

function process(f) {
  let Arg = Array.from([...arguments]).slice(1)
  let arr = f.split(',').reverse()
  let stat = validate(arr)
  if (!stat) return '**'

  function recursion(n) {
    let arg = Array.from([...arguments]).slice(1)
    let vv = ft[arr[n]](...arg)
    if (n < 1) return vv
    return recursion(n - 1, vv);
  }
  return recursion(arr.length - 1, ...Arg)
}

var VUE = {
  install: (Vue) => {
    Vue.prototype.$f = process

    Object.keys(ft).forEach((ite) => {
      Vue.filter(ite, ft[ite])
    })

    /**
     * 时间格式化
     * @return {String}
     */
    Vue.prototype.formatDate = function (shijianchuo, month) {
        let time = new Date(shijianchuo)
        let y = time.getFullYear()
        let m = time.getMonth() + 1
        let d = time.getDate()
        if (month) {
          return y + '-' + (m < 10 ? '0' + m : m)
        } else {
          return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
        }
      },

      Vue.prototype.putMonth = function (type) {
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

  }
};

if (Vue) {
  ! function (Vue) {
    Vue.use(VUE)
  }(Vue);
}
window.$f = process
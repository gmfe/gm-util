import pinyin from './pinyin.js'
import _ from 'lodash'

// 字符串匹配，中文首字母拼音匹配，字母小写匹配
const searchFilter = (list, filterText, what, {isSort = false} = {}) => {
  if (!filterText) {
    return list || []
  }
  what = what || (v => v)
  filterText = filterText.toLowerCase()
  let filterList = []
  let matchList = []
  let normalList = []
  let firstLetterList = []
  let strMatchList = []
  let firstLetterMatchList = []
  _.forEach(list, v => {
    let w = what(v)
    if (!_.isString(w)) {
      w = ''
    }
    w = w.toLowerCase()
    const isMatch = w.indexOf(filterText) > -1 // 是否全匹配
    if (isMatch) {
      matchList.push(v)
      filterList.push(v)
      return
    }
    // 全拼集合
    const normal = _.map(pinyin(w), value => value[0]).join('')
    const isNormalMatch = normal.indexOf(filterText) > -1 // 是否全拼匹配

    if (isNormalMatch) {
      normalList.push(v)
      filterList.push(v)
      return
    }
    // 首字母集合
    const firstLetter = _.map(pinyin(w, 'first_letter'), value => value[0]).join('')
    const isFirstLetterMatch = firstLetter.indexOf(filterText) > -1 // 是否首拼匹配
    if (isFirstLetterMatch) {
      firstLetterList.push(v)
      filterList.push(v)
      return
    }

    // w包含搜索内容 模糊搜索
    const isFuzzyMatch = _.every(filterText, text => {
      return w.indexOf(text) > -1
    })
    if (isFuzzyMatch) {
      strMatchList.push(v)
      filterList.push(v)
      return
    }

    // 首字母包含搜索内容 模糊搜索
    const isFirstLetterFuzzyMatch = _.every(filterText, text => {
      return firstLetter.indexOf(text) > -1
    })
    if (isFirstLetterFuzzyMatch) {
      firstLetterMatchList.push(v)
      filterList.push(v)
    }
  })
  return isSort ? _.concat(matchList, normalList, firstLetterList, strMatchList, firstLetterMatchList) : filterList
}

export default searchFilter

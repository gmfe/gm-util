import Request from './Request'
import RequestInterceptor from './RequestInterceptor'
import param from './param'
import format from './format'
import isElementInViewport from './isElementInViewport'
import isElementOverViewport from './isElementOverViewport'
import is from './is'
import contains from './contains'
import createChainedFunction from './createChainedFunction'
import getElementPosition from './getElementPosition'
import processReactRouterProps from './processReactRouterProps'
import processHistory from './processHistory'
import Bundle from './bundle'
import keyMirror from './keyMirror'
import injectStore from './injectStore'
import groupByWithIndex from './groupByWithIndex'
import sortByWithIndex from './sortByWithIndex'
import timeSync from './timeSync'
import getAllPriceWithAmount from './getAllPriceWithAmount'
import EventEmitter from './eventemitter'
import pinyin from './pinyin'
import UUID from './uuid'
import pinYinFilter from './pinyinFilter'
import searchFilter from './searchFilter'
import md5 from './md5'
import configHeaders from './configHeaders'
import getCharLength from './getCharLength'
import isPathMatch from './isPathMatch'
import setTitle from './setTitle'
import setIco from './setIco'
import getScrollTop from './getScrollTop'
import getScrollLeft from './getScrollLeft'
import loadScript from './loadScript'
import importComponent from './importComponent'
import to from './to'
import { getLocale, setLocale } from './locale'

export {
  /* will deprecated */
  Bundle, importComponent,
  injectStore,
  keyMirror,
  format, param,
  timeSync,
  getAllPriceWithAmount,
  configHeaders,
  /* will deprecated */

  Request,
  RequestInterceptor,

  processReactRouterProps,
  processHistory,

  contains,
  isElementInViewport,
  isElementOverViewport,
  getElementPosition,

  isPathMatch,
  setTitle, setIco,
  getScrollTop,
  getScrollLeft,
  loadScript,
  is,

  EventEmitter,
  createChainedFunction,

  groupByWithIndex, sortByWithIndex,

  pinyin, pinYinFilter, searchFilter,

  UUID,
  md5,
  getCharLength,

  to,

  getLocale,
  setLocale
}

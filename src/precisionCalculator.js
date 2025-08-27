// @ts-nocheck
// 引入 big.js 库
import Big from "big.js";

/**
 * 舍入规则
 * @property ROUND_UP 向上取整
 * @property ROUND_DOWN 向下取整
 * @property ROUND_HALF_UP 四舍五入
 * @property ROUND_HALF_EVEN 五舍六入 (Banker's Rounding)
 */
const ROUNDING_MODES = {
  /**
   * 向上取整
   */
  ROUND_UP: 0, // 向上取整 (Away from zero)
  /**
   * 五舍六入 (Banker's Rounding)
   */
  ROUND_DOWN: 1, // 向下取整 (Towards zero)
  /**
   * 四舍五入
   */
  ROUND_HALF_UP: 2, // 四舍五入
  /**
   * 五舍六入 (Banker's Rounding)
   */
  ROUND_HALF_EVEN: 3, // 四舍六入五成双 (Banker's Rounding)
};

/**
 * 计算模式
 * @property CALC_THEN_ROUND 先计算再舍入
 * @property ROUND_THEN_CALC 先舍入再计算
 * */
const CALCULATION_MODES = {
  /**
   * 先计算再舍入
   */
  CALC_THEN_ROUND: "calc_then_round",
  /**
   * 先舍入再计算
   */
  ROUND_THEN_CALC: "round_then_calc",
};

/**
 * 默认配置
 */
const DEFAULT_CONFIG = {
  precision: 2, // 默认小数位数
  roundingMode: ROUNDING_MODES.ROUND_HALF_UP, // 默认舍入规则
  calculationMode: CALCULATION_MODES.CALC_THEN_ROUND, // 默认计算模式
};

/**
 * ProjectDataCalculator 类用于高精度数值计算，支持多种舍入模式和计算模式。
 * 使用 Big.js 库进行高精度运算，并提供链式调用接口。
 * @method add() 加
 * @method sub() 减
 * @method times() 乘
 * @method div() 除
 */
class ProjectDataCalculator {
  /**
   * 构造函数，初始化 ProjectDataCalculator 实例
   * @param {number|string|Big} value - 初始数值
   * @param {Object} config - 配置对象，用于覆盖默认配置
   */
  constructor(value, config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.value = new Big(value);
  }

  /**
   * 获取当前配置的副本
   * @returns {Object} 当前配置的副本
   */
  getConfig() {
    return { ...this.config };
  }

  /**
   * 创建一个新实例，使用新的配置
   * @param {Object} newConfig - 新的配置对象
   * @returns {ProjectDataCalculator} 使用新配置的 ProjectDataCalculator 实例
   */
  config(newConfig) {
    const newInstance = new ProjectDataCalculator(this.value, {
      ...this.config,
      ...newConfig,
    });
    return newInstance;
  }

  /**
   * 根据配置对 Big 值进行舍入
   * @param {Big} bigValue - 需要舍入的 Big 值
   * @returns {Big} 舍入后的 Big 值
   */
  _round(bigValue) {
    return bigValue.round(this.config.precision, this.config.roundingMode);
  }

  /**
   * 获取舍入后的值
   * @returns {Big} 舍入后的 Big 值
   */
  getRoundedValue() {
    return this._round(this.value);
  }

  /**
   * 获取原始值
   * @returns {Big} 原始 Big 值
   */
  getOriginalValue() {
    return this.value;
  }

  /**
   * 执行加法运算
   * @param {number|Object} n - 要加上的数值，可以是数字或具有value属性的对象
   * @returns {ProjectDataCalculator} 返回一个新的ProjectDataCalculator实例，包含加法运算后的结果
   */
  plus(n) {
    let result;
    // 根据计算模式决定是先舍入再计算还是直接计算
    if (this.config.calculationMode === CALCULATION_MODES.ROUND_THEN_CALC) {
      const roundedThis = this.getRoundedValue();
      const roundedN = new ProjectDataCalculator(
        n,
        this.config
      ).getRoundedValue();
      result = roundedThis.plus(roundedN);
    } else {
      result = this.value.plus(n);
    }
    const newInstance = new ProjectDataCalculator(result, this.config);
    // 如果是先计算再舍入模式，则对结果进行舍入
    if (this.config.calculationMode === CALCULATION_MODES.CALC_THEN_ROUND) {
      newInstance.value = newInstance.getRoundedValue();
    }
    return newInstance;
  }

  /**
   * 执行加法运算
   * @param {number|Object} n - 要加上的数值，可以是数字或具有value属性的对象
   * @returns {ProjectDataCalculator} 返回一个新的ProjectDataCalculator实例，包含加法运算后的结果
   */
  add(n) {
    return this.plus(n);
  }

  /**
   * 执行减法运算
   * @param {number|Object} n - 要减去的数值，可以是数字或具有value属性的对象
   * @returns {ProjectDataCalculator} 返回一个新的ProjectDataCalculator实例，包含减法运算后的结果
   */
  minus(n) {
    let result;
    // 根据计算模式决定是先舍入再计算还是直接计算
    if (this.config.calculationMode === CALCULATION_MODES.ROUND_THEN_CALC) {
      const roundedThis = this.getRoundedValue();
      const roundedN = new ProjectDataCalculator(
        n,
        this.config
      ).getRoundedValue();
      result = roundedThis.minus(roundedN);
    } else {
      result = this.value.minus(n);
    }
    const newInstance = new ProjectDataCalculator(result, this.config);
    // 如果是先计算再舍入模式，则对结果进行舍入
    if (this.config.calculationMode === CALCULATION_MODES.CALC_THEN_ROUND) {
      newInstance.value = newInstance.getRoundedValue();
    }
    return newInstance;
  }

  /**
   * 执行减法运算
   * @param {number|Object} n - 要减去的数值，可以是数字或具有value属性的对象
   * @returns {ProjectDataCalculator} 返回一个新的ProjectDataCalculator实例，包含减法运算后的结果
   */
  sub(n) {
    return this.minus(n);
  }

  /**
   * 执行乘法运算
   * @param {number|Object} n - 要乘上的数值，可以是数字或具有value属性的对象
   * @returns {ProjectDataCalculator} 返回一个新的ProjectDataCalculator实例，包含乘法运算后的结果
   */
  times(n) {
    let result;
    // 根据计算模式决定是先舍入再计算还是直接计算
    if (this.config.calculationMode === CALCULATION_MODES.ROUND_THEN_CALC) {
      const roundedThis = this.getRoundedValue();
      const roundedN = new ProjectDataCalculator(
        n,
        this.config
      ).getRoundedValue();
      result = roundedThis.times(roundedN);
    } else {
      result = this.value.times(n);
    }
    const newInstance = new ProjectDataCalculator(result, this.config);
    // 如果是先计算再舍入模式，则对结果进行舍入
    if (this.config.calculationMode === CALCULATION_MODES.CALC_THEN_ROUND) {
      newInstance.value = newInstance.getRoundedValue();
    }
    return newInstance;
  }

  /**
   * 执行除法运算
   * @param {number|Object} n - 除数，可以是数字或具有value属性的对象
   * @returns {ProjectDataCalculator} 返回一个新的ProjectDataCalculator实例，包含除法运算后的结果
   */
  div(n) {
    let result;
    // 根据计算模式决定是先舍入再计算还是直接计算
    if (this.config.calculationMode === CALCULATION_MODES.ROUND_THEN_CALC) {
      const roundedThis = this.getRoundedValue();
      const roundedN = new ProjectDataCalculator(
        n,
        this.config
      ).getRoundedValue();
      result = roundedThis.div(roundedN);
    } else {
      result = this.value.div(n);
    }
    const newInstance = new ProjectDataCalculator(result, this.config);
    // 如果是先计算再舍入模式，则对结果进行舍入
    if (this.config.calculationMode === CALCULATION_MODES.CALC_THEN_ROUND) {
      newInstance.value = newInstance.getRoundedValue();
    }
    return newInstance;
  }

  /**
   * 执行幂运算
   * @param {number} exp - 指数
   * @returns {ProjectDataCalculator} 返回一个新的ProjectDataCalculator实例，包含幂运算后的结果
   */
  pow(exp) {
    const result = this.value.pow(exp);
    const newInstance = new ProjectDataCalculator(result, this.config);
    // 如果是先计算再舍入模式，则对结果进行舍入
    if (this.config.calculationMode === CALCULATION_MODES.CALC_THEN_ROUND) {
      newInstance.value = newInstance.getRoundedValue();
    }
    return newInstance;
  }

  /**
   * 设置新的值并返回新实例
   * @param {number|string|Big} newValue - 新的数值
   * @returns {ProjectDataCalculator} 包含新值的 ProjectDataCalculator 实例
   */
  setValue(newValue) {
    return new ProjectDataCalculator(newValue, this.config);
  }

  /**
   * 将舍入后的值转换为字符串
   * @returns {string} 舍入后的值的字符串表示
   */
  toString() {
    return this.getRoundedValue().toString();
  }

  /**
   * 将舍入后的值转换为数字
   * @returns {number} 舍入后的值的数字表示
   */
  toNumber() {
    return this.getRoundedValue().toNumber();
  }

  /**
   * 用于 JSON 序列化，返回舍入后的值的字符串表示
   * @returns {string} 舍入后的值的字符串表示
   */
  toJSON() {
    return this.toString();
  }
}

/**
 * @param {number|string|Big} value 初始值
 * @param {Object} config 配置对象
 * @returns {ProjectDataCalculator}
 */
function PDC(value, config) {
  // 如果 this 不是 PDC 的实例，说明是被直接调用的，此时模拟 new 的行为
  if (!(this instanceof PDC)) {
    return new PDC(value, config);
  }
  // 如果是通过 new 调用的，则正常初始化
  return new ProjectDataCalculator(value, config);
}

// 将枚举和默认配置挂载到工厂函数上，方便访问
PDC.ROUNDING_MODES = ROUNDING_MODES;
PDC.CALCULATION_MODES = CALCULATION_MODES;
PDC.DEFAULT_CONFIG = DEFAULT_CONFIG;

// 将工厂函数作为默认导出，枚举等作为具名导出
export default PDC;
export {
  ROUNDING_MODES,
  CALCULATION_MODES,
  DEFAULT_CONFIG,
  ProjectDataCalculator,
};

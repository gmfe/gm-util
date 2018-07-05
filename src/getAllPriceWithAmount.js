import Big from 'big.js'

export default function getAllPriceWithAmount (amount, saleRatio, salePrice, stdSalePrice) {
  console.warn('getAllPriceWithAmount is moved to gm-service.')

  const integerPart = Big(parseInt(+Big(amount).div(saleRatio), 10))
  const decimalPart = Big(amount).mod(saleRatio)

  // 整数倍读取销售价 剩下的用单价
  return +integerPart.times(salePrice).plus(decimalPart.times(stdSalePrice))
};

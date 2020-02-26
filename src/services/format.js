import Calculator from './calculator'
import { isUndefined } from './helpers'

const formatParser = /^(?:(\$|USD)?0(?:(,)0)?(\.)?(0+)?|0(?:(,)0)?(\.)?(0+)?\s?(dollar)?)$/
const calculator = Calculator()

const currencyModes = {
  USD: 'code',
  dollar: 'name',
  $: 'symbol'
}

export default function Format(format) {
  const filteredMatches = []
  let currencyDisplay
  let useGrouping = false
  let minFractionDigits = 0

  const matches = format.match(formatParser)
  if (matches != null) {
    for (let i = 1; i < matches.length; i++) {
      const match = matches[i]
      if (isUndefined(match)) {
        continue
      }

      filteredMatches.push(match)
      if (match === ',') {
        useGrouping = true
      } else if (match === '.') {
        minFractionDigits = matches[calculator.add(i, 1)].length
      } else if (
        currencyDisplay == null &&
        (match === 'USD' || match === 'dollar' || match === '$')
      ) {
        currencyDisplay = currencyModes[match]
      }
    }
  }

  return {
    /**
     * Returns the matches.
     * @ignore
     *
     * @return {Array}
     */
    getMatches() {
      return filteredMatches
    },
    /**
     * Returns the amount of fraction digits to display.
     * @ignore
     *
     * @return {Number}
     */
    getMinimumFractionDigits() {
      return minFractionDigits
    },
    /**
     * Returns the currency display mode.
     * @ignore
     *
     * @return {String}
     */
    getCurrencyDisplay() {
      return currencyDisplay
    },
    /**
     * Returns the formatting style.
     * @ignore
     *
     * @return {String}
     */
    getStyle() {
      return !isUndefined(this.getCurrencyDisplay()) ? 'currency' : 'decimal'
    },
    /**
     * Returns whether grouping should be used or not.
     * @ignore
     *
     * @return {Boolean}
     */
    getUseGrouping() {
      return useGrouping
    }
  }
}

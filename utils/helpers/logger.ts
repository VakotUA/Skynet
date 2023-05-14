import moment from 'moment'

function getTimestamp(): string {
  return moment(Date.now()).format('HH:mm:ss')
}

export const Color = {
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  FgGray: '\x1b[90m',
}

class Logger {
  // readonly history: string[] = []

  /**
   * Log to console with timestamp
   * @param {any} message
   */
  log(message: any) {
    const time = Color.FgWhite + '[' + getTimestamp() + '] '
    const data = Color.FgGray + message
    console.warn(time + data + Color.FgWhite)
  }
  /**
   * Warn to console with timestamp
   * @param {any} message
   */
  warn(message: any) {
    const time = Color.FgWhite + '[' + getTimestamp() + '] '
    const data = Color.FgYellow + message
    console.warn(time + data + Color.FgWhite)
  }
  /**
   * Error to console with timestamp
   * @param {any} message
   */
  error(message: any) {
    const time = Color.FgWhite + '[' + getTimestamp() + '] '
    const data = Color.FgRed + message
    console.error(time + data + Color.FgWhite)
  }
  /**
   * Info to console with timestamp
   * @param {any} message
   */
  info(message: any) {
    const time = Color.FgWhite + '[' + getTimestamp() + '] '
    const data = Color.FgWhite + message
    console.info(time + data + Color.FgWhite)
  }
  /**
   * Debug to console with timestamp
   * @param {any} message
   */
  debug(message: any) {
    const time = Color.FgWhite + '[' + getTimestamp() + '] '
    const data = Color.FgCyan + message
    console.debug(time + data + Color.FgWhite)
  }

  status = {
    /**
     * Print's `[   OK   ] - message` to console with status color
     * @param {any} message
     */
    ok(message: any) {
      this._print(message, 'OK', Color.FgGreen)
    },
    /**
     * Print's `[ FAILED ] - message` to console with status color and `error` message on next line
     * @param {any} message
     * @param {any} error (optional)
     */
    failed(message: any, error?: any) {
      this._print(message, 'FAILED', Color.FgRed)
      if (error) console.log(' '.repeat(12) + Color.FgRed + error + Color.FgWhite)
    },
    /**
     * Print's `[  WARN  ] - message` to console with status color and `warn` message on next line
     * @param {any} message
     * @param {any} warn (optional)
     */
    warn(message: any, warn?: any) {
      this._print(message, 'WARN', Color.FgYellow)
      if (warn) {
        const leadingSpaces = (message.match(/^\s+/) || [''])[0].length
        console.log(' '.repeat(leadingSpaces) + Color.FgRed + warn + Color.FgWhite)
      }
    },
    /**
     * Print's `[ status ] - message` to console with status `color`
     * @param {any} message
     * @param {string} status
     * @param {string} color
     */
    _print(message: any, status: string, color: string) {
      console.log(
        `${Color.FgGray}[${color}${status.padStart(4 + status.length / 2).padEnd(8)}${
          Color.FgGray
        }] - ${message}${Color.FgWhite}`
      )
    },
  }
  colored = {
    /**
     * Print's `message` with `black` color
     * @param {any} message
     */
    black(message: any) {
      console.log(Color.FgBlack + message + Color.FgWhite)
    },
    /**
     * Print's `message` with `red` color
     * @param {any} message
     */
    red(message: any) {
      console.log(Color.FgRed + message + Color.FgWhite)
    },
    /**
     * Print's `message` with `green` color
     * @param {any} message
     */
    green(message: any) {
      console.log(Color.FgGreen + message + Color.FgWhite)
    },
    /**
     * Print's `message` with `yellow` color
     * @param {any} message
     */
    yellow(message: any) {
      console.log(Color.FgYellow + message + Color.FgWhite)
    },
    /**
     * Print's `message` with `blue` color
     * @param {any} message
     */
    blue(message: any) {
      console.log(Color.FgBlue + message + Color.FgWhite)
    },
    /**
     * Print's `message` with `magenta` color
     * @param {any} message
     */
    magenta(message: any) {
      console.log(Color.FgMagenta + message + Color.FgWhite)
    },
    /**
     * Print's `message` with `cyan` color
     * @param {any} message
     */
    cyan(message: any) {
      console.log(Color.FgCyan + message + Color.FgWhite)
    },
    /**
     * Print's `message` with `white` color
     * @param {any} message
     */
    white(message: any) {
      console.log(Color.FgWhite + message + Color.FgWhite)
    },
    /**
     * Print's `message` with `gray` color
     * @param {any} message
     */
    gray(message: any) {
      console.log(Color.FgGray + message + Color.FgWhite)
    },
  }
}

export const LoggerType = typeof Logger

export default new Logger()

// if (color === 'cyan') {
//   return `\`\`\`ansi\n[0;2m[0;31m[0;34m${message}[0m[0;31m[0m[0m\`\`\``
// }
// if (color === 'yellow') {
//   return `\`\`\`ansi\n[0;2m[0;31m[0;34m[0;30m[0;33m${message}[0m[0;30m[0m[0;34m[0m[0;31m[0m[0m\`\`\``
// }
// if (color === 'red') {
//   return `\`\`\`ansi\n[0;2m[0;31m[0;34m${message}[0m[0;31m[0m[0m\`\`\``
// }
// if (color === 'gray') {
//   return `\`\`\`ansi\n[0;2m[0;31m[0;34m[0;30m${message}[0m[0;34m[0m[0;31m[0m[0m\`\`\``
// }
// if (color === 'white') {
//   return `\`\`\`${message}\`\`\``
// }

import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js'

/**
 * Creates command using tutorial in following format `/command-name <required-option> (optional-option)`
 *
 * @param {SlashCommandBuilder} command instance of SlashCommandBuilder
 * @returns {string[]} returns array `[command_name, ...options]` in right format
 * @example
 * // `/command-name` `<opt1>` `(opt2)`
 * getCommandUsage(command).map(opt => `\`${opt}\``).join(' ')
 * @example
 * // ```/command-name <opt1> (op2)```
 * '```' + getCommandUsage(command).join(' ') + '```'
 */
export function getCommandUsage(command: SlashCommandBuilder): string[] {
  const { name, options } = command

  const nameStr = `/${name}`
  const optionsStr = options.map((option) => {
    const { name, required } = option.toJSON()

    return required || option instanceof SlashCommandSubcommandBuilder ? `<${name}>` : `(${name})`
  })

  return [nameStr, ...optionsStr]
}

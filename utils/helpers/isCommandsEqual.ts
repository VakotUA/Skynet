import { ApplicationCommand, SlashCommandBuilder } from 'discord.js'

export function isCommandsEqual(
  locCommand: SlashCommandBuilder,
  apiCommand: ApplicationCommand
): boolean {
  // name comparison
  if (locCommand.name !== apiCommand.name) {
    return false
  }
  // description comparison
  if (locCommand.description !== apiCommand.description) {
    return false
  }
  // nsfw comparison
  if (locCommand.nsfw ?? false !== apiCommand.nsfw) {
    return false
  }
  // options count comparison
  if (locCommand.options?.length !== apiCommand.options?.length) {
    return false
  }
  // deep options comparison
  for (let i = 0; i < locCommand.options.length; i++) {
    const locOption = locCommand.options[i].toJSON()
    const apiOption = apiCommand.options[i]
    // option name comparison
    if (locOption.name !== apiOption.name) {
      return false
    }
    // option description comparison
    if (locOption.description !== apiOption.description) {
      return false
    }
    // option type comparison
    if (locOption.type !== apiOption.type) {
      return false
    }
    // // deep option choices comparison
    // for (let j = 0; j < locOption.choices.length; j++) {
    //   // option name comparison
    //   if (locOption[j].name !== apiOption[j].name) {
    //     return false
    //   }
    //   // option value comparison
    //   if (locOption[j].value !== apiOption[j].value) {
    //     return false
    //   }
    // }
  }
  return true
}

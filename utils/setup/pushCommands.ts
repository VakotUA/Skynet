import { SlashCommandBuilder } from 'discord.js'

import { SkynetClient } from '@modules/models/client'

import { isCommandsEqual } from '@utils/helpers/isCommandsEqual'

import logger, { Color } from '@utils/helpers/logger'

export async function pushCommands(client: SkynetClient, clear = false): Promise<void> {
  const startTime = Date.now()

  logger.colored.magenta('Updating commands on remote')

  const actions = client.clientActions

  const commands = actions.filter((action) => action.data instanceof SlashCommandBuilder).sort()

  // save for some reasons (like for /help command)
  commands.forEach((command) => {
    client.localCommands.set(command.data.name, command)
    if (command.category) client.categories.set(command.category.name, command.category)
  })

  const applicationCommands = await client.application?.commands.fetch()

  // delete all application commands
  // used in some development process cases
  if (clear) {
    return await applicationCommands?.forEach(
      async (command) =>
        await command
          .delete()
          .then((command) =>
            logger.status._print(`Command /${command.name}`, 'DELETED', Color.FgRed)
          )
    )
  }

  await commands.forEach(async (command) => {
    const { data, deletable, forceUpdate } = command

    // collect existing command
    const existingCommand = await applicationCommands?.find((cmd) => cmd.name === data.name)

    // create new command
    if (!existingCommand && !deletable) {
      return await client.application?.commands
        .create(data as SlashCommandBuilder)
        .then(() => logger.status._print(`Command /${data.name}`, 'CREATE', Color.FgGreen))
    }

    // delete existing
    if (existingCommand && deletable) {
      return await existingCommand
        .delete()
        .then(() => logger.status._print(`Command /${data.name}`, 'DELETE', Color.FgRed))
    }

    // update existing
    if (
      (existingCommand && !isCommandsEqual(data as SlashCommandBuilder, existingCommand)) ||
      forceUpdate
    ) {
      return await client.application?.commands
        .edit(existingCommand!.id, data as SlashCommandBuilder)
        .then(() => logger.status._print(`Command /${data.name}`, 'UPDATE', Color.FgYellow))
    }
  })

  return logger.colored.magenta(`Commands updated in ${Date.now() - startTime}ms`)
}

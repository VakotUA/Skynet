import path from 'path'
import fs from 'fs'

import { SkynetClient } from '@modules/models/client'
import { Action } from '@modules/models/action'

import { getFiles } from '@utils/helpers/fileSystem'

import logger from '@utils/helpers/logger'

export async function loadPlugins(client: SkynetClient): Promise<void> {
  const pluginsPath = path.join(__dirname, '..', '..', 'plugins')

  for (const pluginFolder of await fs.readdirSync(pluginsPath)) {
    const startTime = Date.now()

    if (pluginFolder !== 'music') continue

    const pluginPath = path.join(pluginsPath, pluginFolder)

    logger.colored.magenta(`Started plugin <${pluginFolder}> loading`)

    const actions = await getFiles(pluginPath, Action)

    actions.forEach((action) => client.clientActions.set(action.data.name, action))

    logger.colored.magenta(`Plugin successfully loaded in ${Date.now() - startTime}ms`)
  }
}

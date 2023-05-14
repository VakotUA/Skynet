import { ActivityType } from 'discord.js'
import mongoose from 'mongoose'

import { Action } from '@modules/models/action'
import { ActionEvents } from '@modules/libs/events'
import { SkynetClient } from '@modules/models/client'

import { pushCommands } from '@utils/setup/pushCommands'

import logger from '@utils/helpers/logger'

export default new Action({
  data: { name: 'client-ready-event' },

  event: ActionEvents.ClientReady,
  once: true,

  async execute(client: SkynetClient) {
    await client.user?.setActivity({
      name: 'Sky',
      type: ActivityType.Watching,
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    })

    await pushCommands(client).catch((error) => {
      logger.error('Error appears while updating commands')
      logger.error(error)
    })

    await mongoose.connect(process.env.MONGODB_TOKEN || '').catch((error) => {
      logger.error('Error appears while connectiong to database')
      logger.error(error)
    })

    return await console.log(`Logged in as ${client.user?.tag}`)

    // const strUserTag = [
    //   Color.FgRed,
    //   os.userInfo().username,
    //   Color.FgWhite,
    //   '@',
    //   Color.FgRed,
    //   os.hostname(),
    //   Color.FgWhite,
    // ].join('')

    // const strClientName = [
    //   Color.FgRed,
    //   'Client',
    //   Color.FgWhite,
    //   ': ',
    //   client.user?.tag ?? 'Loading...',
    // ].join('')

    // const strWS = [Color.FgRed, 'WS', Color.FgWhite, ': ', client.ws.gateway ?? 'Loading...'].join(
    //   ''
    // )

    // const strKernel = [
    //   Color.FgRed,
    //   'Kernel',
    //   Color.FgWhite,
    //   ': ',
    //   client.isReady() ? '4.92.384.42' : 'Loading...',
    // ].join('')

    // const strUptime = [
    //   Color.FgRed,
    //   'Uptime',
    //   Color.FgWhite,
    //   ': ',
    //   client.loadingEndedAt
    //     ? Math.round((Date.now() - client.loadingEndedAt.getTime()) / 1000 / 60) + ' mins'
    //     : 'Loading...',
    // ].join('')

    // const strActions = [
    //   Color.FgRed,
    //   'Actions',
    //   Color.FgWhite,
    //   ': ',
    //   client.clientActions.size,
    // ].join('')

    // const strCommands = [
    //   Color.FgRed,
    //   'Commands',
    //   Color.FgWhite,
    //   ': ',
    //   client.localCommands.size,
    // ].join('')

    // const strOS = [
    //   Color.FgRed,
    //   'OS: ',
    //   Color.FgWhite,
    //   [os.version(), os.release(), os.platform()].join(' ') ?? 'none',
    // ].join('')

    // const strCPU = [
    //   Color.FgRed,
    //   'CPU',
    //   Color.FgWhite,
    //   ': ',
    //   os.cpus().shift()?.model ?? 'none',
    // ].join('')

    // const strMemory = [
    //   Color.FgRed,
    //   'Memory',
    //   Color.FgWhite,
    //   ': ',
    //   Math.round(process.memoryUsage().heapUsed / 1024 / 1024) ?? 'none',
    //   '[MiB]/',
    //   Math.round(process.memoryUsage().heapTotal / 1024 / 1024) ?? 'none',
    //   '[MiB]',
    // ].join('')

    // const strSeparator = [Color.FgWhite, '-'.repeat(20)].join('')

    // console.log('\n\n')
    // console.log(`${Color.FgRed}                   ▄                   ${strUserTag}`)
    // console.log(`${Color.FgRed}                 ▄▄▄▄▄                 ${strSeparator}`)
    // console.log(`${Color.FgRed}               ▄▄▄▄▄▄▄▄▄               ${strClientName}`)
    // console.log(`${Color.FgRed}            ▗  ▄▄▄▄▄▄▄▄▄  ▖            ${strWS}`)
    // console.log(`${Color.FgRed}           ▄▄▄   ▄▄▄▄▄   ▄▄▄           ${strKernel}`)
    // console.log(`${Color.FgRed}         ▄▄▄▄▄▄▄   ▄   ▄▄▄▄▄▄▄         ${strUptime}`)
    // console.log(`${Color.FgRed}       ▄▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄       ${strActions}`)
    // console.log(`${Color.FgRed}     ▄▄▄▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄▄▄     ${strCommands}`)
    // console.log(`${Color.FgRed}   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄   ${strOS}`)
    // console.log(`${Color.FgRed}                                       ${strSeparator}`)
    // console.log(`           C Y B E R D Y N E           ${strCPU.trim()}`)
    // console.log(`                SYSTEMS                ${strMemory}`)
  },
})

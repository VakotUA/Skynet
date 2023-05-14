import { VoiceState } from 'discord.js'

import { GuildQueuePlayerNode, useMasterPlayer } from 'discord-player'

import { Action } from '@modules/models/action'
import { ActionEvents } from '@modules/libs/events'
import { SkynetClient } from '@modules/models/client'

import logger from '@utils/helpers/logger'

export default new Action({
  data: { name: 'music-pause-on-empty' },

  event: ActionEvents.VoiceLeave,

  async precondition(oldState: VoiceState, newState: VoiceState, client: SkynetClient) {
    if (oldState.channel?.members.filter((m) => m.id !== client.user?.id).size) return false

    const player = useMasterPlayer()

    if (!player) return false

    const queue = player.queues.get(oldState.guild.id)

    if (!queue) return false

    if (!queue.channel || oldState.channelId !== queue.channel.id) return false

    return true
  },

  async execute(oldState: VoiceState, newState: VoiceState) {
    const player = useMasterPlayer()!
    const queue = player.queues.get(oldState.guild.id)!

    new GuildQueuePlayerNode(queue).pause()

    return logger.log(`Queue of ${queue.guild.name} paused`)
  },
})

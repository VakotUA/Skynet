import { ButtonInteraction } from 'discord.js'

import { useMasterPlayer } from 'discord-player'

import { Action } from '@modules/models/action'
import { ActionEvents } from '@modules/libs/events'

import logger from '@utils/helpers/logger'

import { basePrecondition } from '../utils/basePrecondition.i'

export default new Action({
  data: { name: 'music-shuffle-button' },

  event: ActionEvents.ButtonInteraction,

  cooldown: 12_000,

  async precondition(interaction: ButtonInteraction) {
    if (!(await basePrecondition(interaction))) return false

    if (!useMasterPlayer()!.queues.cache.has(interaction.guildId!)) {
      await interaction.reply({
        content: 'Queue does not exist on this server',
        ephemeral: true,
      })
      return false
    }

    return true
  },

  async execute(interaction: ButtonInteraction) {
    const { guildId, user } = interaction

    const queue = useMasterPlayer()!.queues.cache.get(guildId!)!

    queue.tracks.shuffle()

    logger.log(`Queue shuffled by ${user.tag}`)

    return await interaction.reply(`Queue shuffled by <@${user.id}>`)
  },
})

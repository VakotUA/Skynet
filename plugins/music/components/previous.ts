import { ButtonInteraction } from 'discord.js'

import { useMasterPlayer } from 'discord-player'

import { Action } from '@modules/models/action'
import { ActionEvents } from '@modules/libs/events'

import logger from '@utils/helpers/logger'

import { basePrecondition } from '../utils/basePrecondition.i'

export default new Action({
  data: { name: 'music-previous-button' },

  event: ActionEvents.ButtonInteraction,

  cooldown: 6_000,

  async precondition(interaction: ButtonInteraction) {
    if (!(await basePrecondition(interaction))) return false

    const queue = useMasterPlayer()!.queues.cache.get(interaction.guildId!)

    if (!queue) {
      await interaction.reply({
        content: 'Queue does not exist on this server',
        ephemeral: true,
      })
      return false
    }

    if (!queue.isPlaying() || !queue.currentTrack) {
      await interaction.reply({ content: 'Nothing is playing now', ephemeral: true })
      return false
    }

    if (queue.currentTrack.requestedBy?.id !== interaction.user.id) {
      await interaction.reply({ content: 'You have no tracks queued', ephemeral: true })
      return false
    }

    if (!queue.history.previousTrack) {
      await interaction.reply({ content: 'There in no tracks in history', ephemeral: true })
      return false
    }

    return true
  },

  async execute(interaction: ButtonInteraction) {
    const { guildId, user } = interaction

    const queue = useMasterPlayer()!.queues.cache.get(guildId!)!

    queue.history.previous()

    logger.log(`Returned to ${queue.currentTrack!.title} by ${user.tag}`)

    await interaction.reply(`Returned to **${queue.currentTrack!.title}** by <@${user.id}>`)
  },
})

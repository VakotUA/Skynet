import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import { useMasterPlayer } from 'discord-player'

import { Action } from '@modules/models/action'
import { ActionEvents } from '@modules/libs/events'

import logger from '@utils/helpers/logger'

import { basePrecondition } from '../utils/basePrecondition.i'

export default new Action({
  data: new SlashCommandBuilder()
    .setName('previous')
    .setDescription('Return back to previos track'),

  event: ActionEvents.CommandInteraction,

  cooldown: 6_000,

  async precondition(interaction: ChatInputCommandInteraction) {
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

  async execute(interaction: ChatInputCommandInteraction) {
    const { guildId, user } = interaction

    const queue = useMasterPlayer()!.queues.cache.get(guildId!)!

    queue.history.previous()

    logger.log(`Returned to ${queue.currentTrack!.title} by ${user.tag}`)

    await interaction.reply(`Returned to **${queue.currentTrack!.title}** by <@${user.id}>`)
  },
})

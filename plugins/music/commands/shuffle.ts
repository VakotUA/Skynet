import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import { useMasterPlayer } from 'discord-player'

import { Action } from '@modules/models/action'
import { ActionEvents } from '@modules/libs/events'

import logger from '@utils/helpers/logger'

import { basePrecondition } from '../utils/basePrecondition.i'

export default new Action({
  data: new SlashCommandBuilder().setName('shuffle').setDescription('Shuffle current queue'),

  event: ActionEvents.CommandInteraction,

  cooldown: 12_000,

  async precondition(interaction: ChatInputCommandInteraction) {
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

  async execute(interaction: ChatInputCommandInteraction) {
    const { guildId, user } = interaction

    const queue = useMasterPlayer()!.queues.cache.get(guildId!)!

    queue.tracks.shuffle()

    logger.log(`Queue shuffled by ${user.tag}`)

    return await interaction.reply(`Queue shuffled by <@${user.id}>`)
  },
})

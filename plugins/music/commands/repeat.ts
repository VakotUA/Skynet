import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from 'discord.js'

import { QueueRepeatMode, useMasterPlayer } from 'discord-player'

import { Action } from '@modules/models/action'
import { ActionEvents } from '@modules/libs/events'

import { basePrecondition } from '../utils/basePrecondition.i'

export default new Action({
  data: new SlashCommandBuilder()
    .setName('repeat')
    .setDescription('Toggle repeat mode')
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName('track')
        .setDescription('Toggle repeat of curren track')
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName('queue')
        .setDescription('Toggle repeat of curren queue')
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder().setName('off').setDescription('Turn repeat mode off')
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName('autoplay')
        .setDescription('Toggle repeat mode to autoplay')
    ),

  event: ActionEvents.CommandInteraction,

  cooldown: 6_000,

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
    const { guildId, options } = interaction

    const queue = useMasterPlayer()!.queues.cache.get(guildId!)!

    if (options.getSubcommand() === 'track') {
      queue.setRepeatMode(QueueRepeatMode.TRACK)
      return await interaction.reply(`Repeat mode switched to **Track**`)
    } else if (options.getSubcommand() === 'queue') {
      queue.setRepeatMode(QueueRepeatMode.QUEUE)
      return await interaction.reply(`Repeat mode switched to **Queue**`)
    } else if (options.getSubcommand() === 'off') {
      queue.setRepeatMode(QueueRepeatMode.OFF)
      return await interaction.reply(`Repeat mode switched **Off**`)
    } else if (options.getSubcommand() === 'autoplay') {
      queue.setRepeatMode(QueueRepeatMode.AUTOPLAY)
      return await interaction.reply(`Repeat mode switched to **AutoPlay**`)
    } else {
      return await interaction.reply('Unknown subcommand')
    }
  },
})

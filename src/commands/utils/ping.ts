import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { ICommand } from '../../models/command'

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with "Pong!"'),

  cooldown: 3000,

  async execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({ content: `:ping_pong: Pong!`, ephemeral: true })
  },
} as ICommand
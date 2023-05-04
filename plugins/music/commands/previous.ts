import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import { Action } from '@modules/models/action'
import { ActionEvents } from '@modules/libs/events'

import { previous } from '../utils/previous.i'

export default new Action({
  data: new SlashCommandBuilder()
    .setName('previous')
    .setDescription('Return back to previos track'),

  event: ActionEvents.CommandInteraction,

  cooldown: 6_000,

  async execute(interaction: ChatInputCommandInteraction) {
    return await previous(interaction)
  },
})

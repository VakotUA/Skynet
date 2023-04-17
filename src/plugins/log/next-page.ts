import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Events,
} from 'discord.js'

import { nanoid } from 'nanoid'

import { Action } from '../../models/action'
import { localState } from './show'
import store from '../../utils/helpers/store'

export default {
  id: nanoid(),

  data: new ButtonBuilder()
    .setCustomId('log-next-page-button')
    .setLabel('Next')
    .setStyle(ButtonStyle.Secondary),

  event: Events.InteractionCreate,

  async init(interaction: ButtonInteraction) {
    if (interaction.customId === this.data.data.custom_id) {
      return await this.execute(interaction)
    }
  },

  async execute(interaction: ButtonInteraction) {
    if (localState.page * 10 <= store.get('log').length) localState.page++

    const logMessage: string = store
      .get('log')
      .map((l: string) => l.trim())
      .slice(localState.page * 10, (localState.page + 1) * 10)
      .join('')

    return await interaction.message
      .edit({
        content: logMessage || 'No log provided',
      })
      // This code sucks, but i dont figured out a better way to remove "This interaction failed"
      // from the buttons that dont need to provide any replies
      .then(() => interaction.reply(''))
  },
} as Action

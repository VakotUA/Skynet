import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

import { GuildQueue, QueueRepeatMode } from 'discord-player'

import { IMetaData } from '../models/metadata.i'

import logger from '@utils/helpers/logger'

export function getActionRow(queue: GuildQueue): ActionRowBuilder<ButtonBuilder> {
  const nextButton = new ButtonBuilder()
  const prevButton = new ButtonBuilder()
  const repeatButton = new ButtonBuilder()
  const shuffleButton = new ButtonBuilder()

  try {
    nextButton
      .setCustomId('music-skip-button')
      .setEmoji('▶️')
      .setLabel(
        `${(queue.metadata as IMetaData).skipVotes.length}/${Math.ceil(
          (queue.channel?.members.filter((m) => !m.user.bot).size ?? 0) / 2
        )}`
      )
      .setStyle(ButtonStyle.Primary)
      .setDisabled(!queue.history.nextTrack)
  } catch (error) {
    logger.error(error)
  }

  try {
    prevButton
      .setCustomId('music-previous-button')
      .setEmoji('◀️')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(!queue.history.previousTrack)
  } catch (error) {
    logger.error(error)
  }

  try {
    repeatButton
      .setCustomId('music-repeat-button')
      .setEmoji('🔄')
      .setStyle(
        queue.repeatMode === QueueRepeatMode.OFF ? ButtonStyle.Secondary : ButtonStyle.Primary
      )

    if (queue.repeatMode === QueueRepeatMode.TRACK) repeatButton.setLabel('Track')
    if (queue.repeatMode === QueueRepeatMode.QUEUE) repeatButton.setLabel('Queue')
  } catch (error) {
    logger.error(error)
  }

  try {
    shuffleButton.setCustomId('music-shuffle-button').setEmoji('🔀').setStyle(ButtonStyle.Primary)
  } catch (error) {
    logger.error(error)
  }

  return new ActionRowBuilder<ButtonBuilder>().setComponents(
    prevButton,
    repeatButton,
    shuffleButton,
    nextButton
  )
}

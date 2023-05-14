import { EmbedBuilder } from 'discord.js'

import { GuildQueue, GuildQueuePlayerNode } from 'discord-player'

import { IMetaData } from '../models/metadata.i'

import logger from '@utils/helpers/logger'

export function getEmbed(queue: GuildQueue): EmbedBuilder {
  const track = queue.currentTrack

  const embeb = new EmbedBuilder()

  try {
    embeb
      .setTitle(track?.title || null)
      .setDescription(track?.description || null)
      .setFields(
        {
          name: '📩・Requested by',
          value: '```' + track?.requestedBy!.tag + '```',
          inline: true,
        },
        {
          name: '👀・Views',
          value: '```' + track?.views.toLocaleString('de-DE', { minimumFractionDigits: 0 }) + '```',
          inline: true,
        },
        {
          name: '✍️・Author',
          value: '```' + track?.author + '```',
          inline: true,
        },
        {
          name: '⬅️・Previous track',
          value: '```' + (queue.history.previousTrack || ' ') + '```',
        },
        {
          name: '➡️・Next track',
          value: '```' + (queue.history.nextTrack || ' ') + '```',
        }
      )
      .setImage(track?.thumbnail || null)
      .setURL(track?.url || null)
      .setTimestamp((queue.metadata as IMetaData).message?.createdAt)
      .setFooter({
        text: new GuildQueuePlayerNode(queue).createProgressBar() || track?.duration || '',
      })
  } catch (error) {
    logger.error(error)
  }

  return embeb
}

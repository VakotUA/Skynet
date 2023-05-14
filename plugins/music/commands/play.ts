import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
  GuildMember,
  VoiceChannel,
  GuildTextBasedChannel,
} from 'discord.js'

import { QueryType, useMasterPlayer } from 'discord-player'

import { Action } from '@modules/models/action'
import { ActionEvents } from '@modules/libs/events'

import logger from '@utils/helpers/logger'

import { basePrecondition } from '../utils/basePrecondition.i'
import { IMetaData } from '../models/metadata.i'

export default new Action({
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Which song i should play?')
    .addStringOption(
      new SlashCommandStringOption()
        .setName('query')
        .setDescription('URL | name of the song')
        .setRequired(true)
    ),

  event: ActionEvents.CommandInteraction,

  cooldown: 12_000,

  precondition: async (interaction: ChatInputCommandInteraction) =>
    await basePrecondition(interaction),

  async execute(interaction: ChatInputCommandInteraction) {
    const { options, channel } = interaction
    const member = interaction.member as GuildMember

    await interaction.deferReply({ ephemeral: true })

    const voiceChannel = member.voice.channel as VoiceChannel

    const player = useMasterPlayer()!

    const searchResult = await player.search(options.getString('query', true), {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    })

    if (!searchResult || !searchResult.tracks.length) {
      return await interaction.editReply(`No search results were found`)
    }

    const metadata: IMetaData = {
      channel: channel as GuildTextBasedChannel,
      message: null,
      interval: null,
      skipVotes: [],
    }

    try {
      const { track } = await player.play(voiceChannel, searchResult, {
        nodeOptions: {
          metadata: metadata,
          leaveOnEmptyCooldown: 60_000,
          leaveOnEndCooldown: 60_000,
        },
      })

      logger.log(`${track.title} enqueued by ${track.requestedBy?.tag}`)

      return await interaction.editReply(`**${track.title}** enqueued`)
    } catch (error) {
      logger.error(error)
      return await interaction.editReply('Failed to play this track')
    }
  },
})

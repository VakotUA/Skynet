import { GuildTextBasedChannel, Message, Snowflake } from 'discord.js'

export interface IMetaData {
  channel: GuildTextBasedChannel
  message: Message | null
  interval: NodeJS.Timer | null
  skipVotes: Snowflake[]
}

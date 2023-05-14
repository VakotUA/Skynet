import { useMasterPlayer } from 'discord-player'
import { Interaction, GuildMember } from 'discord.js'

/**
 * Determine is user use action from guild
 * and is user connected to voice channel.
 * If precondition true - `channel`, `queue.channel`, `guild`, `member as GuildMember` is exist
 *
 * @param {Interaction} interaction
 * @returns {boolean} `true` | `false`
 * @example
 * new Action({
 *  fields...
 *  precondition: async (interaction: Interaction) => await basePrecondition(interaction)
 *  fields...
 * })
 */
export async function basePrecondition(interaction: Interaction): Promise<boolean> {
  const { guild, guildId } = interaction

  if (!guild || !guildId) {
    const reply = 'Action can be executed only in server'

    if (interaction.isRepliable()) {
      await interaction.reply({ content: reply, ephemeral: true })
    } else {
      await interaction.user.send(reply)
    }

    return false
  }

  const member = interaction.member as GuildMember
  if (!member.voice.channel?.isVoiceBased()) {
    const reply = 'You should be in voice channel to use this action'

    if (interaction.isRepliable()) {
      await interaction.reply({ content: reply, ephemeral: true })
    } else {
      await interaction.user.send(reply)
    }

    return false
  }

  const queue = useMasterPlayer()?.queues.get(guildId)
  const voiceChannel = member.voice.channel
  if (queue && voiceChannel.id !== queue?.channel?.id) {
    const reply = `Queue was already created at channel <#${queue?.channel?.id}>`

    if (interaction.isRepliable()) {
      await interaction.reply({ content: reply, ephemeral: true })
    } else {
      await interaction.user.send(reply)
    }

    return false
  }

  return true
}

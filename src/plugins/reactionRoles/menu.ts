import {
  EmbedBuilder,
  Events,
  GuildMember,
  GuildMemberRoleManager,
  Snowflake,
  StringSelectMenuInteraction,
} from 'discord.js'

import { Action } from '../../modules/models/action'

import { roles } from './config.json'

function addRoles(member: GuildMember, roles: Snowflake[]) {
  if (!roles.length) return

  return roles.forEach(async (role) => {
    await member.roles.add(role)
  })
}
function removeRoles(member: GuildMember, roles: Snowflake[]) {
  if (!roles.length) return

  return roles.forEach(async (role) => {
    await member.roles.remove(role)
  })
}

export default new Action({
  data: { name: 'reaction-roles-select-menu' },

  event: Events.InteractionCreate,

  async init(interaction: StringSelectMenuInteraction) {
    if (this.data.name !== interaction.customId) return

    return await this.execute(interaction)
  },

  async execute(interaction: StringSelectMenuInteraction) {
    if (!interaction.member) return

    const memberRoles = interaction.member.roles as GuildMemberRoleManager
    const selectedRoles = interaction.values
    const possibleRoles = roles.map((role) => role.value)

    const addedRoles = possibleRoles.filter(
      (role) => selectedRoles.includes(role) && !memberRoles.cache.has(role)
    )
    const removedRoles = possibleRoles.filter(
      (role) => !selectedRoles.includes(role) && memberRoles.cache.has(role)
    )

    // BULK ADD AND REMOVE ISN'T WORKING TOGETHER AND IT'S NOT MY FAULT
    // if (addedRoles.length)
    //   await (interaction.member.roles as GuildMemberRoleManager)
    //     .add(addedRoles)
    //     .then((member) => console.debug(member.roles.cache.keys()))
    //     .then(() => logger.log(`Added ${addedRoles.length} roles`))
    //     .catch(logger.error)

    // if (removedRoles.length)
    //   await (interaction.member.roles as GuildMemberRoleManager)
    //     .remove(removedRoles)
    //     .then((member) => console.debug(member.roles.cache.keys()))
    //     .then(() => logger.log(`Removed ${removedRoles.length} roles`))
    //     .catch(logger.error)

    addRoles(interaction.member as GuildMember, addedRoles)
    removeRoles(interaction.member as GuildMember, removedRoles)

    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .addFields(
        {
          name: 'Added roles:',
          value: `${addedRoles?.map((role) => `<@&${role}>`).join(' | ') || '-'}`,
        },
        {
          name: 'Removed roles:',
          value: `${removedRoles?.map((role) => `<@&${role}>`).join(' | ') || '-'}`,
        }
      )

    return await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    })
  },
})

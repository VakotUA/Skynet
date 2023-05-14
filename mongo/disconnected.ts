import { DataBaseAction } from '@modules/models/action'
import { DataBaseEvents } from '@modules/libs/events'

export default new DataBaseAction({
  data: { name: 'database-disconnected' },

  event: DataBaseEvents.Disconnected,

  async execute() {
    return await console.log('Disconnected from database')
  },
})

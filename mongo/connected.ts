import { DataBaseAction } from '@modules/models/action'
import { DataBaseEvents } from '@modules/libs/events'

export default new DataBaseAction({
  data: { name: 'database-connected' },

  event: DataBaseEvents.Connected,

  async execute() {
    return await console.log('Connected to database')
  },
})

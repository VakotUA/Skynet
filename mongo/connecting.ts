import { DataBaseAction } from '@modules/models/action'
import { DataBaseEvents } from '@modules/libs/events'

export default new DataBaseAction({
  data: { name: 'database-connecting' },

  event: DataBaseEvents.Connecting,

  async execute() {
    return await console.log('Connecting to database')
  },
})

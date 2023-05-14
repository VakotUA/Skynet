import { DataBaseAction } from '@modules/models/action'
import { DataBaseEvents } from '@modules/libs/events'

export default new DataBaseAction({
  data: { name: 'database-error' },

  event: DataBaseEvents.Error,

  async execute(error) {
    return await console.log(error)
  },
})

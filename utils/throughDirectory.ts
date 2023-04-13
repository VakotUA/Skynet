import fs from 'fs'
import path from 'path'
import { logger } from './logger'

export function* throughDirectory(directoryPath: string): Generator<string> {
  const files = fs.readdirSync(directoryPath)

  for (const file of files) {
    const filePath = path.join(directoryPath, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      yield* throughDirectory(filePath)
    } else if (stats.isFile()) {
      logger.log(`File ${file} loaded`)
      yield filePath
    }
  }
}
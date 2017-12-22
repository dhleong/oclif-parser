import { IFlag } from './flags'
import { deps } from './deps'
import lodash from 'ts-lodash'

function dim(s: string): string {
  if (deps.chalk) return deps.chalk.dim(s)
  return s
}

export type FlagUsageOptions = { displayRequired?: boolean }
export function flagUsage(flag: IFlag<any>, options: FlagUsageOptions = {}): [string, string | undefined] {
  const label = []
  if (flag.char) label.push(`-${flag.char}`)
  if (flag.name) label.push(` --${flag.name}`)

  const usage = flag.type === 'option' ? ` ${flag.name.toUpperCase()}` : ''

  let description: string | undefined = flag.description || ''
  if (options.displayRequired && flag.required) description = `(required) ${description}`
  description = description ? dim(description) : undefined

  return [' ' + label.join(',').trim() + usage, description] as [string, string | undefined]
}

export function flagUsages(flags: IFlag<any>[], options: FlagUsageOptions = {}): [string, string | undefined][] {
  if (!flags.length) return []
  const _: typeof lodash = require('ts-lodash').default
  flags = _.sortBy(flags, f => [!f.char, f.char, f.name])
  return flags.map(f => flagUsage(f, options))
}

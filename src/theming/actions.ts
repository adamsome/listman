import { action, payload } from 'ts-action'

export const setThemeID = action('[Theme] Set ID', payload<{ id: string }>())

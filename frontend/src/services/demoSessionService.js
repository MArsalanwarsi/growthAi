import { demoTokenKey, demoUserKey } from '@/utils/constants'
import { storageService } from './storageService'

export const demoSessionService = {
  read() {
    return {
      token: storageService.get(demoTokenKey),
      user: storageService.get(demoUserKey),
    }
  },
  save(user, token) {
    storageService.set(demoTokenKey, token)
    storageService.set(demoUserKey, user)
  },
  clear() {
    storageService.remove(demoTokenKey)
    storageService.remove(demoUserKey)
  },
}

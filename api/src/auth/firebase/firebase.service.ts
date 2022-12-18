import { App, applicationDefault, initializeApp } from 'firebase-admin/app'
import { Auth } from 'firebase-admin/lib/auth/auth'
import { getAuth } from 'firebase-admin/auth'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FirebaseService {
  private app: App

  constructor() {
    this.app = initializeApp({
      credential: applicationDefault(), // Not always the case!
    })

    if (!this.app) throw new Error('Firebase app not initialized')
  }

  // eigen firebase getAuth
  getAuth = (): Auth => getAuth()
}

import { User as FirebaseUser } from 'firebase/auth'

export default interface User extends FirebaseUser {
  street: string
  city: string
  houseNumber: string
  role: Role
  createdAt: string
}

export enum Role {
  USER = 'USER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
}

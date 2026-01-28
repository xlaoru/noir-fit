import { initializeApp, applicationDefault, getApps } from "firebase-admin/app"
import { getStorage } from "firebase-admin/storage"

if (!getApps().length) {
  initializeApp({
    credential: applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  })
}

const adminStorage = getStorage()
export { adminStorage }

// import component from ''
import { FirestoreService } from './firestore.service';
import { StorageService } from './storage.service';

export const services: any[] = [ FirestoreService, StorageService ];

// export * from ''
export * from './firestore.service';
export * from './storage.service';

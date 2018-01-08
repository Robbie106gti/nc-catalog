// import component from ''
import { CatalogService } from './catalog.service';
import { FirestoreService } from './firestore.service';

export const services: any[] = [CatalogService, FirestoreService ];

// export * from ''
export * from './catalog.service';
export * from './firestore.service';

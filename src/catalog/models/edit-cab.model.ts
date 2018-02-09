import { Cabinets } from './cabinets.model';

export interface EditCab {
    version: Version;
    content: Cabinets;
}


export interface Version {
    height: string;
    version?: string;
    image?: string;
    specImage: string;
    specifications?: Array<string>;
    notes?: Array<string>;
    addOns?: Array<string>;
}

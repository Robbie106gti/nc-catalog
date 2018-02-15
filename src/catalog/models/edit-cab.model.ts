import { Cabinets } from './cabinets.model';

export interface EditCab {
    version: Version;
    content: Cabinets;
    updated?: boolean;
    fail?: boolean;
    success?: boolean;
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

import { CardComponent } from './card/card.component';
import { ChipComponent } from './chip/chip.component';

export const components: any[] = [
    CardComponent, ChipComponent
];

// export * from ''
export *  from './card/card.component';
export *  from './chip/chip.component';

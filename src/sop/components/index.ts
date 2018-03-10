import { CardComponent } from './card/card.component';
import { ChipComponent } from './chip/chip.component';
import { ActionBtnComponent } from './action-btn/action-btn.component';
import { AddBtnComponent } from './add-btn/add-btn.component';
import { ModalComponent } from './modal/modal.component';
import { LoaderComponent } from './loader/loader.component';
import { InputAddComponent } from './input-add/input-add.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ChipImageComponent } from './chip-image/chip-image.component';
import { DragNDropDirective } from './image-upload/dragNdrop.directive';

export const components: any[] = [
    CardComponent, ChipComponent, ActionBtnComponent, AddBtnComponent, ModalComponent, LoaderComponent, InputAddComponent, ImageUploadComponent, ChipImageComponent, DragNDropDirective
];

// export * from ''
export *  from './card/card.component';
export *  from './chip/chip.component';
export *  from './action-btn/action-btn.component';
export *  from './add-btn/add-btn.component';
export *  from './modal/modal.component';
export *  from './loader/loader.component';
export *  from './input-add/input-add.component';
export *  from './image-upload/image-upload.component';
export *  from './chip-image/chip-image.component';
export *  from './image-upload/dragNdrop.directive';

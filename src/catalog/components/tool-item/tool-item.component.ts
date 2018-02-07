import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    OnChanges,
    SimpleChanges,
  } from '@angular/core';

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'tool-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="tool-item">
        <span *ngIf="user.roles.admin">
            <i class="material-icons indigo-text text-darken-1">edit</i>
            <i *ngIf="category?.active; else active" (click)="TurnOff()" class="material-icons blue-grey-text text-darken-4">visibility</i>
        </span>
        <i *ngIf="bookmark; else notFav" (click)="UnbookmarkIt()" class="material-icons red-text text-darken-4">turned_in</i>
    </div>
    <ng-template #notFav><i (click)="BookmarkIt()" class="material-icons red-text text-darken-4">turned_in_not</i></ng-template>
    <ng-template #active><i (click)="TurnOn()" class="material-icons blue-grey-text">visibility_off</i></ng-template>
    `,
  })
  export class ToolItemComponent implements OnChanges {
    @Input() category: any;
    @Input() user: any;
    @Input() userFavs: any;
    bookmark: Boolean;
    @Output() add = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();
    @Output() turnOn = new EventEmitter<any>();
    @Output() turnOff = new EventEmitter<any>();

    ngOnChanges(changes: SimpleChanges) {
        if (changes['userFavs']) {
            this.setFavorite(this.userFavs);
        }
    }

    setFavorite(favs) { if (favs) { favs.map(fav => { if (fav.id === this.category.id) { this.bookmark = true; } }); } }
    BookmarkIt() { this.add.emit({ cat: this.category, user: this.user }); this.bookmark = true; }
    UnbookmarkIt() { this.remove.emit({ cat: this.category, user: this.user }); this.bookmark = false; }
    TurnOn() { this.turnOn.emit({ cat: this.category, user: this.user }); this.category.active = true; }
    TurnOff() { this.turnOff.emit({ cat: this.category, user: this.user }); this.category.active = false; }
  }

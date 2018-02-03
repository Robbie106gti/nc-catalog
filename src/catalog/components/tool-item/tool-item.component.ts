import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';

  @Component({
    selector: 'tool-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="tool-item">
        <span *ngIf="user.roles.admin">
            <i class="material-icons indigo-text text-darken-1">edit</i>
            <i *ngIf="category?.active; else active" (click)="TurnOff()" class="material-icons blue-grey-text text-darken-4">visibility</i>
        </span>
        <i *ngIf="Bookmarked; else notFav" (click)="UnbookmarkIt()" class="material-icons red-text text-darken-4">turned_in</i>
    </div>
    <ng-template #notFav><i (click)="BookmarkIt()" class="material-icons red-text text-darken-4">turned_in_not</i></ng-template>
    <ng-template #active><i (click)="TurnOn()" class="material-icons blue-grey-text">visibility_off</i></ng-template>
    `,
  })
  export class ToolItemComponent {
    @Input() category: any;
    @Input() user: any;
    bookmarked: boolean;
    @Output() add = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();
    @Output() turnOn = new EventEmitter<any>();
    @Output() turnOff = new EventEmitter<any>();

    get Bookmarked (): Boolean {
        if (this.user.favorites) {
            this.bookmarked = this.user.favorites.map(fav => { if (fav === this.category.id) { return true; }});
        }
        return this.bookmarked ? this.bookmarked : false;
    }

    BookmarkIt() {
        this.add.emit({ cat: this.category, user: this.user });
    }

    UnbookmarkIt() {
        this.remove.emit({ cat: this.category, user: this.user });
    }

    TurnOn() {
        this.turnOn.emit({ cat: this.category, user: this.user });
    }

    TurnOff() {
        this.turnOff.emit({ cat: this.category, user: this.user });
    }
  }

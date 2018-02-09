import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, Favorites, Notes } from '../../models/user.model';
import * as fromServices from '../../services';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'category-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <tool-item  *ngIf="(user$ | async) as user"
        [category]="item"
        [user]="user"
        [userFavs]="(userFavs$ | async)"
        (add)="BookmarkIt($event)"
        (remove)="UnbookmarkIt($event)"
        (turnOn)="Active($event)"
        (turnOff)="Unactive($event)"></tool-item>
    <a [routerLink]="[item.title]">
        <div class="card-image waves-effect waves-block waves-light">
            <img class="image20 activator" src="{{ item.image }}">
        </div>
        <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{ item.title }}</span>
            <chip *ngFor="let chip of item.tags" [chip]="chip"></chip>
        </div>
    </a>
    `,
  })
  export class CategoryViewComponent {
    user$: Observable<User>;
    userFavs$: Observable<Favorites[]>;
    @Input() item: any;
    @Output() add = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();
    @Output() turnOn = new EventEmitter<any>();
    @Output() turnOff = new EventEmitter<any>();

    constructor (private store: Store<fromStore.ProductsState>, private firestore: fromServices.FirestoreService) {
        this.user$ = this.store.select(fromStore.getUserData);
        this.userFavs$ = this.store.select(fromStore.getUserFavs);
    }

    BookmarkIt(event)   {
        this.firestore.upsert(`users/${event.user.email}/favorites/${event.cat.id}`, { name: event.cat.title, id: event.cat.id });
    }
    UnbookmarkIt(event) { this.firestore.delete(`users/${event.user.email}/favorites/${event.cat.id}`); }
    Active(event)       {
        this.firestore.update(`structure/${this.CatOrCab(event.cat)}/${event.cat.sub.toLowerCase()}/${event.cat.id}`,
        { active: true, updatedBy: event.user.fullName });
    }
    Unactive(event)     {
        this.firestore.update(`structure/${this.CatOrCab(event.cat)}/${event.cat.sub.toLowerCase()}/${event.cat.id}`,
        { active: false, updatedBy: event.user.fullName });
    }
    CatOrCab(cat) {
        return cat.cabinet ? 'cabinets' : 'category';
    }
  }

import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Pipe({
  name: 'downloadUrl'
})
export class DownloadUrlPipe implements PipeTransform {
  constructor(public storage: AngularFireStorage) {}

  transform(featuredPhoto: any): any {
    const photo = this.storage
      .ref(featuredPhoto)
      .getDownloadURL()
      .do(console.log);
    return photo;
  }
}

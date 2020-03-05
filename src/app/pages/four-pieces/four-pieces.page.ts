import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, CdkDropList, transferArrayItem, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-four-pieces',
  templateUrl: './four-pieces.page.html',
  styleUrls: ['./four-pieces.page.scss'],
})
export class FourPiecesPage implements OnInit, OnDestroy {

  todo = [];
  done1 = [];
  done2 = [];
  done3 = [];
  done4 = [];
  img: any = '';
  selectImg = '';
  showPieces = false;
  helpImg = false;
  classContainer = 'example-container';
  private counter = 0;

  constructor(public alertController: AlertController) {}

  ngOnInit() {
    this.selectImage();
    this.reload();
    this.img = '';
  }

  ngOnDestroy() {
    this.todo = [];
    this.done1 = [];
    this.done2 = [];
    this.done3 = [];
    this.done4 = [];
    this.img = '';
    this.selectImg = '';
  }

  private shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Ready!',
      message: 'You finished',
      backdropDismiss: false,
      buttons: [
        {
          text: '👍',
          handler: () => {
            this.reload();
            this.sampleComponent();
          }
        }
      ]
    });
    await alert.present();
  }

  async selectImage() {
    const alert = await this.alertController.create({
      header: 'New puzzle',
      message: 'Choose image',
      backdropDismiss: false,
      buttons: [
        {
          text: '📷Yes',
          handler: () => {
            this.sampleComponent();
          }
        }
      ]
    });
    await alert.present();
  }

  changeImg(img: string) {
    this.reload();
    this.sampleComponent();
    this.classContainer = 'example-container';
    this.showPieces = true;
    this.img = img;
  }

  evenPredicate(drag: CdkDrag, drop: CdkDropList) {
    if (drag.data.done === drop.id) {
      return true;
    } else {
      return false;
    }
  }

  public reload(): void {
    this.todo = [
      { value: '1', done: 'done1' },
      { value: '2', done: 'done2' },
      { value: '3', done: 'done3' },
      { value: '4', done: 'done4' }
    ];
    this.todo = this.shuffle(this.todo);
    this.done1 = [];
    this.done2 = [];
    this.done3 = [];
    this.done4 = [];
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.counter++;
      if (this.counter === 3) {
        this.counter = 0;
        this.errorff();

      }
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      event.container.disabled = true;
      this.counter = 0;
    }
    if (event.previousContainer.data.length === 0) {
      this.presentAlertConfirm();
    }
  }

  sampleComponent(): void {
    if (this.selectImg === 'slide-out-bottom' || this.selectImg === '') {
      this.selectImg = 'slide-in-bottom';
    } else {
      this.selectImg = 'slide-out-bottom';
    }
  }

  help(): void {
    if (this.classContainer === 'example-container') {
      this.classContainer = 'example-container helper';
      this.helpImg = true;
    } else {
      this.classContainer = 'example-container';
      this.helpImg = false;
    }
  }

  async errorff() {
    const alert = await this.alertController.create({
      header: 'Incorrect place for puzzle',
      message: 'reload game',
      backdropDismiss: false,
      buttons: [
        {
          text: '📷',
          cssClass: 'buttonAlert',
          handler: () => {
            window.location.reload();
          }
        }
      ]
    });
    await alert.present();
  }
}

import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  successToast(message: any) {
    this.presentToast(message, 'success');
  }

  errorToast(message: any) {
    this.presentToast(message, 'danger');
  }

  warningToast(message: any) {
    this.presentToast(message, 'warning');
  }

  async presentToast(myMessage: any, myColor: string) {
    const toast = await this.toastController.create({
      header: 'Notificación',
      icon: 'information-circle',
      message: myMessage,
      duration: 2000,
      position: 'top',
      color: myColor,
    });
    await toast.present();
  }
}

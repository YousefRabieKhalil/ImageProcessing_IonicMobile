import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController, LoadingController, Loading, AlertController, ActionSheetController } from 'ionic-angular';
// import { TranslateService } from '@ngx-translate/core';
// import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
// import { Storage } from '@ionic/storage';
// import { Geolocation } from '@ionic-native/geolocation';


/*
  Generated class for the HelperToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperToolsProvider {
  currentUserPosition = { lat: 0, lng: 0 };
  CurrentUserCountry = 'Egypt';
  SelectedTab = 0;
  public readonly ToastPosition = { Top: 'top', Middle: 'middle', Buttom: 'buttom' }
  private loading: Loading;

  AllCategories;
  constructor(private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private actionsheetCtrl: ActionSheetController,
  ) {
    console.log('Hello HellperToolsProvider Provider');
  }
  //// Toast Helper Tools
  showToast(position: string, message: string, duration: number) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
    });
    toast.present(toast);
  }
  showToastWithCloseButton(position: string, message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      position: position,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
  //// End Toast Helper Tools
  //////////////////////////////////////////////////
  // Loading Helper Functions
  ShowLoadingSpinnerOnly() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box">
            <img src="assets/imgs/loading.svg" width="200" height="200">
          </div>
        </div>`,
    });
    return this.loading.present();
  }
  ShowLoadingWithText(text: string) {
    this.loading = this.loadingCtrl.create({
      content: text,
    });
    this.loading.present();
  }
  DismissLoading() {
    if (this.loading) {
      this.loading.dismissAll();
    }
  }
  // End Loagin Helper Functions
  ///////////////////////////////////////////////////
  // Alerts Functions Start
  showAlertWithOkButton(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['حسنا']
    });
    return alert.present();
  }
  ShowCustomAlertForHome(title: string, message: string, RefreshChcekingForGPS) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Refresh',
        handler: RefreshChcekingForGPS
      }],
      enableBackdropDismiss: false
    });
    return alert.present();
  }
  // ShowBadRequestErrorAlert() {
  //   return new Promise((resolve, reject) => {
  //     this.translate.get(['FError', 'CannotResolveProccessPleaseTryAgin']).subscribe(_val => {
  //       this.showAlertWithOkButton(_val['FError'], _val['CannotResolveProccessPleaseTryAgin']).then(__ => {
  //         resolve(__);
  //       }).catch(err => {
  //         reject(err);
  //       })
  //     }, err => {
  //       reject(err);
  //     })
  //   });
  // }
  // onNavigateToMap(LATIT, LONGIT) {
  //   return this.launchNavigator.navigate([parseFloat(LATIT), parseFloat(LONGIT)]);
  // }
  // End alert Functions
  // ///////////////////////////////////////////////////
  // CameraLoadPhoto() {
  //   const options = {
  //     quality: 75,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     //maximumImagesCount: 4,
  //     sourceType: this.camera.PictureSourceType.CAMERA,
  //     // sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //     allowEdit: true,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     targetWidth: 300,
  //     targetHeight: 300,
  //   };
  //   return this.camera.getPicture(options);
  // }
  // // Load Photo from Gallery 
  // GalleryLoadPhoto() {
  //   const options = {
  //     quality: 75,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     //maximumImagesCount: 4,
  //     //sourceType: this.camera.PictureSourceType.CAMERA,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     allowEdit: true,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     targetWidth: 300,
  //     targetHeight: 300,
  //   };
  //   return this.camera.getPicture(options);
  // }
  // OpenImage() {
  //   return new Promise((resolve, reject) => {
  //     let actionsheet = this.actionsheetCtrl.create({
  //       title: 'تحميل صورة',
  //       buttons: [
  //         {
  //           text: 'الصور',
  //           icon: 'images',
  //           handler: () => {
  //             this.GalleryLoadPhoto().then(DataURI => {
  //               resolve(DataURI);
  //             }).catch(err => {
  //               reject(err)
  //             });
  //           }
  //         },
  //         {
  //           text: 'الكاميرا',
  //           icon: 'camera',
  //           handler: () => {
  //             this.CameraLoadPhoto().then(URI => {
  //               resolve(URI);
  //             }).catch(err => {
  //               reject(err);
  //             })
  //           }
  //         },
  //         {
  //           text: 'الغاء',
  //           role: 'cancel',
  //           handler: () => {
  //             reject('cancel');
  //           }
  //         }
  //       ]
  //     });
  //     actionsheet.present();
  //   })

  // }
  // ///////////////////////

  ShowPleaseLoginAlert() {
    return new Promise((resolve, reject) => {
      this.alertCtrl.create({
        title: 'تنيه',
        message: 'يجب عليك ان تسجل الدخول كمستخدم عادي قبل ان تتم هذه العمليه',
        buttons: [{
          text: 'الغاء',
          handler: () => {
            reject('cancel')
          }
        }, {
          text: 'تسجيل الأن',
          handler: () => {
            resolve('goTo Login');
          }
        }]
      }).present();
    })
  }

  // ShowExitAlert() {
  //   return new Promise((resolve, reject) => {
  //     this.translate.get(['confirm', 'DoYouWantToExit', 'cancel']).subscribe(values => {
  //       let cssClassName = this.translate.currentLang == 'ar' ? 'AppAlertarabic' : 'AppAlertEnglish';
  //       let alert = this.alertCtrl.create({
  //         title: values['confirm'],
  //         message: values['DoYouWantToExit'],
  //         cssClass: cssClassName,
  //         buttons: [
  //           {
  //             text: values['cancel'],
  //             role: 'cancel',
  //             handler: () => {
  //               reject('err');
  //             }
  //           },
  //           {
  //             text: values['confirm'],
  //             handler: () => {
  //               resolve('done');
  //             }
  //           }]
  //       })
  //       alert.present();
  //     })
  //   })
  // }
  // RemeberUser(username, password) {
  //   return new Promise((resolve, reject) => {
  //     this.storage.set('Username', username).then(__ => {
  //       this.storage.set('password', password).then(__ => {
  //         resolve(__);
  //       }).catch(err => {
  //         reject(err);
  //       })
  //     }).catch(err => {
  //       reject(err);
  //     })
  //   });
  // }
  // GetUserSavedLanguage() {
  //   return new Promise((resolve, reject) => {
  //     this.storage.get('Language').then(UserLan => {
  //       if (UserLan) {
  //         let USerLanguge = {
  //           'userLan': UserLan
  //         }
  //         resolve(USerLanguge);
  //       } else {
  //         reject('language dose not exist');
  //       }
  //     })
  //   })
  // }
  // IntializeUSerPosition() {
  //   this.geo.getCurrentPosition().then(data => {
  //     this.currentUserPosition.lat = data.coords.latitude;
  //     this.currentUserPosition.lng = data.coords.longitude;
  //     this.storage.set('Location' , this.currentUserPosition);
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }
  // CheckIfUSerRememberd() {
  //   return new Promise((resolve, reject) => {
  //     this.storage.get('Username').then(userName => {
  //       if (userName) {
  //         this.storage.get('password').then(password => {
  //           if (password) {
  //             resolve({
  //               username: userName,
  //               password: password
  //             });
  //           } else {
  //             reject('not found');
  //           }
  //         }).catch(err => {
  //           reject(err);
  //         })
  //       } else {
  //         reject('not found');
  //       }
  //     }).catch(err => {
  //       reject(err);
  //     })
  //   });
  // }
}

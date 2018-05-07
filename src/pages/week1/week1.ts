import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { ApiProvider } from '../../providers/api/api';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';

/**
 * Generated class for the Week1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-week1',
  templateUrl: 'week1.html',
})
export class Week1Page {

  SelectedImage = 'assets/imgs/placeholder4.png';
  ImageURL;

  ResultImage = 'assets/imgs/placeholder4.png';
  imageFound = false;
  GrayLevel = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private imageViewerCtrl: ImageViewerController,
    private Imagepicker: ImagePicker,
    private api: ApiProvider, private helperTools: HelperToolsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Week1Page');
  }
  presentImage(myImage) {
    const imageViewer = this.imageViewerCtrl.create(myImage);
    imageViewer.present();
  }
  onSelectImageClicked() {
    let options: ImagePickerOptions = {
      outputType: 1,
      maximumImagesCount: 1
    }
    this.Imagepicker.getPictures(options).then(Data => {
      this.ImageURL = Data[0];
      this.SelectedImage = 'data:image/png;base64,' + this.ImageURL;
    }).catch(err => {
      console.log('there is an error')
    })
  }
  onProcessImageClicked() {
    this.helperTools.ShowLoadingSpinnerOnly().then(__ => {
      this.api.graylevel(this.ImageURL, this.GrayLevel).subscribe(data => {
        if (data['status'] == 'success') {
          this.imageFound = data['data'].final_image_url;
          this.helperTools.DismissLoading();
        } else {
          console.log(data);
          this.helperTools.DismissLoading();
          this.helperTools.showAlertWithOkButton('error', 'cannot parse this image');
        }
      }, err => {
        console.log(err);
        this.helperTools.DismissLoading();
        this.helperTools.showAlertWithOkButton('error', 'cannot parse this image');
      })
    })
  }
}

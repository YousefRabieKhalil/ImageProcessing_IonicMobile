import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { ImagePicker } from '@ionic-native/image-picker';
import { HttpClientModule } from '@angular/common/http';
import { TooltipsModule } from 'ionic-tooltips';
import { HelperToolsProvider } from '../providers/helper-tools/helper-tools';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicImageViewerModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TooltipsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    ImagePicker,
    HelperToolsProvider
  ]
})
export class AppModule {}

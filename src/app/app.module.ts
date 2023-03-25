import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RippleDirective } from './directives/ripple.directive';
import { ButtonComponent } from './components/shared/button/button.component';
import { IconComponent } from './components/shared/icon/icon.component';
import { InputComponent } from './components/shared/input/input.component';
import { FormsModule } from '@angular/forms';
import { BuffitemComponent } from './components/buffitem/buffitem.component';

@NgModule({
  declarations: [
    AppComponent,
    RippleDirective,
    ButtonComponent,
    IconComponent,
    InputComponent,
    BuffitemComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, ToolbarModule],
	declarations: [HomePage],
})
export class HomePageModule {}

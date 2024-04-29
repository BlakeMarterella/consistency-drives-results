import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { ConsistencyGridComponent } from './components/consistency-grid/consistency-grid.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { NewHabitPopupComponent } from './popups/new-habit-popup/new-habit-popup.component';
import { NewEntryPopupComponent } from './popups/new-entry-popup/new-entry-popup.component';



@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SidebarItemComponent,
    ConsistencyGridComponent,
    NewHabitPopupComponent,
    NewEntryPopupComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ColorPickerModule
  ]
})
export class DashboardModule { }

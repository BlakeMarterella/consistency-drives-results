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
import { HabitsComponent } from './pages/habits/habits.component';
import { EntriesComponent } from './pages/entries/entries.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';



@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SidebarItemComponent,
    ConsistencyGridComponent,
    NewHabitPopupComponent,
    NewEntryPopupComponent,
    HabitsComponent,
    EntriesComponent,
    ProfileComponent,
    PageHeaderComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ColorPickerModule
  ]
})
export class DashboardModule { }

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MyService } from './services/my.service';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/partials/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {AccordionModule} from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from 'primeng/inputnumber';
import { DatepickerModule } from 'ng2-datepicker';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import { Variables } from 'src/app/variables';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SidebarModule} from 'primeng/sidebar';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ListboxModule} from 'primeng/listbox';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {CheckboxModule} from 'primeng/checkbox';
import {ChartModule} from 'primeng/chart';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {ProgressBarModule} from 'primeng/progressbar';
import {ContextMenuModule} from 'primeng/contextmenu';
import { ComponentNameComponent } from './component-name/component-name.component';
import { PfaComponent } from './pfa/pfa.component';
import { EmployeeTableComponent } from './employee-table-component/employee-table.component';
import { ListeComponent } from './liste/liste.component';
import { MergeRowsPipe } from './merge-rows.pipe';
import { ImpressionComponent } from './impression/impression.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    ComponentNameComponent,
    PfaComponent,
    EmployeeTableComponent,
    ListeComponent,
    MergeRowsPipe,
    ImpressionComponent,

  ],
  imports: [
    ContextMenuModule,

    MessageModule,
    ProgressBarModule,
    TreeTableModule,
    TreeModule,
    ChartModule,
    CheckboxModule,
    SliderModule,
    CalendarModule,
    ListboxModule,
    ProgressSpinnerModule,
    DialogModule,
    SidebarModule,
    ToggleButtonModule,
    PanelModule,
    RadioButtonModule,
    TriStateCheckboxModule,
    InputNumberModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    TabViewModule,
    AccordionModule,
    ToastModule,
    HttpClientModule,
    TableModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule
  ],

  providers: [
    ConfirmationService,
    MessageModule,
    MessageService,
    Variables,
    { provide: LOCALE_ID, useValue: 'en-US' },
    MyService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

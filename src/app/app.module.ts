import { PrintCOEComponent } from './admin/print-coe/print-coe.component';
import { UserNavigationBar } from './user/user-navigation-bar/user-navigation-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetComponent } from './reset/reset.component';
import { RequestComponent } from './user/request/request.component';
import { AdminNavigationBarComponent } from './admin/admin-navigation-bar/admin-navigation-bar.component';
import { CreateComponent } from './user/create/create.component';
import { AdminRequestComponent } from './admin/admin-request/admin-request.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { EditComponent } from './user/edit/edit.component';
import { AdminCreateUserComponent } from './admin/admin-create-user/admin-create-user.component';
import { AdminEditUserComponent } from './admin/admin-edit-user/admin-edit-user.component';
import { AdminCreateDocumentComponent } from './admin/admin-create-document/admin-create-document.component';
import { AdminDocumentComponent } from './admin/admin-document/admin-document.component';
import { AdminEditDocumentComponent } from './admin/admin-edit-document/admin-edit-document.component';
import { AdminRankComponent } from './admin/admin-rank/admin-rank.component';
import { AdminCreateRankComponent } from './admin/admin-create-rank/admin-create-rank.component';
import { AdminEditRankComponent } from './admin/admin-edit-rank/admin-edit-rank.component';
import { AdminPurposeComponent } from './admin/admin-purpose/admin-purpose.component';
import { AdminCreatePurposeComponent } from './admin/admin-create-purpose/admin-create-purpose.component';
import { AdminEditPurposeComponent } from './admin/admin-edit-purpose/admin-edit-purpose.component';
import { AdminAmountComponent } from './admin/admin-amount/admin-amount.component';
import { AdminCreateAmountComponent } from './admin/admin-create-amount/admin-create-amount.component';
import { AdminEditAmountComponent } from './admin/admin-edit-amount/admin-edit-amount.component';
import { AdminAcceptedRequestsComponent } from './admin/admin-accepted-requests/admin-accepted-requests.component';
import { AdminDirectorComponent } from './admin/admin-director/admin-director.component';
import { AdminCreateDirectorComponent } from './admin/admin-create-director/admin-create-director.component';
import { AdminEditDirectorComponent } from './admin/admin-edit-director/admin-edit-director.component';
import { AdminDeniedRequestsComponent } from './admin/admin-denied-requests/admin-denied-requests.component';
import { PrintCoeWithCompensationComponent } from './admin/print-coe-with-compensation/print-coe-with-compensation.component';
import { AdminStatusComponent } from './admin/admin-status/admin-status.component';
import { AdminCreateStatusComponent } from './admin/admin-create-status/admin-create-status.component';
import { AdminEditStatusComponent } from './admin/admin-edit-status/admin-edit-status.component';

export function tokenGetter(){
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    BodyComponent,
    DashboardComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent,
    UserNavigationBar,
    RequestComponent,
    AdminNavigationBarComponent,
    CreateComponent,
    AdminRequestComponent,
    AdminUserComponent,
    EditComponent,
    AdminCreateUserComponent,
    AdminEditUserComponent,
    AdminCreateDocumentComponent,
    AdminDocumentComponent,
    AdminEditDocumentComponent,
    AdminRankComponent,
    AdminCreateRankComponent,
    AdminEditRankComponent,
    AdminPurposeComponent,
    AdminCreatePurposeComponent,
    AdminEditPurposeComponent,
    AdminAmountComponent,
    AdminCreateAmountComponent,
    AdminEditAmountComponent,
    AdminAcceptedRequestsComponent,
    PrintCOEComponent,
    AdminDirectorComponent,
    AdminCreateDirectorComponent,
    AdminEditDirectorComponent,
    AdminDeniedRequestsComponent,
    PrintCoeWithCompensationComponent,
    AdminStatusComponent,
    AdminCreateStatusComponent,
    AdminEditStatusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://documentrequestapp.azurewebsites.net"],
        disallowedRoutes: []
      }
    }),
    MatProgressBarModule,
    MatCardModule,
    FormsModule,
    FlexLayoutModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

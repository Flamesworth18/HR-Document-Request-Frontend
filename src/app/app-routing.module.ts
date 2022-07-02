import { AdminEditStatusComponent } from './admin/admin-edit-status/admin-edit-status.component';
import { AdminCreateStatusComponent } from './admin/admin-create-status/admin-create-status.component';
import { AdminStatusComponent } from './admin/admin-status/admin-status.component';
import { PrintCoeWithCompensationComponent } from './admin/print-coe-with-compensation/print-coe-with-compensation.component';
import { AdminDeniedRequestsComponent } from './admin/admin-denied-requests/admin-denied-requests.component';
import { AdminEditDirectorComponent } from './admin/admin-edit-director/admin-edit-director.component';
import { AdminCreateDirectorComponent } from './admin/admin-create-director/admin-create-director.component';
import { AdminDirectorComponent } from './admin/admin-director/admin-director.component';
import { AdminAcceptedRequestsComponent } from './admin/admin-accepted-requests/admin-accepted-requests.component';
import { AdminEditAmountComponent } from './admin/admin-edit-amount/admin-edit-amount.component';
import { AdminCreateAmountComponent } from './admin/admin-create-amount/admin-create-amount.component';
import { AdminAmountComponent } from './admin/admin-amount/admin-amount.component';
import { AdminEditPurposeComponent } from './admin/admin-edit-purpose/admin-edit-purpose.component';
import { AdminCreatePurposeComponent } from './admin/admin-create-purpose/admin-create-purpose.component';
import { AdminPurposeComponent } from './admin/admin-purpose/admin-purpose.component';
import { AdminEditRankComponent } from './admin/admin-edit-rank/admin-edit-rank.component';
import { AdminCreateRankComponent } from './admin/admin-create-rank/admin-create-rank.component';
import { AdminRankComponent } from './admin/admin-rank/admin-rank.component';
import { AdminEditDocumentComponent } from './admin/admin-edit-document/admin-edit-document.component';
import { AdminDocumentComponent } from './admin/admin-document/admin-document.component';
import { PrintCOEComponent } from './admin/print-coe/print-coe.component';
import { EditComponent } from './user/edit/edit.component';
import { AdminCreateDocumentComponent } from './admin/admin-create-document/admin-create-document.component';
import { AdminEditUserComponent } from './admin/admin-edit-user/admin-edit-user.component';
import { AdminCreateUserComponent } from './admin/admin-create-user/admin-create-user.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminRequestComponent } from './admin/admin-request/admin-request.component';
import { CreateComponent } from './user/create/create.component';
import { RequestComponent } from './user/request/request.component';
import { AdminGuard } from './guards/admin.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ResetComponent } from './reset/reset.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  //authentication routes
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot', component: ForgotComponent},
  {path: 'reset', component: ResetComponent},

  //user path
  {path: 'home', component: UserHomeComponent, canActivate: [UserGuard]},
  {path: 'request', component: RequestComponent, canActivate: [UserGuard]},
  {path: 'create', component: CreateComponent, canActivate: [UserGuard]},
  {path: 'edit', component: EditComponent, canActivate: [UserGuard]},


  //admin path
  {path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard]},

  {path: 'admin-request', component: AdminRequestComponent, canActivate: [AdminGuard]},
  {path: 'admin-accepted-request', component: AdminAcceptedRequestsComponent, canActivate: [AdminGuard]},
  {path: 'admin-denied-request', component: AdminDeniedRequestsComponent, canActivate: [AdminGuard]},

  {path: 'admin-user', component: AdminUserComponent, canActivate: [AdminGuard]},
  {path: 'admin-create-user', component: AdminCreateUserComponent, canActivate: [AdminGuard]},
  {path: 'admin-edit-user', component: AdminEditUserComponent, canActivate: [AdminGuard]},
  
  {path: 'admin-director', component: AdminDirectorComponent, canActivate: [AdminGuard]},
  {path: 'admin-create-director', component: AdminCreateDirectorComponent, canActivate: [AdminGuard]},
  {path: 'admin-edit-director', component: AdminEditDirectorComponent, canActivate: [AdminGuard]},

  {path: 'admin-document', component: AdminDocumentComponent, canActivate: [AdminGuard]},
  {path: 'admin-create-document', component: AdminCreateDocumentComponent, canActivate: [AdminGuard]},
  {path: 'admin-edit-document', component: AdminEditDocumentComponent, canActivate: [AdminGuard]},

  {path: 'admin-status', component: AdminStatusComponent, canActivate: [AdminGuard]},
  {path: 'admin-create-status', component: AdminCreateStatusComponent, canActivate: [AdminGuard]},
  {path: 'admin-edit-status', component: AdminEditStatusComponent, canActivate: [AdminGuard]},

  {path: 'admin-rank', component: AdminRankComponent, canActivate: [AdminGuard]},
  {path: 'admin-create-rank', component: AdminCreateRankComponent, canActivate: [AdminGuard]},
  {path: 'admin-edit-rank', component: AdminEditRankComponent, canActivate: [AdminGuard]},
  
  {path: 'admin-purpose', component: AdminPurposeComponent, canActivate: [AdminGuard]},
  {path: 'admin-create-purpose', component: AdminCreatePurposeComponent, canActivate: [AdminGuard]},
  {path: 'admin-edit-purpose', component: AdminEditPurposeComponent, canActivate: [AdminGuard]},
  
  {path: 'admin-amount', component: AdminAmountComponent, canActivate: [AdminGuard]},
  {path: 'admin-create-amount', component: AdminCreateAmountComponent, canActivate: [AdminGuard]},
  {path: 'admin-edit-amount', component: AdminEditAmountComponent, canActivate: [AdminGuard]},

  {path: 'admin-print-ceo', component: PrintCOEComponent, canActivate: [AdminGuard]},
  {path: 'admin-print-ceo-with-compensation', component: PrintCoeWithCompensationComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

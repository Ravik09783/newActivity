import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { VendorComponent } from './vendor/vendor.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ActivityRegisterComponent } from './shared/components/activity-home/activity-register/activity-register.component';

const routes: Routes = [
    
    { path: '', component: HomeComponent },
    
    { path: 'vendor/:slug', component: VendorComponent },
    { path: 'checkout', component: CheckoutComponent },
    {path:'new-url', component:ActivityRegisterComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes, {});
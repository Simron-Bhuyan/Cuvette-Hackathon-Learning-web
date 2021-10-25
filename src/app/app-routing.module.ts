import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CartComponent} from "./components/cart/cart.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ProductComponent} from "./components/product/product.component";
import {ThankyouComponent} from "./components/thankyou/thankyou.component";
import { FooterComponent } from './components/footer/footer.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '', 
    redirectTo: '/home', 
    pathMatch:'full'
  },
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'register', 
    component: RegisterComponent
  },
  {
    path: 'product', 
    canActivate: [AuthGuard],
    component: ProductComponent
  },
  {
    path: 'cart', 
    canActivate: [AuthGuard],
    component: CartComponent
  },
  {
    path: 'checkout', 
    canActivate: [AuthGuard],
    component: CheckoutComponent

  },
  {
    
    path: 'thankyou', 
    canActivate: [AuthGuard],
    component: ThankyouComponent

  },
  {
    path: 'footer', 
    canActivate: [AuthGuard],
    component: FooterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

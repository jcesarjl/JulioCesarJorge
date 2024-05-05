import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InterceptorService } from './core/interceptors/interceptor.service';
import { ProductsComponent } from './routes/pages/products/products.component';
import { NewProductsComponent } from './routes/pages/new-products/new-products.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SearchProductPipe } from './routes/pipes/search-product.pipe';
import { ModalConfirmComponent } from './shared/components/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NewProductsComponent,
    HeaderComponent,
    SearchProductPipe,
    ModalConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

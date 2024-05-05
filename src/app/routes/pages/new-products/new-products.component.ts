import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent implements OnInit{
  
  errorForm:string = '';
  formProducto: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg', [Validators.required]],
    date_release: ['', [Validators.required, this.fechaActualValidator]],
    date_revision: [new Date().toISOString().slice(0, 10), [Validators.required, this.fechaRevisionValidator]]
  });
  constructor(private fb:FormBuilder, private productService: ProductsService,
    private route: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const objetoDatos = params;
    
    });
  }

  guardarProducto(){
    if(this.formProducto.valid){
      this.productService.addProduct(this.formProducto.value)
        .subscribe((resp) =>{
          this.alertaForm("Se guardó correctamente!");
          this.resetForm();
        },
        (error) => {
          this.alertaForm("Error al guardar el formulario, verifique sus campos!");
        }
      );
    }else{
      this.alertaForm("Verifique sus campos, algunos estan vacios!");

    }
  }

  resetForm(){
    this.formProducto.reset({
      date_revision: new Date().toISOString().slice(0, 10),
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg'
    });
  }

  fechaActualValidator(control:any) {
    const fechaActual = new Date();
    const fechaIngresada = new Date(control.value);
    return fechaIngresada >= fechaActual ? null : { fechaActualInvalida: true };
  }

  fechaRevisionValidator(control:any) {
    const fechaLiberacion = new Date(control.parent?.get('fecha_liberacion').value);
    const fechaRevision = new Date(control.value);
    const unAnio = 365 * 24 * 60 * 60 * 1000; // Un año en milisegundos
    return fechaRevision.getTime() - fechaLiberacion.getTime() === unAnio ? null : { fechaRevisionInvalida: true };
  }

  alertaForm(mensaje: string){
    this.errorForm = mensaje;
    setTimeout(() => {
      this.errorForm = '';
    }, 4000);
  }

}

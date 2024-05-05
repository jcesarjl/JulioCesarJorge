import { Component, OnInit, ViewChild } from '@angular/core';
import { Products } from '../../interfaces/products';
import { ProductsService } from '../../services/products.service';
import { Subject, debounceTime } from 'rxjs';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  listadoProductos: Products[] = [];
  productosFiltrados: Products[] = [];
  elementosPorPagina: number = 5;
  currentPage: number = 1; 
  terminoBusqueda: string = '';
  showPopup: boolean[] = [];
  errorForm: string = '';
  loading:boolean = false;

  @ViewChild(ModalConfirmComponent) modalComponent!: ModalConfirmComponent; // Importa el componente modal


  constructor(private productService: ProductsService, private router: Router){}
  
  ngOnInit(): void {
    this.consultarProductos();
  }

  consultarProductos(){
    this.loading = true;
    this.productService.listProducts()
      .subscribe((resp)=>{
        this.listadoProductos = resp;
        this.loading = false;
      });
  }
  onChangeElementosPorPagina(event: any) {
    this.elementosPorPagina = event.target.value;
    this.currentPage = 1;
  }

  getPaginasTotales(): number {
    return Math.ceil(this.listadoProductos.length / this.elementosPorPagina);
  }
  getPaginas(): number[] {
    const paginas: number[] = [];
    for (let i = 1; i <= this.getPaginasTotales(); i++) {
      paginas.push(i);
    }
    return paginas;
  }

  cambiarPagina(pagina: number) {
    this.currentPage = pagina;
  }

  getListaPaginada(): Products[] {
    const inicio = (this.currentPage - 1) * this.elementosPorPagina;
    return this.listadoProductos.slice(inicio, inicio + this.elementosPorPagina);
  }
  buscarProducts(event: any){
    this.terminoBusqueda = event.target.value;
  }

  togglePopup(index: number) {
    this.showPopup[index] = !this.showPopup[index]; // Alternar el estado del popup correspondiente al índice
  }
  editProduct(product: Products, index:number){
    this.router.navigate(['/nuevo-producto', product]);
  }

  deleteProduct(product: Products, index:number){
    this.modalComponent.mostrarModal(`¿Esta seguro de eliminar el producto: ${product.name} ?`, product.id);
    this.showPopup[index] = !this.showPopup[index];
  }

  onConfirmado(id: any) {
    this.productService.deleteProduct(id)
      .subscribe((resp:string) =>{
        console.log(resp);
        const index = this.listadoProductos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.listadoProductos.splice(index, 1);
        }
        this.alertaForm('Producto eliminado correctamente.');
      },
      (error)=>{
        console.log(error);
        const index = this.listadoProductos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.listadoProductos.splice(index, 1);
        }
        this.alertaForm('Producto eliminado correctamente.');
      }
    );
  }
  alertaForm(mensaje: string){
    this.errorForm = mensaje;
    setTimeout(() => {
      this.errorForm = '';
    }, 4000);
  }
}

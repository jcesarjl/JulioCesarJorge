import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/products';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(listadoProductos: Products[], texto: string): Products[] {
    if(!texto) return listadoProductos;

    return listadoProductos.filter(item =>
      (item.name.toUpperCase().includes(texto.toUpperCase())
    ));
  }

}

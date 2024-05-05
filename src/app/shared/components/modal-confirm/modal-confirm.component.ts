import { Component, EventEmitter, OnInit, Output  } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {
  
  showModal: boolean = false;
  mensaje: string = '';
  id: string = '';
  @Output() confirmado: EventEmitter<string> = new EventEmitter<string>(); 

  constructor() { }

  ngOnInit(): void {
  }

  // Método para mostrar la ventana modal con un mensaje específico
  mostrarModal(mensaje: string, id: string) {
    this.id = id;
    this.mensaje = mensaje;
    this.showModal = true;
  }

  ocultarModal() {
    this.showModal = false;
  }

  // Método para confirmar la acción
  confirmar() {
    this.confirmado.emit(this.id);
    this.ocultarModal();
  }
  cancelar() {
    // Aquí implementa la lógica para cancelar la acción
    this.ocultarModal();
  }
}
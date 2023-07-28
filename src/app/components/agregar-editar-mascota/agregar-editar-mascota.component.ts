import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent {
  loading: boolean = false;
  form22: FormGroup;

  constructor(private fb: FormBuilder, private _mascotaService: MascotaService){
    this.form22 = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color : ['', Validators.required],
      edad : ['', Validators.required],
      peso : ['', Validators.required]
    })
  }

  agregarMascota(){
    /*const nombreTS = this.form22.get('nombre')?.value;                  Dos maneras de agarrar el nombre que se ejectuca cuando
    const nombreTS = this.form22.value.nombre;                            damos aceptar en el formulario */

    //Armamos el objeto
    const mascota: Mascota = {
      nombre: this.form22.get('nombre')?.value,
      raza: this.form22.value.raza,
      edad: this.form22.value.edad,
      peso: this.form22.get('peso')?.value,
      color: this.form22.get('color')?.value,
    }
    
      //Enviamos objeto al back-end   
      this._mascotaService.addMascota(mascota).subscribe(data => {
        console.log(data);
    })
  
  }

}

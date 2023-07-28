import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';


@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements AfterViewInit {

  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>();
  loading: boolean = false;

  @ViewChild(MatPaginator)
  private _paginator!: MatPaginator;
  public get paginator(): MatPaginator {
    return this._paginator;
  }
  public set paginator(value: MatPaginator) {
    this._paginator = value;
  }
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _mascotaService:MascotaService) {}   //Los servicios llevan _ al principio, esto como una buena practica

  ngOnInit(){
    this.obtenerMascotas();
  }

  obtenerMascotas(){
    this._mascotaService.getMascotas().subscribe(data => {
      this.dataSource.data = data;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
  }

  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarMascota(id: number) {
    this.loading = true;

    this._mascotaService.delMascota(id).subscribe(() => {
     this.mensajeExito();
     this.loading = false;
     this.obtenerMascotas();
    });    
  }
  mensajeExito(){
    this._snackBar.open('Se eliminó correctamente', '', {duration: 3000, horizontalPosition:'right'}, );
  }

}

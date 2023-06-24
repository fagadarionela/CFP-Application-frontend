import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Disease} from "../models/disease";
import {DiseaseService} from "../services/disease.service";
import {MatDialog} from "@angular/material/dialog";
import {AddDiseaseModalComponent} from "../modals/add-disease-modal/add-disease-modal.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SuccessModalComponent} from "../modals/success-modal/success-modal.component";
import {ErrorModalComponent} from "../modals/error-modal/error-modal.component";

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DiseasesComponent implements AfterViewInit{
  displayedColumns: string[] = ['name', 'clinicalSigns', 'differentialDiagnosis', 'therapeuticPlan', 'star'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

  expandedElement: Disease | null;

  dataSource: MatTableDataSource<Disease>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private diseasesService: DiseaseService, private dialog: MatDialog) {
    this.diseasesService.getAllDiseasesInfo().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
    this.dialog.open(AddDiseaseModalComponent);
  }

  deleteDisease(username: string) {
    console.log(username);
    this.diseasesService.deleteDisease(username).subscribe(
      () => this.dialog.open(SuccessModalComponent, {data: `The diagnosis was successfully deleted!`})
        .afterClosed().subscribe(() => window.location.reload()),
      (error) => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `There was an error when deleting the diagnosis!`})
          .afterClosed().subscribe(() => window.location.reload())
      }
    )
  }
}

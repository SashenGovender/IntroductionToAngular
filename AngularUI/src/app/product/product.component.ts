import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { Product } from '../models/product';
import { AngularUiApiService } from '../services/angularuiapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private angularUiApi: AngularUiApiService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(ProductDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllProducts();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllProducts() {
    this.angularUiApi.getAllProducts().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.log(error)
    });
  }

  editProduct(row: Product) {
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllProducts();
      }
    });
  }

  deleteProduct(id: number){
    if(!confirm("Are you sure?")){
      return;
    }

    this.angularUiApi.deleteProduct(id).subscribe({
      next: (result) => {
        this.matSnackBar.open("Product deleted successfully","",{
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snack-style-delete"]
        });
        
        this.getAllProducts();
      },
      error: (error) => alert("Error while deleting")
    });
  }

}

import { Product } from './../models/product';
import { AngularUiApiService } from './../services/angularuiapi.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public freshnessList: Array<string> = ["Brand New", "Second Hand", "Refurbished"];
  public productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private angularUiApi: AngularUiApiService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      let product = new Product(
        this.productForm.get('productName')?.value,
        this.productForm.get('category')?.value,
        this.productForm.get('freshness')?.value,
        this.productForm.get('price')?.value,
        this.productForm.get('comment')?.value,
        this.productForm.get('date')?.value
      );

      this.angularUiApi.postProduct(product).subscribe({
        next: (result) => {
          alert("Product added successfully");
          this.productForm.reset();
          this.dialogRef.close();
        },
        error: (result) => alert(`Error - ${result}`),
      });
    }

  }
}



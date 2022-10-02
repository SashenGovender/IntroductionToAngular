import { Product } from './../models/product';
import { AngularUiApiService } from './../services/angularuiapi.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public freshnessList: Array<string> = ["Brand New", "Second Hand", "Refurbished"];
  public productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private angularUiApi: AngularUiApiService, private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: Product) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
      comment: ['', Validators.required],
    });

    if(this.editData){
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct() {
    if (this.productForm.valid) {
      let product = this.CreateProductFromForm();

      this.angularUiApi.postProduct(product).subscribe({
        next: (result) => {
          alert("Product added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error: (result) => alert(`Error - ${result}`),
      });
    }
  }

  updateProduct() {
    if (this.productForm.valid) {
      let product = this.CreateProductFromForm();

      this.angularUiApi.updateProduct(this.editData.id, product).subscribe({
        next: (result) => {
          alert("Product edited successfully");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: (result) => alert(`Error - ${result}`),
      });
    }
  }

  private CreateProductFromForm() : Product {
    let product = new Product(
      this.productForm.get('productName')?.value,
      this.productForm.get('category')?.value,
      this.productForm.get('freshness')?.value,
      this.productForm.get('price')?.value,
      this.productForm.get('comment')?.value,
      this.productForm.get('date')?.value
    );
    return product;
  }
}



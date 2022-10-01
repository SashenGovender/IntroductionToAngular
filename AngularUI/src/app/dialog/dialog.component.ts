import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public freshnessList: Array<string> = ["Brand New", "Second Hand", "Refurbished"];
  public productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category :  ['', Validators.required],
      freshness :  ['', Validators.required],
      price :  ['', Validators.required],
      comment :  ['', Validators.required],
      date :  ['', Validators.required],
    } );
  }

  addProduct(){
    console.log(this.productForm.value);
  }

}

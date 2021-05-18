import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  createForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private crudService: CrudService
  ) {}

  ngOnInit() {
    this.createForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });

    //todo create
    // this.onCreateForm();
  }

  onCreateSubmit() {
    this.crudService.createData(this.createForm.value)
    this.router.navigate(['user']);
    this.createForm.reset();
  }

onCancel() {
  this.router.navigate(['/user'])
}
  
}

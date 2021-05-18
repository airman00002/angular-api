import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { postData } from '../data.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  editForm!: FormGroup;
  id!: number;
  data_Id!: postData[];

  constructor(
    private crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.initForm();
  }

  onEditSubmit() {
    this.crudService.updateData(this.id, this.editForm.value);
    this.router.navigate(['user']);
    this.editForm.reset();
  }

  onCancel() {
    this.router.navigate(['/user']);
  }

  private initForm() {
    this.crudService.getDataById(this.id).subscribe(
      (data) => {
        console.log(data);
        // const data_Id = this.crudService.getDataById(this.id);
        // let image = this.data_Id;
        // let name = data_Id.name;
        // let description = data_Id.description;
      },
      (error) => {
        // console.log(error.message);
      }
    );
    this.editForm = new FormGroup({
      image: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  editForm!: FormGroup;
  id!: number;

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
    const data_Id = this.crudService.getDataById(this.id);
    let image = data_Id.image;
    let name = data_Id.name;
    let description = data_Id.description;

    this.editForm = new FormGroup({
      image: new FormControl(image, Validators.required),
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
    });
  }
}

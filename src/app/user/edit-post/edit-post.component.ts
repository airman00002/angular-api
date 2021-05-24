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
      (data: any) => {
        console.log(data);
        this.editForm = new FormGroup({
          image: new FormControl(data.image, Validators.required),
          name: new FormControl(data.name, Validators.required),
          description: new FormControl(data.description, Validators.required),
        });
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
}

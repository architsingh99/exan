import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {QuizService} from './../services/quiz.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

	formData: FormGroup;

	constructor(public appService: QuizService, public cd: ChangeDetectorRef, public router: Router) {
		this.formData = new FormGroup({
			email: new FormControl("", [Validators.required]),
			password: new FormControl("", [Validators.required])
		})
	 }

	 ngOnInit(): void {
		this.reloadPage();
	  }

	  reloadPage() {
		//window.location.reload();
	 }

	ngAfterViewInit() { 
		
	}

	async onSubmit() {
		if(this.formData.invalid) {
			Swal.fire('Error', "Kindly fill up the required fields.", 'error');
		}
		else {
			let status = await this.appService.login({
				mobile: this.formData.value.email,
				uid: this.formData.value.password,
			}).toPromise().then((res: any) => {
				console.log("res :: ", res)
				if(res.success)
				{
					sessionStorage.setItem('userInfo', JSON.stringify(res.user));
					this.cd.detectChanges();
					return true;
					
				}
			},
			err => {
				console.log("err :: ", err)
				Swal.fire('Error', err.error.message, 'error');
				return false;
		  })
		   if(status)
		   	this.router.navigate(['/quiz'])
		}
	}

}

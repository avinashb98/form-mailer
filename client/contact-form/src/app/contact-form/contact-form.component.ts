import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  formDetails = {
    name: '',
    gender: '',
    ageGroup: '',
    deliveredBy: '',
    comfortability: '',
    otherSpecifications: ''
  };

  formStatus = 'not submitted';
  onSubmit() {
    this.formStatus = 'submitting';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.http.post('http://localhost:3000/', this.formDetails, httpOptions)
      .subscribe(msg => {
          this.formStatus = 'submitted';
      });
  }

  get diagnostic() { return JSON.stringify(this.formDetails); }

}

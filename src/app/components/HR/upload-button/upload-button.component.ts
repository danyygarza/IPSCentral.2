import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { CrearEquiposComponent } from 'src/app/components/HR/crear-equipos/crear-equipos.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavbarComponent } from 'src/app/components/shared/navbar/navbar.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css']
})


export class UploadButtonComponent implements OnInit {
  public fileUploadForm: HTMLFormElement;
  public hasUpload: boolean = false;

  constructor(
    private dialogRef:  MatDialogRef<UploadButtonComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private uploadFileInfo : AppComponent,
    private fileInfo : CrearEquiposComponent,
    private fileRedirect: NavbarComponent) 
    {
      this.fileUploadForm = data.fileUploadForm;
   }
   

  ngOnInit(): void {
  }

  closeMe() {
    this.dialogRef.close();
  }

  async onSubmit() {

    const fData = new FormData();
    fData.append('excel', this.fileUploadForm['get']('myfile').value);

    this.http
      .post<any>('http://localhost:8080/api/upload', fData).subscribe(response => {
        console.log("post hr file success");
      }, error => {
        console.log(error);
      }
    );

    this.closeMe();
    this.uploadFileInfo.setHasUpload();
    this.fileRedirect.navigate('/consultar-equipos');
    
    // this.hasUpload = true;
    
    //this.fileRedirect.navbarFileUpload();
    //this.fileRedirect.cleanNavbar();
    //this.fileRedirect.setFirstFile();
    
    //console.log("onSubmit() consultTeams",this.fileRedirect.getConsultTeams());
    
    
  }

}

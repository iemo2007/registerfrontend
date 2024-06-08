import { Governate } from './../../models/governate.model';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { City } from 'src/app/models/city.model';
import { LoaderService } from 'src/app/services/loader.service';
import { RegisterService } from 'src/app/services/register.service';
import { ageValidator } from 'src/app/shared/validators/age.validator';
import { lettersAndSpacesValidator } from 'src/app/shared/validators/letters-and-spaces.validator';
import { mobileNumberValidator } from 'src/app/shared/validators/mobile-number.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isLoading:boolean = false;

  constructor(private registerService: RegisterService, private fb: FormBuilder, private router: Router, private loaderService: LoaderService) {

  }

  registerForm: FormGroup = new FormGroup({});
  governates: Governate[] = [];
  governateCities: City[][] = [];
  errorMessage: string = "";

  ngOnInit(): void {

    this.loaderService.isLoading.subscribe((v) => {
      this.isLoading = v;
    })

    this.registerService.getGovernatesWithCities()
    .subscribe((data: Governate[]) => {
      this.governates = [...data];
      console.log(this.governates);
    });

    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      'firstName': new FormControl(null, [Validators.required, Validators.maxLength(20), lettersAndSpacesValidator()]),
      'middleName': new FormControl(null, [Validators.maxLength(40), lettersAndSpacesValidator()]),
      'lastName': new FormControl(null, [Validators.required, Validators.maxLength(20), lettersAndSpacesValidator()]),
      'birthDate': new FormControl(null, [Validators.required, ageValidator(20)]),
      'mobileNumber': new FormControl(null, [Validators.required, mobileNumberValidator()]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'addresses': new FormArray([this.newAddress()])
    });
  }

  newAddress(): FormGroup {
    return new FormGroup({
      'governateId': new FormControl(null, Validators.required),
      'cityId': new FormControl(null, Validators.required),
      'street': new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      'buildingNumber': new FormControl(null, Validators.required),
      'flatNumber': new FormControl(null, Validators.required)
    });
  }

  getAddressControls() {
    return (<FormArray>this.registerForm.get('addresses')).controls;
  }

  addAddress() {
    (<FormArray>this.registerForm.get('addresses')).push(this.newAddress());
    this.governateCities.push([]);
  }

  removeAddress(index: number) {
    (<FormArray>this.registerForm.get('addresses')).removeAt(index);
    this.governateCities.splice(index, 1);
  }

  getValidationErrors(input: string, name: string) {
    var inputControl = this.registerForm.get(input);
    
    return this.getValidations(inputControl, name);
    // let errorMessage = '';

    // if(inputControl && inputControl.touched && inputControl.errors) {
    //   if(inputControl?.hasError('required')) 
    //     errorMessage += `${name} is required`;
    //   else if(inputControl?.hasError('minlength'))
    //     errorMessage += `Minimum no. of charachters is: ${inputControl.errors['minlength'].requiredLength}`;
    //   else if(inputControl?.hasError('maxlength'))
    //     errorMessage += `Maximum no. of charachters is: ${inputControl.errors['maxlength'].requiredLength}`;
    //   else if(inputControl?.hasError('lettersAndSpaces'))
    //     errorMessage += `Only letters & spaces are allowed`;
    //   else if(inputControl?.hasError('ageInvalid'))
    //     errorMessage += `Only 20 years or older are allowed to register`;
    //   else if(inputControl?.hasError('invalidMobileNumber'))
    //     errorMessage += `Invalid format. The format should be exactly like that: +201xxxxxxxxx`;
    //   else if(inputControl?.hasError('email'))
    //     errorMessage += `Inavalid E-mail format`;
    // } 

    // return errorMessage;

  }


  getRepeatedValidationErrors(input: string, name: string, index: number) {
    var inputControl = this.registerForm.get('addresses')?.get([index])?.get(input);
    return this.getValidations(inputControl, name);
  }

  getValidations(inputControl: any, name: string) {
    let errorMessage = '';

    if(inputControl && inputControl.touched && inputControl.errors) {
      if(inputControl?.hasError('required')) 
        errorMessage += `${name} is required`;
      else if(inputControl?.hasError('minlength'))
        errorMessage += `Minimum no. of charachters is: ${inputControl.errors['minlength'].requiredLength}`;
      else if(inputControl?.hasError('maxlength'))
        errorMessage += `Maximum no. of charachters is: ${inputControl.errors['maxlength'].requiredLength}`;
      else if(inputControl?.hasError('lettersAndSpaces'))
        errorMessage += `Only letters & spaces are allowed`;
      else if(inputControl?.hasError('ageInvalid'))
        errorMessage += `Only 20 years or older are allowed to register`;
      else if(inputControl?.hasError('invalidMobileNumber'))
        errorMessage += `Invalid format. You need to enter 9 digits`;
      else if(inputControl?.hasError('email'))
        errorMessage += `Inavalid E-mail format`;
    } 

    return errorMessage;
  }
  onOptionSelected(event: Event, index: number) {
    const selectElement = event.target as HTMLSelectElement;
    const foundGovernate = this.findGovernateById(selectElement.value);
    if(foundGovernate && foundGovernate.cities) {
      this.governateCities[index] = foundGovernate.cities;
    } else {
      this.governateCities[index] = [];
    }
    // console.log('this.governateCities');
    // console.log(this.governateCities);
  }

  findGovernateById(id: string): Governate | undefined {
    return this.governates.find(governate => governate.id === id);
  }

  register() {
    this.errorMessage = "";
    let account: Account = this.registerForm.value;
    account.mobileNumber = `+201${account.mobileNumber}`;
    this.registerService.createAccount(account)
    .subscribe(
      (response) => {
        // Handle successful response
        this.registerForm.reset();
        this.router.navigate(["/register-success"]);
      },
      (error) => {
          // Handle error response
          this.errorMessage = error.error.message;
      }
    )
  }
}

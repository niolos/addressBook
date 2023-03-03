import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ParishesService } from '../Services/parishes.service';
import { Parish } from '../Models/parish';
import { Address } from '../Models/address';
import { AddressService } from '../Services/address.service';
import { MapInterface } from '../Models/map.interface';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {


  @ViewChild('inputField')
  inputField!: ElementRef;
  

  @Output() placeChanged = new EventEmitter<MapInterface>();

  constructor(private router: Router, private parishService: ParishesService, private addressService:AddressService, private ngZone:NgZone) { }
  


  updateAddress = new FormGroup({
    address_1: new FormControl('',(Validators.required)),
    address_2: new FormControl('',(Validators.required)),
    city: new FormControl('',(Validators.required)),
    parish: new FormControl('',(Validators.required)),
    user_id:new FormControl()
  })

  parishes!:Parish[]
  getAddress!: Address
  parish: string | undefined
  fromValue: MapInterface | undefined
  toValue: MapInterface | undefined
  autocomplete: google.maps.places.Autocomplete|undefined


  ngAfterViewInit(){
    let address_line1:string|null
    let city:string|null

    var options = {
      componentRestrictions: {country: "jm"}
     };

     this.autocomplete= new google.maps.places.Autocomplete(this.inputField.nativeElement, options)

    this.autocomplete.addListener('place_changed', ()=>{
      const place = this.autocomplete?.getPlace();
      const result : MapInterface={
        address: this.inputField.nativeElement.value,
        location: place?.geometry?.location,
        iconUrl: place?.icon,
      }

      //this updates the map after the place changes with the from value from the html 
      this.fromValue = result


      console.log(place?.address_components);
      // console.log(result.address.split(', ')[0]);
      // // this.testAddress1= result.address.split(', ')[1];


      console.log("results info",result);



      for (const component of place?.address_components as google.maps.GeocoderAddressComponent[]) {
        const componentType = component.types[0];
      
        switch (componentType) {
          case "street_number": {
            address_line1 = `${component.long_name} `;
            break;
          }
    
          case "route": {
            address_line1 += component.short_name;
            break;
          }
    
          case "locality":{
            city =`${component.long_name}`
          }
        }
      }
      this.updateAddress.controls['address_1'].setValue(address_line1)
      this.updateAddress.controls['city'].setValue(city)
      
      this.ngZone.run(()=>{
        this.placeChanged.emit(result)
      })
    })
  }

  

  errorRes:any;
  editAddress(){
    if(this.updateAddress.controls['address_1'].hasError('required')||this.updateAddress.controls['address_2'].hasError('required')||this.updateAddress.controls['city'].hasError('required')||this.updateAddress.controls['parish'].hasError('required')){
      Swal.fire({
        icon:"error",
        title:"Form fields cannot be empty"
      })
      this.router.navigate(['/update-address'])
    }else{
      let id = sessionStorage.getItem('addressId')
      if(id){
        console.log("this is the details",this.updateAddress.value);
        // let indexParish = this.parishes.filter(parish => parish.parishName == this.updateAddress.value.parish)[0]
        
        // // this.updateAddress.value.parish = indexParish._id;
        // this.updateAddress.controls['parish'].setValue(indexParish._id);
      
        
      this.addressService.updateAddress(id, this.updateAddress.value as any).subscribe({
        next:(res)=>{
         this.errorRes = res.error;
        console.log(res, "LOL")
        if (res.status === 201 || res.status === 200) {

          
        }
        Swal.fire({
          icon: 'success',
          title: "Update Successful",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/list-address'])

        },
        error:(err)=>{
          alert(err)
        }
      })
      console.log('subscriber info retrieved')
      }else{
        Swal.fire({
          icon: 'error',
          title: this.errorRes +" Update failed",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/UNKNOWN ERROR'])
      }
    }
  }

  getAllParishes(){
    this.parishService.getParishes().subscribe((getParishes)=>{
      this.parishes = getParishes.data
      console.log("parishes",this.parishes)
    })
  }

getAddrressById(){
  
  let id =sessionStorage.getItem('addressId')
  
  if(id){
    this.addressService.getAddressbyId(id).subscribe(resp=>{

      this.getAddress =resp.data
      this.updateAddress =new FormGroup({
        address_1: new FormControl(resp.data.address_1,(Validators.required)),
        address_2: new FormControl(resp.data.address_2,(Validators.required)),
        city: new FormControl(resp.data.city,(Validators.required)),
        parish: new FormControl(resp.data.parish,(Validators.required)),
        user_id:new FormControl(resp.data.user_id)
      })
      let indexParish = this.parishes.filter(parish => parish.parishName == this.updateAddress.value.parish)[0]

        
      // this.updateAddress.value.parish = indexParish._id;
      this.updateAddress.controls['parish'].setValue(indexParish._id);
    })
  }
}


  ngOnInit(): void {
    console.log(sessionStorage)
  
    this.getAllParishes()
    let id =sessionStorage.getItem('addressId')
    if(id){
      this.addressService.getAddressbyId(id).subscribe(resp=>{
        this.getAddress =resp.data
        console.log("this address",this.getAddress)
        this.updateAddress =new FormGroup({
          address_1: new FormControl(resp.data.address_1,(Validators.required)),
          address_2: new FormControl(resp.data.address_2,(Validators.required)),
          city: new FormControl(resp.data.city,(Validators.required)),
          parish: new FormControl(resp.data.parish,(Validators.required)),
          user_id:new FormControl(resp.data.user_id)
        })
        this.parish = resp.data.parish
    })
  }
  
    this.getAddrressById()
    
  }
}

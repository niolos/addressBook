import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ParishesService } from '../Services/parishes.service';
import { Parish } from '../Models/parish';
import { Address } from '../Models/address';
import { AddressService } from '../Services/address.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent {

  constructor(private router: Router, private parishService: ParishesService, private addressService:AddressService) { }
  


  updateAddress = new FormGroup({
    address_1: new FormControl('',(Validators.required)),
    address_2: new FormControl('',(Validators.required)),
    city: new FormControl('',(Validators.required)),
    parish: new FormControl('',(Validators.required)),
    user_id:new FormControl()
  })

  parishes!:Parish[]
  updateUser!: FormGroup
  getAddress!: Address

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
      this.addressService.updateAddress(id, this.updateAddress.value as any).subscribe({
        next:(res)=>{
          Swal.fire({
            icon: 'success',
            title: 'Update Successful',
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
        this.router.navigate(['list-address'])
      }
    }
  }

  getAllParishes(){
    this.parishService.getParishes().subscribe((getParishes)=>{
      this.parishes = getParishes.data
      console.log("parishes",this.parishes)
    })
  }



  ngOnInit(): void {
    this.getAllParishes()
    let id =sessionStorage.getItem('addressId')
    if(id){
      this.addressService.getAddressbyId(id).subscribe(resp=>{
        this.getAddress =resp.data
        console.log(this.getAddress)
        this.updateAddress =new FormGroup({
          address_1: new FormControl(resp.data.address_1,(Validators.required)),
          address_2: new FormControl(resp.data.address_2,(Validators.required)),
          city: new FormControl(resp.data.city,(Validators.required)),
          parish: new FormControl(resp.data.parish,(Validators.required)),
          user_id:new FormControl(resp.data.user_id)
        })
    })
  }
    this.initAutocomplete()
  }

  initAutocomplete(){
    const map= new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center:{lat: 18.00495, lng:-76.77971},
        zoom:18,
        mapTypeId:"roadmap"
      }
    );
    const search_input = document.getElementById("address") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(search_input);
    
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(search_input);

    map.addListener("bounds_change",()=>{
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds)
    });

    let markers: google.maps.Marker[] = [];

    searchBox.addListener("places_changed", ()=>{
      const places = searchBox.getPlaces();
      if(places?.length == 0){
        return;
      }
      markers.forEach((marker)=>{
        marker.setMap(null);
      });
      markers=[];
      const bounds = new google.maps.LatLngBounds();

      places?.forEach((place)=>{
        if(!place.geometry || !place.geometry.location){
          console.log("returned place does not contain geometry")
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
  
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title:place.name,
            position:place.geometry.location,
          })
        );
        if(place.geometry.viewport){
          bounds.union(place.geometry.viewport);
        }
        else{
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }


}

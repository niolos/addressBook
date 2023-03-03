import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ParishesService } from '../Services/parishes.service';
import { Parish } from '../Models/parish';
import { AddressService } from '../Services/address.service';
import { Address } from '../Models/address';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  parishes!:Parish[]
  userId=this.userService.getProfile

  constructor(private router: Router, private parishService:ParishesService, private addressService: AddressService, private userService:UserService) { }


  createAddress = new FormGroup({
    address_1: new FormControl('',(Validators.required)),
    address_2: new FormControl('',(Validators.required)),
    city: new FormControl('',(Validators.required)),
    parish: new FormControl('',(Validators.required)),
    user_id: new FormControl()
  })

  newAddress(){
    const formInput = this.createAddress.value as Partial<Address>
    
    // this.userService.getProfile()
    if(this.createAddress.controls['address_1'].hasError('required')||this.createAddress.controls['address_2'].hasError('required')||this.createAddress.controls['city'].hasError('required')||this.createAddress.controls['parish'].hasError('required')){
      Swal.fire({
        icon:"error",
        title:"Form fields cannot be empty"
      })
      this.router.navigate(['/add-address'])
    }else{
      this.addressService.createNewAddress(formInput).subscribe({
        next:(res)=>{
          if (res.status === 201 || res.status ===200) {

            
          }

          console.log("response",res)
          Swal.fire({
            title:"Address successfully created",
            icon: 'success',
          })
          this.router.navigate(['/list-address'])
        },
        error:(err)=>{
          throw err
        }
      })
      console.log('address created')
    }
  }

  getAllParishes(){
    this.parishService.getParishes().subscribe((getParishes)=>{
      this.parishes = getParishes.data
      console.log("parishes",this.parishes)
    })
  }

  ngOnInit(): void {
    this.userService.getProfile()
    this.getAllParishes()
    
    this.createAddress = new FormGroup({
      address_1: new FormControl('',(Validators.required)),
      address_2: new FormControl('',(Validators.required)),
      city: new FormControl('',(Validators.required)),
      parish: new FormControl('',(Validators.required)),
      user_id: new FormControl(this.userService.decodedToken.id)

    })
    // if(!navigator.geolocation){
    //   console.log("location is not supported");
    // }
    // navigator.geolocation.getCurrentPosition((position)=>{
    //   console.log(`latitude ${position.coords.latitude}, longitude ${position.coords.longitude}`)
      
    // })

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
  

  

 

  
  // display: any;
  //   center: google.maps.LatLngLiteral = {
  //       lat: 18.00495, 
  //       lng: -76.77971
  //   };
  //   zoom = 18;
  //   moveMap(event: google.maps.MapMouseEvent) {
  //       if (event.latLng != null) this.center = (event.latLng.toJSON());
  //   }
  //   move(event: google.maps.MapMouseEvent) {
  //       if (event.latLng != null) this.display = event.latLng.toJSON();
  //   }

  
}
declare global {
  interface Window {
    initAutocomplete: () => void;
  }
}

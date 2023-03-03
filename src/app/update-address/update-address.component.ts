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
export class UpdateAddressComponent {


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
  updateUser!: FormGroup
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

import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../Services/address.service';
import { Address } from '../Models/address';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-address',
  templateUrl: './display-address.component.html',
  styleUrls: ['./display-address.component.css']
})
export class DisplayAddressComponent {
  
  constructor(private addressService:AddressService, private userService:UserService, private route:Router){}

  address!: Address[]


  getAllAddresses():void{
    this.userService.getProfile()

    this.addressService.getAddress(this.userService.decodedToken.id).subscribe((getAddresses)=>{
      this.address = getAddresses.data
    })
  }

  delete_address(id:string): void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.addressService.deleteAddress(id).subscribe({
          next:(res)=>{
            this.getAllAddresses()
          },
          error:()=>{
            alert("Error while deleting the address")
          }
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }

  updateAddress(id:string){
    sessionStorage.setItem("addressId",id);
    this.route.navigate(['/update-address'])
  }


  ngOnInit(): void {
    this.getAllAddresses()
  }
}

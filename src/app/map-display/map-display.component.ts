import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapInterface } from '../Models/map.interface';
import { GoogleMap, GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { map } from 'rxjs';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.css']
})
export class MapDisplayComponent {

  @ViewChild('map', {static:true})
  map!:GoogleMap
  

    @Input() from: MapInterface | undefined;
    @Input() to: MapInterface |undefined;

  constructor(private directionService: MapDirectionsService){}
  
  zoom=5
  directionsResult: google.maps.DirectionsResult | undefined
  marker: google.maps.LatLng | undefined

ngOnChanges(){
  const fromLocation = this.from?.location;
  const toLocation = this.to?.location;
  if(fromLocation && toLocation){
    this.getDirections(fromLocation, toLocation)
  }
  else if(fromLocation){
    this.goToLocation(fromLocation)
  }
}

goToLocation(location: google.maps.LatLng){
  this.marker = location
  this.map.panTo(location)
  this.zoom=19;
  this.directionsResult=undefined
}

getDirections(from:google.maps.LatLng, to:google.maps.LatLng){
  const request:google.maps.DirectionsRequest={
    origin:from,
    destination:to,
    travelMode:google.maps.TravelMode.DRIVING
  };
  this.directionService.route(request).pipe(
    map(res=>res.result)
  ).subscribe((result)=>{
    this.directionsResult=result
    this.marker =undefined
  })
}

ngOnInit(){}

}

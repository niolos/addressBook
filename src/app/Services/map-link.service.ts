import { Injectable } from '@angular/core';
import { MapInterface } from '../Models/map.interface';

@Injectable({
  providedIn: 'root'
})
export class MapLinkService {

  constructor() { }

  fromValue: MapInterface | undefined
}

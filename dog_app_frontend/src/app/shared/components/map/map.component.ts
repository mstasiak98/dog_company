import { Component, Input, OnInit } from '@angular/core';
import { AddressParameters } from '../../models/AddressParameters';
import { NominatimService } from '../../services/nominatim/nominatim.service';
import { MapPoint } from '../../models/MapPoint';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  options: any;

  overlays: any[];

  @Input()
  addressParams: AddressParameters;

  mapPoint: MapPoint;
  // @ts-ignore
  map: google.maps.Map;

  /*
  geocoder = new google.maps.Geocoder();
*/
  constructor(private nominatimService: NominatimService) {}

  ngOnInit() {
    console.log('address params = ', this.addressParams);
    this.nominatimService
      .addressLokup(this.addressParams)
      .subscribe(this.processAddressLokupResponse());
  }

  private processAddressLokupResponse() {
    return (data: any[]) => {
      if (!data || data.length <= 0) {
        this.setDefaultOptions();
        return;
      }

      this.mapPoint = {
        latitude: Number(data[0].lat),
        longitude: Number(data[0].lon),
        name: data[0].display_name,
      };
      this.setOptions();
      this.setMarker();
    };
  }

  private setDefaultOptions(): void {
    this.map.setOptions({
      center: { lat: 52.0693, lng: 19.4803 },
      zoom: 4,
    });
  }

  private setOptions(): void {
    this.map.setOptions({
      center: {
        lat: this.mapPoint.latitude,
        lng: this.mapPoint.longitude,
      },
      zoom: 4,
    });
  }

  private setMarker(): void {
    // @ts-ignore
    this.overlays = [
      new google.maps.Marker({
        position: {
          lat: this.mapPoint.latitude,
          lng: this.mapPoint.longitude,
        },
        title: this.mapPoint.name,
      }),
    ];
  }

  setMap(event: any) {
    this.map = event.map;
  }
}

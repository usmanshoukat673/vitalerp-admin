import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';

// examples:
import GoogleMap from './helper-components/GoogleMap';
import Marker from './helper-components/Marker';

class DeviceLocations extends Component {

    getInfoWindowString = (device) => `
   <div>
      <div style="font-size: 16px;">
        ${device.machine_name}
      </div>
      <div style="font-size: 14px; color: grey; margin-top: 2px;">
       IP: ${device.public_ip}
      </div>
      <div style="font-size: 14px; color: grey; margin-top: 2px;">
        ${device.username}
      </div>
      <div style="font-size: 14px; color: grey; margin-top: 2px;">
        ${device.operating_system}
      </div>
      <div style="font-size: 14px; color: grey; margin-top: 2px;">
        ${device.city}, ${device.region} - ${device.country}
      </div>
    </div>`;

    handleApiLoaded = (map, maps, devices) => {
        const markers = [];
        const infowindows = [];

        devices.forEach((dc) => {
            markers.push(new maps.Marker({
                position: {
                    lat: dc.device.latitude,
                    lng: dc.device.longitude,
                },
                map,
            }));

            infowindows.push(new maps.InfoWindow({
                content: this.getInfoWindowString(dc.device),
            }));
        });

        markers.forEach((marker, i) => {
            marker.addListener('click', () => {
                infowindows[i].open(map, marker);
            });
        });
    };

    render() {
        const { devices } = this.props;

        return (
            <div style={{ height: '100%', width: '100%' }}>
                {!isEmpty(devices) && (
                    <GoogleMap
                        defaultZoom={10}
                        defaultCenter={[devices[0].device.latitude, devices[0].device.longitude]}
                        bootstrapURLKeys={{ key: 'AIzaSyBEEVF7kGxbQeYvRrHf6Fanc8VR85i3IZA' }}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps, devices)}
                    >
                    </GoogleMap>
                )}
            </div>
        );
    }
}

export default DeviceLocations;

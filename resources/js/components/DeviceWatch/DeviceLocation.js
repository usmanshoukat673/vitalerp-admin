import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';

import GoogleMap from './helper-components/GoogleMap';

class DeviceLocation extends Component {

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

    handleApiLoaded = (map, maps, device) => {
        const markers = [];
        const infowindows = [];

        markers.push(new maps.Marker({
            position: {
                lat: device.latitude,
                lng: device.longitude,
            },
            map,
        }));

        infowindows.push(new maps.InfoWindow({
            content: this.getInfoWindowString(device),
        }));

        markers.forEach((marker, i) => {
            marker.addListener('click', () => {
                infowindows[i].open(map, marker);
            });
        });
    };

    render() {
        const { device } = this.props;

        return (
            <div style={{ height: '100%', width: '100%' }}>
                {!isEmpty(device) && (
                    <GoogleMap
                        defaultZoom={10}
                        defaultCenter={[device.latitude, device.longitude]}
                        bootstrapURLKeys={{ key: 'AIzaSyBEEVF7kGxbQeYvRrHf6Fanc8VR85i3IZA' }}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps, device)}
                    >
                    </GoogleMap>
                )}
            </div>
        );
    }
}

export default DeviceLocation;

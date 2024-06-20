import { LightningElement, api } from 'lwc';

export default class Geolocation extends LightningElement {
    @api latitude;
    @api longitude;
    @api error;

    connectedCallback() {
        this.getLocation();
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.error = undefined;
                    this.dispatchEvent(new CustomEvent('coordinatesretrieved', {
                        detail: {
                            latitude: this.latitude,
                            longitude: this.longitude,
                        }
                    }));
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            this.error = 'User denied the request for Geolocation.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            this.error = 'Location information is unavailable.';
                            break;
                        case error.TIMEOUT:
                            this.error = 'The request to get user location timed out.';
                            break;
                        case error.UNKNOWN_ERROR:
                            this.error = 'An unknown error occurred.';
                            break;
                    }
                    this.latitude = undefined;
                    this.longitude = undefined;
                    this.dispatchEvent(new CustomEvent('coordinatesretrieved', {
                        detail: {
                            latitude: this.latitude,
                            longitude: this.longitude,
                        }
                    }));
                }
            );
        } else {
            this.error = 'Geolocation is not supported by this browser.';
            this.latitude = undefined;
            this.longitude = undefined;
            this.dispatchEvent(new CustomEvent('coordinatesretrieved', {
                detail: {
                    latitude: this.latitude,
                    longitude: this.longitude,
                }
            }));
        }
    }
}
// useLocation.js
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { getReverseGeocode } from '@/api/location';
import { Alert } from 'react-native';
import { useReportStore } from '@/store';

const useLocation = () => {
    const updateUserAddress = useReportStore((state) => state.updateUserAddress);
    const updateUserCoords = useReportStore((state) => state.updateUserCoords);


    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission to access your location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
               
                const { latitude, longitude } = location.coords;
                updateUserCoords({ latitude, longitude })
                const address = await getReverseGeocode({ latitude, longitude });
                if (address) {
                    updateUserAddress(address);
                }
            }
            catch (error) {
                Alert.alert("Oops!","An error occurred while getting your location,please make sure you have enabled location services")
                console.log(error)
            }
        }
        )();
    }, []);

};

export default useLocation;

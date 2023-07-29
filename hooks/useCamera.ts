import { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useReportStore } from '@/store';
import * as ImagePicker from 'expo-image-picker';

const useCamera = () => {
  const updatePhotoUrl = useReportStore((state) => state.updatePhotoUrl);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      // Request camera permissions when the component mounts
      if (!permission || !permission.granted) return requestPermission();
    })();
  }, []);

  const startCamera = async () => {
    if (!permission || !permission.granted) return requestPermission();
    updatePhotoUrl(null);
    setIsCameraOpen(true);
  };

  const takePicture = async () => {
    if (!permission || !permission.granted) return requestPermission();
    if (cameraRef.current ) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo.uri) updatePhotoUrl(photo.uri)
      setIsCameraOpen(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets.length) {
      updatePhotoUrl(result.assets[0].uri);
      setIsCameraOpen(false);
    }
  };

  return {
    cameraRef,
    cameraType,
    isCameraOpen,
    startCamera,
    takePicture,
    pickImage
  };
};

export default useCamera;

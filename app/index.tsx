
import React, { useState } from 'react';
import { Image, View, Platform, StyleSheet, StatusBar, Pressable, TextInput, Alert } from 'react-native';
import { uploadImage } from '@/api/media';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';
import { MonoText } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import { Camera } from 'expo-camera';
import { ReportData, ReportType } from '@/types';
import { Link } from 'expo-router';
import { useReportStore } from '@/store';
import submitReport from '@/api/report';
import useCamera from '@/hooks/useCamera';
import useLocation from '@/hooks/useLocation';
export default function MainScreen() {
  const [address, userCoords, updateUserAddress, photoUrl, reportType, updateReportType, comment, updateComment, qrCode] = useReportStore((state) => [state.address, state.userCoords, state.updateUserAddress, state.photoUrl, state.reportType, state.updateReportType, state.comment, state.updateComment, state.qrCode]
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cameraRef, cameraType, isCameraOpen, startCamera, takePicture, pickImage } = useCamera();
  useLocation()


  const checkFields = () => {
    if (!photoUrl) {
      Alert.alert("Please take a photo")
      return;
    }
    if (!address) {
      Alert.alert("Please enter your location")
      return;
    }
    if (reportType === null) {
      Alert.alert("Please select report type")
      return;
    }
    if (!qrCode) {
      Alert.alert("Please scan QR Code")
      return;
    }
    if (!comment) {
      Alert.alert("Please enter comment")
      return;
    }
    return true;
  }
  const handleSubmitReport = async () => {
    if (!checkFields()) return;

    setIsSubmitting(true)
    const publicUrl = await uploadImage(photoUrl)
    if (publicUrl) {
      const data: ReportData = {
        'phone': process.env.EXPO_PUBLIC_PHONE_NUMBER,
        'qrCode': qrCode,
        'userLocation.lat': userCoords?.latitude,
        'userLocation.lon': userCoords?.longitude,
        'userLocation.detail': address,
        'photo': publicUrl,
        'type.broken': reportType === ReportType.DEFECTIVE,
        'type.parking': reportType === ReportType.PARKING,
        'type.other': reportType === ReportType.OTHER,
        'message': comment,
      }
      const response = await submitReport(data);
      if (response) {
        Alert.alert("Your report has been submitted")
      }
      else {
        Alert.alert("Something went wrong while submitting your report")
      }
    }
    else {
      Alert.alert("An error occurred while uploading image")
    }
    setIsSubmitting(false)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {
        isCameraOpen ? <Camera type={cameraType} ref={cameraRef} style={[StyleSheet.absoluteFill, { justifyContent: "flex-end" }]} >
          <View style={styles.cameraBtns}>
            <Pressable onPress={takePicture}  >
              <FontAwesome name="camera" size={24} color="#fff" />
            </Pressable>
            <Pressable onPress={pickImage}>
              <FontAwesome name="photo" size={24} color="#fff" />
            </Pressable>
          </View>
        </Camera>
          :
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View style={styles.wrapper}>
              <View style={[styles.row, styles.boxOne]}>
                <TextInput
                  placeholder='Your Location'
                  placeholderTextColor='#f6dcee'
                  style={styles.text}
                  value={address}
                  onChangeText={(text) => updateUserAddress(text)}
                />
                <FontAwesome5 name="map-marked" size={16} color="#fff" />
              </View>
              <Link href="/qrReader" style={[styles.row, styles.boxOne]} asChild >
                <Pressable >
                  <MonoText style={styles.text}>{qrCode ? qrCode : "Select QR Code"}</MonoText>
                  <FontAwesome5 name="qrcode" size={16} color="#fff" />
                </Pressable>
              </Link>
              <View style={[styles.row, { gap: 12 }]}>
                <Pressable onPress={startCamera} style={styles.imageBox}>
                  {photoUrl ? <Image source={{ uri: photoUrl }} resizeMode='cover' style={{
                    minWidth: 90,
                    minHeight: 120, borderRadius: 12
                  }} /> : <FontAwesome name="camera" size={48} color="#fff" />}
                </Pressable>
                <View style={styles.reportBox}>
                  <Pressable style={styles.reportRow} onPress={() => updateReportType(ReportType.DEFECTIVE)}>
                    <MonoText style={styles.textSmall}>Report Defective Vehicle</MonoText>
                    {reportType === ReportType.DEFECTIVE && <Feather name="check" size={24} color="#fff" />}
                  </Pressable>
                  <Pressable style={styles.reportRow} onPress={() => updateReportType(ReportType.PARKING)}>
                    <MonoText style={styles.textSmall}>Report Wrong Parking</MonoText>
                    {reportType === ReportType.PARKING && <Feather name="check" size={24} color="#fff" />}
                  </Pressable>
                  <Pressable style={styles.reportRow} onPress={() => updateReportType(ReportType.OTHER)}>
                    <MonoText style={styles.textSmall}>Report Other</MonoText>
                    {reportType === ReportType.OTHER && <Feather name="check" size={24} color="#fff" />}
                  </Pressable>
                </View>
              </View>
              <View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(text) => updateComment(text)}
                    value={comment}
                    placeholder="Please write comment"
                    placeholderTextColor="#f6dcee"
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
            <Pressable onPress={handleSubmitReport} style={[styles.submitBtn, { backgroundColor: isSubmitting ? "green" : Colors.mainColor }]}>
              {isSubmitting ? <Feather name="check" size={24} color="#fff" /> : <MonoText style={styles.text}>Send</MonoText>}
            </Pressable>
          </View>
      }
      <ExpoStatusBar style="light" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: "#333",
    justifyContent: "space-between",
    paddingVertical: 20
  },
  cameraBtns: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center"
  },
  text: {
    color: "#f6dcee",
    fontSize: 14
  },
  textSmall: {
    fontSize: 12,
    color: "#ffe4ff"
  },
  wrapper: {
    gap: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  boxOne: {
    height: 50,
    backgroundColor: "#b3175e",
    borderRadius: 10,
    justifyContent: "space-between",
    width: "90%",
    paddingHorizontal: 10,
    alignSelf: "center"
  },
  imageBox: {
    minWidth: 90,
    minHeight: 120,
    backgroundColor: Colors.mainColor,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  reportBox: {
    minHeight: 120,
    flexGrow: 1,
    backgroundColor: Colors.mainColor,
    borderRadius: 12,
    justifyContent: "space-evenly"
  },
  reportRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    minHeight: 28
  },
  inputWrapper: {
    width: "90%",
    alignSelf: "center",
    minHeight: 180,
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: Colors.mainColor,
    borderRadius: 12,
  },
  input: {
    color: "#fff",
    fontSize: 16,
  },
  submitBtn: {
    width: "90%",
    alignSelf: "center",
    height: 50,
    backgroundColor: "#b3175e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  }
});

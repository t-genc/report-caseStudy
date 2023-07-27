import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, Pressable, TextInput, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons, Feather } from '@expo/vector-icons';
import { BarCodeScanningResult, Camera, CameraType, FlashMode } from 'expo-camera';
import { router } from 'expo-router';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useReportStore } from '@/store';

export default function App() {
    const updateQrCode = useReportStore(state => state.updateQrCode)
    const [qrCode, setQrCode] = useState("");
    const [isFlashOpen, setIsFlashOpen] = useState(false)
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const permission = await BarCodeScanner.requestPermissionsAsync();
            if (!permission.granted) {
                Alert.alert("Permission to access camera is required")
            }
        };
        getBarCodeScannerPermissions();
    }, []);
    const handleBarCodeScanned = (result: BarCodeScanningResult) => {
        if (result.data) {
            updateQrCode(result.data)
            router.replace("/")
        }
    };
    const handleManualCode = () => {
        updateQrCode(qrCode)
        router.replace("/")
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera
                style={{ flex: 1 }}
                type={CameraType.back}
                flashMode={isFlashOpen ? FlashMode.torch : FlashMode.off}
                barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
                onBarCodeScanned={handleBarCodeScanned}
            >
                <View style={styles.row}>
                    <Pressable style={styles.inputBox}>
                        <TextInput
                            value={qrCode}
                            placeholder="Qr Code"
                            placeholderTextColor="#f6dcee"
                            style={styles.text}
                            onChangeText={(text) => setQrCode(text)}
                            maxLength={6}

                        />
                        {
                            qrCode.length === 6 &&
                            <Pressable onPress={handleManualCode}>
                                <Feather name="check" size={24} color="#fff" />
                            </Pressable>

                        }

                    </Pressable>
                    <Pressable onPress={() => setIsFlashOpen(!isFlashOpen)} style={[styles.flashBox, { borderColor: "#fff", borderWidth: isFlashOpen ? 1 : 0 }]}>
                        <Ionicons name={"flashlight-outline"} size={24} color="#fff" />
                    </Pressable>
                </View>
            </Camera>
            <ExpoStatusBar style="light" />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    row: {
        position: "absolute",
        bottom: 120,
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12
    },
    inputBox: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#333",
        paddingHorizontal: 20,
        gap: 10,
        maxWidth: 120,
        height: 50,
        borderRadius: 10
    }
    ,
    flashBox: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
        width: 50,
        height: 50,
        borderRadius: 10
    },
    text: {
        color: "#f6dcee",
        fontSize: 14
    }
});

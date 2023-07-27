import axios from "axios"
import { ReportData } from "@/types"

export default async function submitReport(data: ReportData) {
    try {
        const phoneNumber = process.env.EXPO_PUBLIC_PHONE_NUMBER
        const authCode = process.env.EXPO_PUBLIC_AUTH_CODE
        const apiUrl = process.env.EXPO_PUBLIC_API_URL

        const headers = {
            'phoneNumber': phoneNumber,
            'authCode': authCode,
        }

        const response = await axios.post(`https://${apiUrl}`, data, { headers });
        return response.data;
    } catch (error) {
        console.error("error while submitting report:", error);
        return
    }

}
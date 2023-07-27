import axios from "axios";
import { Coords } from "@/types";
import { config } from "@/config/base"

const apiKey = process.env.EXPO_PUBLIC_GOOOGLE_MAP_API_KEY

export async function getReverseGeocode(coords: Coords): Promise<string | undefined> {
    if (!coords.latitude || !coords.longitude) return
    const apiUrl = `${config.geocodeUrl}/json?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}`;
    try {
        const response = await axios.get(apiUrl);
        if (response.data.results[0]) {
            return response.data.results[0].formatted_address
        }
    } catch (error) {
        console.log('reverse geocode error:', error);
        return ""
    }
}
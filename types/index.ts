export type Coords = {
    latitude: number,
    longitude: number
}

export enum ReportType  {
    DEFECTIVE,
    PARKING,
    OTHER

}

export type ReportData={
    'phone' :string,
    'qrCode' :string,
    'userLocation.lat': number | undefined,
    'userLocation.lon': number|undefined,
    'userLocation.detail': string ,
    'photo': string,
    'type.broken' : boolean,
    'type.parking' : boolean,
    'type.other': boolean,
    'message': string,  
}
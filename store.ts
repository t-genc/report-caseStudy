import { Coords, ReportType } from '@/types';
import { create } from 'zustand'


type ReportStore={
    photoUrl:string|null,
    qrCode:string,
    reportType:ReportType|null,
    address:string,
    comment:string,
    userCoords:null | Coords,
    updatePhotoUrl:(photoUrl:string|null)=>void,
    updateReportType:(reportType:ReportType)=>void,
    updateUserAddress:(location:string)=>void,
    updateComment:(comment:string)=>void,
    updateQrCode:(qrCode:string)=>void,
    updateUserCoords:(userCoords:Coords)=>void

}


export const useReportStore = create<ReportStore>((set) => ({
    photoUrl:null,
    reportType:null,
    address:"",
    userCoords:null,
    comment:"",
    qrCode:"",
    updatePhotoUrl:(photoUrl:string|null)=>set({photoUrl}),
    updateReportType:(reportType:ReportType)=>set({reportType}),
    updateUserAddress:(address:string)=>set({address}),
    updateComment:(comment:string)=>set({comment}),
    updateQrCode:(qrCode:string)=>set({qrCode}),
    updateUserCoords:(userCoords:Coords)=>set({userCoords})

  }))
  




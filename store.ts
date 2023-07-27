import { ReportType } from '@/types';
import { create } from 'zustand'


type ReportStore={
    photoUrl:string|null,
    qrCode:string,
    reportType:ReportType|null,
    location:string,
    comment:string,
    updatePhotoUrl:(photoUrl:string|null)=>void,
    updateReportType:(reportType:ReportType)=>void,
    updateLocation:(location:string)=>void,
    updateComment:(comment:string)=>void,
    updateQrCode:(qrCode:string)=>void

}


export const useReportStore = create<ReportStore>((set) => ({
    photoUrl:null,
    reportType:null,
    location:"",
    comment:"",
    qrCode:"",
    updatePhotoUrl:(photoUrl:string|null)=>set({photoUrl}),
    updateReportType:(reportType:ReportType)=>set({reportType}),
    updateLocation:(location:string)=>set({location}),
    updateComment:(comment:string)=>set({comment}),
    updateQrCode:(qrCode:string)=>set({qrCode})
  }))
  




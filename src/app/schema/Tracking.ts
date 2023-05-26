export interface Tracking {
  id: string;
  code: string;
  data: string;
  created_at: Date;
  updated_at: Date;
}

export interface TrackingCreate {
  code: string;
  data: string;
}

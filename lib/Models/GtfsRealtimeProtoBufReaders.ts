// adapted from code generated by pbf v3.2.0

// Unfortunately, pbf doesn't output modules. And typescript gets upset about the types.
// If this file is regenerated, a lot of manual massaging is required to make it useful.

import Pbf from "pbf";
import { isNullOrUndefined } from "util";

export abstract class ProtobufMessageReader<T> {
  abstract readonly defaultMessage: T;

  public read(pbf: Pbf, end?: number): T {
    return pbf.readFields(this.readField, this.defaultMessage, end);
  }

  protected abstract readField(tag: number, obj?: T, pbf?: Pbf): void;
}

// FeedMessage ========================================

// const FeedMessage: any = {};

// FeedMessage.read = function(pbf, end) {
//   return pbf.readFields(
//     FeedMessage._readField,
//     { header: null, entity: [] },
//     end
//   );
// };
// FeedMessage._readField = function(tag, obj, pbf) {
//   if (tag === 1) obj.header = FeedHeader.read(pbf, pbf.readVarint() + pbf.pos);
//   else if (tag === 2)
//     obj.entity.push(FeedEntity.read(pbf, pbf.readVarint() + pbf.pos));
// };

export interface FeedMessage {
  header?: FeedHeader | null;
  entity?: FeedEntity[];
}

export class FeedMessageReader extends ProtobufMessageReader<FeedMessage> {
  readonly defaultMessage: FeedMessage = {
    header: null,
    entity: []
  };

  constructor() {
    super();
  }

  protected readField(tag: number, obj?: FeedMessage, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (isNullOrUndefined(obj.entity)) {
      obj.entity = [];
    }

    if (tag === 1)
      obj.header = new FeedHeaderReader().read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 2)
      obj.entity.push(
        new FeedEntityReader().read(pbf, pbf.readVarint() + pbf.pos)
      );
  }
}

// FeedHeader ========================================

// const FeedHeader = (self.FeedHeader = {});

// FeedHeader.read = function(pbf, end) {
//   return pbf.readFields(
//     FeedHeader._readField,
//     {
//       gtfs_realtime_version: "",
//       incrementality: { value: 0, options: {} },
//       timestamp: 0
//     },
//     end
//   );
// };
// FeedHeader._readField = function(tag, obj, pbf) {
//   if (tag === 1) obj.gtfs_realtime_version = pbf.readString();
//   else if (tag === 2) obj.incrementality = pbf.readVarint();
//   else if (tag === 3) obj.timestamp = pbf.readVarint();
// };

// FeedHeader.Incrementality = {
//   FULL_DATASET: {
//     value: 0,
//     options: {}
//   },
//   DIFFERENTIAL: {
//     value: 1,
//     options: {}
//   }
// };

enum FeedHeaderIncrementality {
  FULL_DATASET,
  DIFFERENTIAL
}

export interface FeedHeader {
  gtfs_realtime_version?: string;
  incrementality?: FeedHeaderIncrementality;
  timestamp?: number;
}

export class FeedHeaderReader extends ProtobufMessageReader<FeedHeader> {
  readonly defaultMessage: FeedHeader = {
    gtfs_realtime_version: "",
    incrementality: FeedHeaderIncrementality.FULL_DATASET,
    timestamp: 0
  };

  protected readField(tag: number, obj?: FeedHeader, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (tag === 1) obj.gtfs_realtime_version = pbf.readString();
    else if (tag === 2) obj.incrementality = pbf.readVarint();
    else if (tag === 3) obj.timestamp = pbf.readVarint();
  }
}

// FeedEntity ========================================

export interface FeedEntity {
  id?: string;
  is_deleted?: boolean;
  trip_update?: TripUpdate | null;
  vehicle?: VehiclePosition | null;
  alert?: Alert | null;
}

export class FeedEntityReader extends ProtobufMessageReader<FeedEntity> {
  readonly defaultMessage: FeedEntity = {
    id: "",
    is_deleted: false,
    trip_update: null,
    vehicle: null,
    alert: null
  };

  protected readField(tag: number, obj?: FeedEntity, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (tag === 1) obj.id = pbf.readString();
    else if (tag === 2) obj.is_deleted = pbf.readBoolean();
    else if (tag === 3)
      obj.trip_update = new TripUpdateReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
    else if (tag === 4)
      obj.vehicle = new VehiclePositionReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
    else if (tag === 5)
      obj.alert = new AlertReader().read(pbf, pbf.readVarint() + pbf.pos);
  }
}

// FeedEntity.read = function(pbf, end) {
//   return pbf.readFields(
//     FeedEntity._readField,
//     {
//       id: "",
//       is_deleted: false,
//       trip_update: null,
//       vehicle: null,
//       alert: null
//     },
//     end
//   );
// };
// FeedEntity._readField = function(tag, obj, pbf) {
//   if (tag === 1) obj.id = pbf.readString();
//   else if (tag === 2) obj.is_deleted = pbf.readBoolean();
//   else if (tag === 3)
//     obj.trip_update = TripUpdate.read(pbf, pbf.readVarint() + pbf.pos);
//   else if (tag === 4)
//     obj.vehicle = VehiclePosition.read(pbf, pbf.readVarint() + pbf.pos);
//   else if (tag === 5) obj.alert = Alert.read(pbf, pbf.readVarint() + pbf.pos);
// };

// TripUpdate ========================================

export interface TripUpdate {
  trip?: TripDescriptor | null;
  vehicle?: VehicleDescriptor | null;
  stop_time_update?: StopTimeUpdate[];
  timestamp?: number;
  delay?: number;
}

export class TripUpdateReader extends ProtobufMessageReader<TripUpdate> {
  readonly defaultMessage: TripUpdate = {
    trip: {},
    vehicle: {},
    stop_time_update: [],
    timestamp: 0,
    delay: 0
  };

  protected readField(tag: number, obj?: TripUpdate, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (isNullOrUndefined(obj.stop_time_update)) {
      obj.stop_time_update = [];
    }

    if (tag === 1)
      obj.trip = new TripDescriptorReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
    else if (tag === 3)
      obj.vehicle = new VehicleDescriptorReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
    else if (tag === 2)
      obj.stop_time_update.push(
        new StopTimeUpdateReader().read(pbf, pbf.readVarint() + pbf.pos)
      );
    else if (tag === 4) obj.timestamp = pbf.readVarint();
    else if (tag === 5) obj.delay = pbf.readVarint(true);
  }
}

// const TripUpdate = (self.TripUpdate = {});

// TripUpdate.read = function(pbf, end) {
//   return pbf.readFields(
//     TripUpdate._readField,
//     { trip: null, vehicle: null, stop_time_update: [], timestamp: 0, delay: 0 },
//     end
//   );
// };
// TripUpdate._readField = function(tag, obj, pbf) {
//   if (tag === 1)
//     obj.trip = TripDescriptor.read(pbf, pbf.readVarint() + pbf.pos);
//   else if (tag === 3)
//     obj.vehicle = VehicleDescriptor.read(pbf, pbf.readVarint() + pbf.pos);
//   else if (tag === 2)
//     obj.stop_time_update.push(
//       TripUpdate.StopTimeUpdate.read(pbf, pbf.readVarint() + pbf.pos)
//     );
//   else if (tag === 4) obj.timestamp = pbf.readVarint();
//   else if (tag === 5) obj.delay = pbf.readVarint(true);
// };

// TripUpdate.StopTimeEvent ========================================

export interface StopTimeEvent {
  delay?: number;
  time?: number;
  uncertainty?: number;
}

export class StopTimeEventReader extends ProtobufMessageReader<StopTimeEvent> {
  readonly defaultMessage: StopTimeEvent = {
    delay: 0,
    time: 0,
    uncertainty: 0
  };

  protected readField(tag: number, obj?: StopTimeEvent, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (tag === 1) obj.delay = pbf.readVarint(true);
    else if (tag === 2) obj.time = pbf.readVarint(true);
    else if (tag === 3) obj.uncertainty = pbf.readVarint(true);
  }
}

// TripUpdate.StopTimeEvent = {};

// TripUpdate.StopTimeEvent.read = function(pbf, end) {
//   return pbf.readFields(
//     TripUpdate.StopTimeEvent._readField,
//     { delay: 0, time: 0, uncertainty: 0 },
//     end
//   );
// };
// TripUpdate.StopTimeEvent._readField = function(tag, obj, pbf) {
//   if (tag === 1) obj.delay = pbf.readVarint(true);
//   else if (tag === 2) obj.time = pbf.readVarint(true);
//   else if (tag === 3) obj.uncertainty = pbf.readVarint(true);
// };

// TripUpdate.StopTimeUpdate ========================================

export interface StopTimeUpdate {
  stop_sequence?: number;
  stop_id?: string;
  arrival?: StopTimeEvent | null;
  departure?: StopTimeEvent | null;
  schedule_relationship?: StopTimeUpdateScheduleRelationship;
}

export class StopTimeUpdateReader extends ProtobufMessageReader<
  StopTimeUpdate
> {
  readonly defaultMessage: StopTimeUpdate = {
    stop_sequence: 0,
    stop_id: "",
    arrival: null,
    departure: null,
    schedule_relationship: StopTimeUpdateScheduleRelationship.NO_DATA
  };

  protected readField(tag: number, obj?: StopTimeUpdate, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (tag === 1) obj.stop_sequence = pbf.readVarint();
    else if (tag === 4) obj.stop_id = pbf.readString();
    else if (tag === 2)
      obj.arrival = new StopTimeEventReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
    else if (tag === 3)
      obj.departure = new StopTimeEventReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
    else if (tag === 5) obj.schedule_relationship = pbf.readVarint();
  }
}

enum StopTimeUpdateScheduleRelationship {
  SCHEDULED,
  SKIPPED,
  NO_DATA
}

// TripUpdate.StopTimeUpdate = {};

// TripUpdate.StopTimeUpdate.read = function(pbf, end) {
//   return pbf.readFields(
//     TripUpdate.StopTimeUpdate._readField,
//     {
//       stop_sequence: 0,
//       stop_id: "",
//       arrival: null,
//       departure: null,
//       schedule_relationship: { value: 0, options: {} }
//     },
//     end
//   );
// };
// TripUpdate.StopTimeUpdate._readField = function(tag, obj, pbf) {
//   if (tag === 1) obj.stop_sequence = pbf.readVarint();
//   else if (tag === 4) obj.stop_id = pbf.readString();
//   else if (tag === 2)
//     obj.arrival = TripUpdate.StopTimeEvent.read(
//       pbf,
//       pbf.readVarint() + pbf.pos
//     );
//   else if (tag === 3)
//     obj.departure = TripUpdate.StopTimeEvent.read(
//       pbf,
//       pbf.readVarint() + pbf.pos
//     );
//   else if (tag === 5) obj.schedule_relationship = pbf.readVarint();
// };

// TripUpdate.StopTimeUpdate.ScheduleRelationship = {
//   SCHEDULED: {
//     value: 0,
//     options: {}
//   },
//   SKIPPED: {
//     value: 1,
//     options: {}
//   },
//   NO_DATA: {
//     value: 2,
//     options: {}
//   }
// };

// VehiclePosition ========================================

export interface VehiclePosition {
  trip?: TripDescriptor | null;
  vehicle?: VehicleDescriptor | null;
  position?: Position | null;
  current_stop_sequence?: number;
  stop_id?: string;
  current_status?: VehicleStopStatus;
  timestamp?: number;
  congestion_level?: CongestionLevel;
  occupancy_status?: OccupancyStatus;
}

export class VehiclePositionReader extends ProtobufMessageReader<
  VehiclePosition
> {
  readonly defaultMessage: VehiclePosition = {
    trip: null,
    vehicle: null,
    position: null,
    current_stop_sequence: 0,
    stop_id: "",
    current_status: VehicleStopStatus.IN_TRANSIT_TO,
    timestamp: 0,
    congestion_level: CongestionLevel.UNKNOWN_CONGESTION_LEVEL,
    occupancy_status: OccupancyStatus.EMPTY
  };

  protected readField(tag: number, obj?: VehiclePosition, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (tag === 1)
      obj.trip = new TripDescriptorReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
    else if (tag === 8)
      obj.vehicle = new VehicleDescriptorReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
    else if (tag === 2)
      obj.position = new PositionReader().read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 3) obj.current_stop_sequence = pbf.readVarint();
    else if (tag === 7) obj.stop_id = pbf.readString();
    else if (tag === 4) obj.current_status = pbf.readVarint();
    else if (tag === 5) obj.timestamp = pbf.readVarint();
    else if (tag === 6) obj.congestion_level = pbf.readVarint();
    else if (tag === 9) obj.occupancy_status = pbf.readVarint();
  }
}

// const VehiclePosition = (self.VehiclePosition = {});

// VehiclePosition.read = function(pbf, end) {
//   return pbf.readFields(
//     VehiclePosition._readField,
//     {
//       trip: null,
//       vehicle: null,
//       position: null,
//       current_stop_sequence: 0,
//       stop_id: "",
//       current_status: { value: 2, options: {} },
//       timestamp: 0,
//       congestion_level: 0,
//       occupancy_status: 0
//     },
//     end
//   );
// };
// VehiclePosition._readField = function(tag, obj, pbf) {
//   if (tag === 1)
//     obj.trip = TripDescriptor.read(pbf, pbf.readVarint() + pbf.pos);
//   else if (tag === 8)
//     obj.vehicle = VehicleDescriptor.read(pbf, pbf.readVarint() + pbf.pos);
//   else if (tag === 2)
//     obj.position = Position.read(pbf, pbf.readVarint() + pbf.pos);
//   else if (tag === 3) obj.current_stop_sequence = pbf.readVarint();
//   else if (tag === 7) obj.stop_id = pbf.readString();
//   else if (tag === 4) obj.current_status = pbf.readVarint();
//   else if (tag === 5) obj.timestamp = pbf.readVarint();
//   else if (tag === 6) obj.congestion_level = pbf.readVarint();
//   else if (tag === 9) obj.occupancy_status = pbf.readVarint();
// };

enum VehicleStopStatus {
  INCOMING_AT,
  STOPPED_AT,
  IN_TRANSIT_TO
}

enum CongestionLevel {
  UNKNOWN_CONGESTION_LEVEL,
  RUNNING_SMOOTHLY,
  STOP_AND_GO,
  CONGESTION,
  SEVERE_CONGESTION
}

enum OccupancyStatus {
  EMPTY,
  MANY_SEATS_AVAILABLE,
  FEW_SEATS_AVAILABLE,
  STANDING_ROOM_ONLY,
  CRUSHED_STANDING_ROOM_ONLY,
  FULL,
  NOT_ACCEPTING_PASSENGERS
}

// Alert ========================================

export interface Alert {
  active_period?: TimeRange[];
  informed_entity?: EntitySelector[];
  cause?: AlertCause;
  effect?: AlertEffect;
  url?: TranslatedString | null;
  header_text?: TranslatedString | null;
  description_text?: TranslatedString | null;
}

export class AlertReader extends ProtobufMessageReader<Alert> {
  readonly defaultMessage: Alert = {
    active_period: [],
    informed_entity: [],
    cause: AlertCause.CONSTRUCTION,
    effect: AlertEffect.STOP_MOVED,
    url: null,
    header_text: null,
    description_text: null
  };

  protected readField(tag: number, obj?: Alert, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (isNullOrUndefined(obj.active_period)) {
      obj.active_period = [];
    }

    if (isNullOrUndefined(obj.informed_entity)) {
      obj.informed_entity = [];
    }

    if (tag === 1)
      obj.active_period.push(
        new TimeRangeReader().read(pbf, pbf.readVarint() + pbf.pos)
      );
    else if (tag === 5)
      obj.informed_entity.push(
        new EntitySelectorReader().read(pbf, pbf.readVarint() + pbf.pos)
      );
    else if (tag === 6) obj.cause = pbf.readVarint();
    else if (tag === 7) obj.effect = pbf.readVarint();
    else if (tag === 8)
      obj.url = new TranslatedStringReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
    else if (tag === 10)
      obj.header_text = new TranslatedStringReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
    else if (tag === 11)
      obj.description_text = new TranslatedStringReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
  }
}

// const Alert = (self.Alert = {});

// Alert.read = function(pbf, end) {
//   return pbf.readFields(
//     Alert._readField,
//     {
//       active_period: [],
//       informed_entity: [],
//       cause: { value: 1, options: {} },
//       effect: { value: 8, options: {} },
//       url: null,
//       header_text: null,
//       description_text: null
//     },
//     end
//   );
// };
// Alert._readField = function(tag, obj, pbf) {
//   if (tag === 1)
//     obj.active_period.push(TimeRange.read(pbf, pbf.readVarint() + pbf.pos));
//   else if (tag === 5)
//     obj.informed_entity.push(
//       EntitySelector.read(pbf, pbf.readVarint() + pbf.pos)
//     );
//   else if (tag === 6) obj.cause = pbf.readVarint();
//   else if (tag === 7) obj.effect = pbf.readVarint();
//   else if (tag === 8)
//     obj.url = TranslatedString.read(pbf, pbf.readVarint() + pbf.pos);
//   else if (tag === 10)
//     obj.header_text = TranslatedString.read(pbf, pbf.readVarint() + pbf.pos);
//   else if (tag === 11)
//     obj.description_text = TranslatedString.read(
//       pbf,
//       pbf.readVarint() + pbf.pos
//     );
// };

enum AlertCause {
  UNKNOWN_CAUSE = 1,
  OTHER_CAUSE,
  TECHNICAL_PROBLEM,
  STRIKE,
  DEMONSTRATION,
  ACCIDENT,
  HOLIDAY,
  WEATHER,
  MAINTENANCE,
  CONSTRUCTION,
  POLICE_ACTIVITY,
  MEDICAL_EMERGENCY
}

enum AlertEffect {
  NO_SERVICE = 1,
  REDUCED_SERVICE,
  SIGNIFICANT_DELAYS,
  ADDITIONAL_SERVICE,
  MODIFIED_SERVICE,
  OTHER_EFFECT,
  UNKNOWN_EFFECT,
  STOP_MOVED
}

// TimeRange ========================================

export interface TimeRange {
  start?: number;
  end?: number;
}

export class TimeRangeReader extends ProtobufMessageReader<TimeRange> {
  readonly defaultMessage: TimeRange = {
    start: 0,
    end: 0
  };

  protected readField(tag: number, obj?: TimeRange, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (tag === 1) obj.start = pbf.readVarint();
    else if (tag === 2) obj.end = pbf.readVarint();
  }
}

// const TimeRange = (self.TimeRange = {});

// TimeRange.read = function(pbf, end) {
//   return pbf.readFields(TimeRange._readField, { start: 0, end: 0 }, end);
// };
// TimeRange._readField = function(tag, obj, pbf) {
//   if (tag === 1) obj.start = pbf.readVarint();
//   else if (tag === 2) obj.end = pbf.readVarint();
// };

// Position ========================================

export interface Position {
  latitude?: number;
  longitude?: number;
  bearing?: number;
  odometer?: number;
  speed?: number;
}

export class PositionReader extends ProtobufMessageReader<Position> {
  readonly defaultMessage: Position = {
    latitude: 0,
    longitude: 0,
    bearing: 0,
    odometer: 0,
    speed: 0
  };

  protected readField(tag: number, obj?: Position, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (tag === 1) obj.latitude = pbf.readFloat();
    else if (tag === 2) obj.longitude = pbf.readFloat();
    else if (tag === 3) obj.bearing = pbf.readFloat();
    else if (tag === 4) obj.odometer = pbf.readDouble();
    else if (tag === 5) obj.speed = pbf.readFloat();
  }
}

// const Position = (self.Position = {});

// Position.read = function(pbf, end) {
//   return pbf.readFields(
//     Position._readField,
//     { latitude: 0, longitude: 0, bearing: 0, odometer: 0, speed: 0 },
//     end
//   );
// };
// Position._readField = function(tag, obj, pbf) {
//   if (tag === 1) obj.latitude = pbf.readFloat();
//   else if (tag === 2) obj.longitude = pbf.readFloat();
//   else if (tag === 3) obj.bearing = pbf.readFloat();
//   else if (tag === 4) obj.odometer = pbf.readDouble();
//   else if (tag === 5) obj.speed = pbf.readFloat();
// };

// TripDescriptor ========================================

export interface TripDescriptor {
  trip_id?: string;
  route_id?: string;
  direction_id?: number;
  start_time?: string;
  start_date?: string;
  schedule_relationship?: TripDescriptorScheduleRelationship;
}

export class TripDescriptorReader extends ProtobufMessageReader<
  TripDescriptor
> {
  readonly defaultMessage: TripDescriptor = {
    trip_id: "",
    route_id: "",
    direction_id: 0,
    start_time: "",
    start_date: "",
    schedule_relationship: TripDescriptorScheduleRelationship.SCHEDULED
  };

  protected readField(tag: number, obj?: TripDescriptor, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (tag === 1) obj.trip_id = pbf.readString();
    else if (tag === 5) obj.route_id = pbf.readString();
    else if (tag === 6) obj.direction_id = pbf.readVarint();
    else if (tag === 2) obj.start_time = pbf.readString();
    else if (tag === 3) obj.start_date = pbf.readString();
    else if (tag === 4) obj.schedule_relationship = pbf.readVarint();
  }
}

// const TripDescriptor = (self.TripDescriptor = {});

// TripDescriptor.read = function(pbf, end) {
//   return pbf.readFields(
//     TripDescriptor._readField,
//     {
//       trip_id: "",
//       route_id: "",
//       direction_id: 0,
//       start_time: "",
//       start_date: "",
//       schedule_relationship: 0
//     },
//     end
//   );
// };
// TripDescriptor._readField = function(tag, obj, pbf) {
//   if (tag === 1) obj.trip_id = pbf.readString();
//   else if (tag === 5) obj.route_id = pbf.readString();
//   else if (tag === 6) obj.direction_id = pbf.readVarint();
//   else if (tag === 2) obj.start_time = pbf.readString();
//   else if (tag === 3) obj.start_date = pbf.readString();
//   else if (tag === 4) obj.schedule_relationship = pbf.readVarint();
// };

enum TripDescriptorScheduleRelationship {
  SCHEDULED,
  ADDED,
  UNSCHEDULED,
  CANCELED
}

// VehicleDescriptor ========================================

// const VehicleDescriptor = (self.VehicleDescriptor = {});

// VehicleDescriptor.read = function(pbf, end) {
//   return pbf.readFields(
//     VehicleDescriptor._readField,
//     { id: "", label: "", license_plate: "" },
//     end
//   );
// };
// VehicleDescriptor._readField = function(tag, obj, pbf) {
//   if (tag === 1) obj.id = pbf.readString();
//   else if (tag === 2) obj.label = pbf.readString();
//   else if (tag === 3) obj.license_plate = pbf.readString();
// };

export interface VehicleDescriptor {
  id?: string;
  label?: string;
  license_plate?: string;
}

export class VehicleDescriptorReader extends ProtobufMessageReader<
  VehicleDescriptor
> {
  readonly defaultMessage: VehicleDescriptor = {
    id: "",
    label: "",
    license_plate: ""
  };

  protected readField(tag: number, obj?: VehicleDescriptor, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (tag === 1) obj.id = pbf.readString();
    else if (tag === 2) obj.label = pbf.readString();
    else if (tag === 3) obj.license_plate = pbf.readString();
  }
}

// EntitySelector ========================================

// const EntitySelector = (self.EntitySelector = {});

// EntitySelector.read = function(pbf, end) {
//   return pbf.readFields(
//     EntitySelector._readField,
//     { agency_id: "", route_id: "", route_type: 0, trip: null, stop_id: "" },
//     end
//   );
// };
// EntitySelector._readField = function(tag, obj, pbf) {
//   if (tag === 1) obj.agency_id = pbf.readString();
//   else if (tag === 2) obj.route_id = pbf.readString();
//   else if (tag === 3) obj.route_type = pbf.readVarint(true);
//   else if (tag === 4)
//     obj.trip = TripDescriptor.read(pbf, pbf.readVarint() + pbf.pos);
//   else if (tag === 5) obj.stop_id = pbf.readString();
// };

export interface EntitySelector {
  agency_id?: string;
  route_id?: string;
  route_type?: number;
  trip?: TripDescriptor | null;
  stop_id?: string;
}

export class EntitySelectorReader extends ProtobufMessageReader<
  EntitySelector
> {
  readonly defaultMessage: EntitySelector = {
    agency_id: "",
    route_id: "",
    route_type: 0,
    trip: null,
    stop_id: ""
  };

  protected readField(tag: number, obj?: EntitySelector, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (tag === 1) obj.agency_id = pbf.readString();
    else if (tag === 2) obj.route_id = pbf.readString();
    else if (tag === 3) obj.route_type = pbf.readVarint(true);
    else if (tag === 4)
      obj.trip = new TripDescriptorReader().read(
        pbf,
        pbf.readVarint() + pbf.pos
      );
    else if (tag === 5) obj.stop_id = pbf.readString();
  }
}

// TranslatedString ========================================

// const TranslatedString = (self.TranslatedString = {});

// TranslatedString.read = function(pbf, end) {
//   return pbf.readFields(TranslatedString._readField, { translation: [] }, end);
// };
// TranslatedString._readField = function(tag, obj, pbf) {
//   if (tag === 1)
//     obj.translation.push(
//       TranslatedString.Translation.read(pbf, pbf.readVarint() + pbf.pos)
//     );
// };

export interface TranslatedString {
  translation?: Translation[];
}

export class TranslatedStringReader extends ProtobufMessageReader<
  TranslatedString
> {
  readonly defaultMessage: TranslatedString = { translation: [] };

  protected readField(tag: number, obj?: TranslatedString, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (isNullOrUndefined(obj.translation)) {
      obj.translation = [];
    }

    if (tag === 1)
      obj.translation.push(
        new TranslationReader().read(pbf, pbf.readVarint() + pbf.pos)
      );
  }
}

// TranslatedString.Translation ========================================

// TranslatedString.Translation = {};

// TranslatedString.Translation.read = function(pbf, end) {
//   return pbf.readFields(
//     TranslatedString.Translation._readField,
//     { text: "", language: "" },
//     end
//   );
// };
// TranslatedString.Translation._readField = function(tag, obj, pbf) {
//   if (tag === 1) obj.text = pbf.readString();
//   else if (tag === 2) obj.language = pbf.readString();
// };

export interface Translation {
  text?: string;
  language?: string;
}

export class TranslationReader extends ProtobufMessageReader<Translation> {
  readonly defaultMessage: Translation = { text: "", language: "" };

  protected readField(tag: number, obj?: Translation, pbf?: Pbf): void {
    if (isNullOrUndefined(pbf)) {
      return;
    }

    if (isNullOrUndefined(obj)) {
      obj = {};
    }

    if (tag === 1) obj.text = pbf.readString();
    else if (tag === 2) obj.language = pbf.readString();
  }
}

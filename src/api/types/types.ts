import { BrewSize } from '../../components/BrewSizePicker';
import { BrewStrength } from '../../components/StrengthPicker';

interface IBrew {
  size: BrewSize;
  strength: BrewStrength;
  duration: number;
  is_cold: boolean;
}

export interface ISingleBrew extends IBrew {
  ready_timestamp: number;
}

export interface IScheduledBrew extends IBrew {
  ready_time: string;
  days: number[];
}

export interface IBrewStatus {
  start_timestamp: number; // "2023-03-09T01:27:14.566332"
  finish_timestamp: number;
  duration: number;
  is_starting: boolean;
  is_brewing: boolean;
  is_done: boolean;
}

export interface IBrewSchedule {
  schedule: {
    days: number[];
    ready_time: string;
  };
}

import {SpecificTrendsPacket, SpecificTrendsDataPacket} from './network-bus';

export interface SpecificTrendsPacket {
  name: string;
  history: {
    start: number;
    end: number;
    data: SpecificTrendsDataPacket[];
  }
};

export interface SpecificTrendsDataPacket {
  sentiment: number;
  volume: number;
};

/**
 * SpecificTrends is an implementation of the news packet received from the
 * endpoint. This class is used solely for the purpose of encapsulating the
 * operations on the data.
 * @author Omar Chehab
 */
export class SpecificTrends implements SpecificTrendsPacket {
  name: string;
  history: {
    start: number;
    end: number;
    data: SpecificTrendsDataPacket[];
  };

  /**
   * @author Omar Chehab
   */
  constructor(packet: SpecificTrendsPacket) {
    this.name = packet.name;
    this.history = packet.history;
  }
}

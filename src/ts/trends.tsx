import {TrendsPacket, TrendPacket} from './network-bus';

/**
 * Trends is an implementation of the news packet received from the endpoint.
 * This class is used solely for the purpose of encapsulating the operations
 * on the data.
 * @author Omar Chehab
 */
export class Trends implements TrendsPacket {
  trends: TrendPacket[];

  /**
   * @author Omar Chehab
   */
  constructor(packet: TrendsPacket) {
    this.trends = packet.trends;
  }
}

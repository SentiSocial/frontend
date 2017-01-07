import {TrendsPacket} from './network-bus';

/**
 * Trends is an implementation of the news packet received from the endpoint.
 * This class is used solely for the purpose of encapsulating the operations
 * on the data.
 * @author Omar Chehab
 */
export class Trends implements TrendsPacket {
  id: number;
  name: string;
  sentiment: number;

  /**
   * @author Omar Chehab
   */
  constructor(packet: TrendsPacket) {
    this.id = packet.id;
    this.name = packet.name;
    this.sentiment = packet.sentiment;
  }
}

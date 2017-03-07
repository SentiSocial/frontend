/*
interface TrendPacket {
  name: string;
  history: [{
    sentiment: number;
    timestamp: number;
  }];
}; */

/**
 * SpecificTrends is an implementation of the news packet received from the
 * endpoint.
 *
 * name: string;
 * history: TrendHistory[];
 */
export default class {
  /**
   * @param {Object}  packet
   */
  constructor (packet) {
    this.name = packet.name
    this.history = packet.history
      .map(data => new TrendHistory(data))
  }
}

/**
 *
 * sentiment: number;
 * timestamp: number;
 */
export class TrendHistory {
  constructor (data) {
    this.sentiment = data.sentiment
    this.timestamp = data.timestamp
  }
}

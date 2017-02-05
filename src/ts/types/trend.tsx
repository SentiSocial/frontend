export interface TrendPacket {
  name: string;
  history: TrendHistoryPacket[];
};

export interface TrendHistoryPacket {
  sentiment: number;
  timestamp: number;
};

/**
 * SpecificTrends is an implementation of the news packet received from the
 * endpoint. This class is used solely for the purpose of encapsulating the
 * operations on the data.
 * @author Omar Chehab
 */
export class Trend implements TrendPacket {
  name: string;
  history: TrendHistory[];
  /**
   * @author Omar Chehab
   */
  constructor(packet: TrendPacket) {
    this.name = packet.name;
    this.history = packet.history.map(data => new TrendHistory(data));
  }
}

export class TrendHistory implements TrendHistoryPacket {
  sentiment: number;
  timestamp: number;

  /**
   * @author Omar Chehab
   */
  constructor(data: TrendHistoryPacket) {
    this.sentiment = data.sentiment;
    this.timestamp = data.timestamp;
  }
}

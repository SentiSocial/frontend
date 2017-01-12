export interface AllTrendsPacket {
  trends: AllTrendsDataPacket[]
};

export interface AllTrendsDataPacket {
  name: string;
  sentiment: number;
};

/**
 * Trends is an implementation of the alltrends packet received from the server.
 * This class is used solely for the purpose of encapsulating the operations
 * on the data.
 * @author Omar Chehab
 */
export class AllTrends implements AllTrendsPacket {
  trends: AllTrendsData[];

  /**
   * @author Omar Chehab
   */
  constructor(packet: AllTrendsPacket) {
    this.trends = packet.trends.map(trendData => new AllTrendsData(trendData));
  }
}

export class AllTrendsData implements AllTrendsDataPacket {
  name: string;
  sentiment: number;

  /**
   * @author Omar Chehab
   */
  constructor(trendData: AllTrendsDataPacket) {
    this.name = trendData.name;
    this.sentiment = trendData.sentiment;
  }

}

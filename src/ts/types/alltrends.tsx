/**
 * /v1/alltrends endpoint's response
 */
export interface AllTrendsPacket {
  trends: AllTrendsTrendPacket[];
};

/**
 * AllTrends is an implementation of the alltrends packet received from the
 * SentiSocial REST API.
 * @author Omar Chehab
 */
export class AllTrends implements AllTrendsPacket {
  public trends: AllTrendsTrend[];

  /**
   * Creates objects from the trends
   * @param {AllTrendsPacket}  packet  response from /v1/alltrends endpoint
   */
  constructor(packet: AllTrendsPacket) {
    this.trends = packet.trends
      .map(trendData => new AllTrendsTrend(trendData));
  }
}

export interface AllTrendsTrendPacket {
  name: string;
  sentiment: number;
};

export class AllTrendsTrend implements AllTrendsTrendPacket {
  public name: string;
  public sentiment: number;

  /**
   * Used by the AllTrends class.
   * @param {AllTrendsDataPacket}  packet
   */
  constructor(trendData: AllTrendsTrendPacket) {
    this.name = trendData.name;
    this.sentiment = trendData.sentiment;
  }

}

/*
/v1/alltrends
interface AllTrendsPacket {
  trends: [{
    name: string;
    sentiment: number;
  }];
}; */

/**
 * AllTrends is an implementation of the alltrends packet received from the
 * SentiSocial REST API.
 *
 * trends: AllTrendsTrend[];
 *
 * @author Omar Chehab
 */
export default class {
  /**
   * @param {AllTrendsPacket}  packet  response from /v1/alltrends endpoint
   */
  constructor (packet) {
    this.trends = packet.trends
      .map(trendData => new AllTrendsTrend(trendData))
  }
}

/**
 * Used by the AllTrends class.
 *
 * name: string;
 * sentiment: number;
 */
export class AllTrendsTrend {
  /**
   * @param {AllTrendsDataPacket}  packet
   */
  constructor (trendData) {
    this.name = trendData.name
    this.sentiment = trendData.sentiment
  }
}

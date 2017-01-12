export interface TweetPacket {
  id: string;
};

/**
 * Tweet is an implementation of the tweet packet received from the endpoint.
 * This class is used solely for the purpose of encapsulating the operations
 * on the data.
 * @author Omar Chehab
 */
export class Tweet implements TweetPacket {
  id: string;

  /**
   * @author Omar Chehab
   */
  constructor(packet: TweetPacket) {
    this.id = packet.id;
  }
}

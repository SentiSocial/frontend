// Forked from https://github.com/aharshac/react-relative-time
import { h, Component } from 'preact';

export default class RelativeTime extends Component {
  static defaultProps = {
    titleFormat: 'iso8601',
  }

  /* Strings for time difference */
  tokens = {
    prefixAgo: null,
    prefixFromNow: null,
    suffixAgo: 'ago',
    suffixFromNow: 'from now',
    inPast: 'any moment now',
    seconds: 'a few seconds',
    minute: 'a minute',
    minutes: '%d minutes',
    hour: 'an hour',
    hours: '%d hours',
    day: 'a day',
    days: '%d days',
    month: 'a month',
    months: '%d months',
    year: 'a year',
    years: '%d years',
    wordSeparator: ' ',
    numbers: []
  }


  /* Convert string time to Date() */
  parseTimestring(iso8601) {
    let str = iso8601.trim();
    str = str.replace(/\.\d+/,''); // remove milliseconds
    str = str.replace(/-/,'/').replace(/-/,'/');
    str = str.replace(/T/,' ').replace(/Z/,' UTC');
    str = str.replace(/([+-]\d\d):?(\d\d)/,' $1$2'); // -04:00 -> -0400
    str = str.replace(/([+-]\d\d)$/,' $100'); // +09 -> +0900
    return new Date(str);
  }


  /* Replace %d in token with number */
  substituteToken (string, number) {
    let value = (this.tokens.numbers && this.tokens.numbers[number]) || number;
    return string.replace(/%d/i, value);
  }


  /* Relative time in words */
  relativeTimeString(date) {
    if (!(date instanceof Date)) {
      return '';
    }

    const delta = Date.now() - date.getTime();

    let prefix = this.tokens.prefixAgo;
    let suffix = this.tokens.suffixAgo;

    /* Future */
    if (delta < 0) {
      prefix = this.tokens.prefixFromNow;
      suffix = this.tokens.suffixFromNow;
    }

    let seconds = Math.abs(delta) / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    let years = days / 365;


    let words;

    if (seconds < 45) {
      words = this.substituteToken(this.tokens.seconds, Math.round(seconds));

    } else if (seconds < 90) {
      words = this.substituteToken(this.tokens.minute, 1);

    } else if (minutes < 45) {
      words = this.substituteToken(this.tokens.minutes, Math.round(minutes));

    } else if (minutes < 90) {
      words = this.substituteToken(this.tokens.hour, 1);

    } else if (hours < 22) {
      words = this.substituteToken(this.tokens.hours, Math.round(hours));

    } else if (hours < 35) {
      words = this.substituteToken(this.tokens.day, 1);

    } else if (days < 25) {
      words = this.substituteToken(this.tokens.days, Math.round(days));

    } else if (days < 45) {
      words = this.substituteToken(this.tokens.month, 1);

    } else if (days < 365) {
      words = this.substituteToken(this.tokens.months, Math.round(days / 30));

    } else if (years < 1.5) {
      words = this.substituteToken(this.tokens.year, 1);

    } else {
      words = this.substituteToken(this.tokens.years, Math.round(years));

    }


    return [prefix, words, suffix].join(this.tokens.wordSeparator).trim();
  }


  /* Generate time string in specifier pattern */
  format(date, pattern) {
    if (!(date instanceof Date)) {
      return '';
    }

    if (pattern.toLowerCase() === 'iso8601') {
      return date.toISOString();
    }

    let patterns = {
      M: date.getMonth() + 1,
      D: date.getDate(),
      H: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds()
    };

    // replace M, D, H, m, s
    pattern = pattern.replace(/(M+|D+|H+|m+|s+)/g, function(test) {
      const key = test.slice(-1);
      return ((test.length > 1 ? '0' : '') + patterns[key]).slice(-2);
    });

    // replace Y
    return pattern.replace(/(Y+)/g, function(test) {
      return date.getFullYear().toString().slice(-test.length);
    });
  }


  /* Display */
  render() {
    let {
        value, titleFormat,
        ...props
    } = this.props;


    /* Type conversion */
    let date;

    if (value instanceof Date) {
      date = value;

    } else if (typeof value === 'string') {
      date = this.parseTimestring(value);

    } else if (typeof value === 'number') {
      date = new Date(value);

    } else {
      return <span>Invalid date</span>;

    }


    /* Format conversion */
    let machineReadable = this.format(date, 'iso8601');    //  ISO-8601
    let humanReadable = this.relativeTimeString(date);

    return (
        <time
            title={this.format(date, titleFormat)}
            {...props}
            dateTime={machineReadable}>
            {humanReadable}
        </time>
    );
  }
}
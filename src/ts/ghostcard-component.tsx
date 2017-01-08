import * as React from 'react';

import {fiftyFifty, randomRange} from './utility';

export function GhostCard(props) {
  // couldn't make it inline for some reason won't bother with figuring out how.
  var extraGhostLineForPolishUno: any = false
  if (fiftyFifty()) {
    extraGhostLineForPolishUno = <span style={{
        height: '12px',
        borderRadius: '15px',
        float: 'left',
        width: '100%',
        marginBottom: '6px',
        backgroundColor: fiftyFifty() ? '#ddd' : '#eee',
    }}></span>;
  }
  // couldn't make it inline for some reason won't bother with figuring out how.
  var extraGhostLineForPolishDos: any = false
  if (fiftyFifty()) {
    extraGhostLineForPolishDos = <span style={{
        height: '12px',
        borderRadius: '15px',
        float: 'left',
        width: '100%',
        marginBottom: '6px',
        backgroundColor: fiftyFifty() ? '#ddd' : '#eee',
    }}></span>;
  }
  return (
    <div className="card col-xs-12">
      <span style={{
          height: '12px',
          borderRadius: '15px',
          float: 'left',
          width: (randomRange(45, 75))+'%',
          backgroundColor: fiftyFifty() ? '#ddd' : '#eee',
      }}>
      </span>
      <span style={{
          height: '12px',
          borderRadius: '15px',
          float: 'right',
          width: '28px',
          backgroundColor: fiftyFifty() ? '#ddd' : '#eee',
      }}>
      </span>
      <span style={{
          height: '12px',
          borderRadius: '15px',
          float: 'left',
          width: '100%',
          backgroundColor: fiftyFifty() ? '#ddd' : '#eee',
          margin: '12px 0 6px 0',
      }}>
      </span>
      {extraGhostLineForPolishUno}
      {extraGhostLineForPolishDos}
      <span style={{
          height: '12px',
          borderRadius: '15px',
          float: 'left',
          width: (randomRange(20, 60))+'%',
          backgroundColor: fiftyFifty() ? '#ddd' : '#eee',
      }}>
      </span>
    </div>
  );
}

export function EndOfContent(props) {
  return (
    <p style={{
      lineHeight: '40px',
      textAlign: 'center',
      color: '#ccc',
    }}>
      Powered by <a href="newsapi.org">NewsAPI.org</a>
    </p>
  );
}

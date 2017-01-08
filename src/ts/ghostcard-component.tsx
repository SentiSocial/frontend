import * as React from 'react';

export function GhostCard(props) {
  return (
    <div className="card col-xs-12">
      <span style={{
          height: '12px',
          borderRadius: '15px',
          float: 'left',
          width: '60%',
          backgroundColor: '#ddd',
      }}>
      </span>
      <span style={{
          height: '12px',
          borderRadius: '15px',
          float: 'right',
          width: '28px',
          backgroundColor: '#eee',
      }}>
      </span>
      <span style={{
          height: '12px',
          borderRadius: '15px',
          float: 'left',
          width: '100%',
          backgroundColor: '#ddd',
          margin: '12px 0 6px 0',
      }}>
      </span>
      <span style={{
          height: '12px',
          borderRadius: '15px',
          float: 'left',
          width: '45%',
          backgroundColor: '#ddd',
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
      End of content
    </p>
  );
}

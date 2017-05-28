import {h, Component} from 'preact'

module.exports = {
  Bar: class Bar extends Component {
    render ({
      width,
      height,
      onElementsClick,
      style
    }) {
      return (
        <canvas width={width}
          height={height}
          style={style}
          onElementsClick={onElementsClick} />
      )
    }
  }
}

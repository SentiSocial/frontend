import { h, Component } from 'preact'
import * as d3 from 'd3'
import d3Cloud from 'd3-cloud'

class KeywordCloud extends Component {
  componentDidMount() {
    const {
      keywords,
    } = this.props
    this.wordCloud = d3Cloud()
      .size([260, 260])
      .words(keywords)
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font('Impact')
      .fontSize(d => d.size)
      .on('end', this.draw.bind(this));

    this.wordCloud.start();
  }

  draw(words) {
    const {
      id,
    } = this.props
    const fill = d3.scaleOrdinal(d3.schemeCategory10);
    d3.select(`#${id}`).append('svg')
        .attr('width', this.wordCloud.size()[0])
        .attr('height', this.wordCloud.size()[1])
      .append('g')
        .attr('transform', 'translate(' + this.wordCloud.size()[0] / 2 + ',' + this.wordCloud.size()[1] / 2 + ')')
      .selectAll('text')
        .data(words)
      .enter().append('text')
        .style('font-size', d => d.size + 'px')
        .style('font-family', 'Impact')
        .style('fill', (d, i) => fill(i))
        .attr('text-anchor', 'middle')
        .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
        .text(d => d.text);
  }

  render() {
    const {
      id,
    } = this.props
    return (
      <div id={id} />
    )
  }
}

export default KeywordCloud
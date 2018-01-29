import { h, Component } from 'preact'
import * as d3 from 'd3'
import {geoOrthographic, geoPath, geoCentroid} from 'd3-geo'
import {queue} from 'd3-queue'
import * as topojson from 'topojson'

class WorldMap extends Component {
  componentDidMount() {
    const {
      id,
      locations,
    } = this.props

    var width = 258,
        height = 258;

    var projection = geoOrthographic()
        .translate([width / 2, height / 2])
        .scale(width / 2 - 20)
        .clipAngle(90)
        .precision(0.6);

    var canvas = d3.select(`#${id}`).append("canvas")
        .attr("width", width)
        .attr("height", height);

    var c = canvas.node().getContext("2d");

    var path = geoPath()
        .projection(projection)
        .context(c);

    var title = d3.select(`#${id}-country`);

    queue()
        .defer(d3.json, "/assets/data/world-110m.json")
        .defer(d3.tsv, "/assets/data/world-country-names.tsv")
        .await(ready);

    function ready(error, world, names) {
      if (error) throw error;

      var globe = {type: "Sphere"},
          land = topojson.feature(world, world.objects.land),
          countries = topojson.feature(world, world.objects.countries).features,
          borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b),
          i = -1,
          n = countries.length;
      countries = countries.filter(d => 
        names.some(function(n) {
          if (d.id == n.id) {
            d.acronym = d.acronym
            return d.name = n.name;
          }
        })
      ).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      countries = countries.filter((country) => locations.some(l => l === country.acronym))

      function transition() {
        d3.transition()
            .duration(1250)
            .on("start", function() {
              title.text(countries[i = (i + 1) % n].name);
            })
            .tween("rotate", function() {
              var p = geoCentroid(countries[i]),
                  r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
              return function(t) {
                projection.rotate(r(t));
                c.clearRect(0, 0, width, height);
                c.fillStyle = "#ccc", c.beginPath(), path(land), c.fill();
                c.fillStyle = "#f00", c.beginPath(), path(countries[i]), c.fill();
                c.strokeStyle = "#fff", c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
                c.strokeStyle = "#000", c.lineWidth = .5, c.beginPath(), path(globe), c.stroke();
              };
            })
          .transition()
            .on("end", transition)
      }
      transition();
    }

    d3.select(self.frameElement).style("height", height + "px");
  }

  render() {
    const {
      id,
    } = this.props
    return (
      <div>
        <div id={id} />
        <p id={id + '-country'}></p>
      </div>
    )
  }
}

export default WorldMap

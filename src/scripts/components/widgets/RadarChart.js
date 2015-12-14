import R from "ramda";
import Radar from "paths-js/radar";
import React from "react";

export default class RadarChart extends React.Component {
  get labels() {
    const {data} = this.props;

    return data && data[0] && R.keys(data[0]);
  }

  curve = ({polygon: {path}}, key) => {
    const circles = path.points().map(([x, y], key) => {
      return <circle key={key}
                     cx={`${x}`}
                     cy={`${y}`}
                     fill="white"
                     fillOpacity="0.8"
                     stroke="white"
                     strokeWidth="2"
                     r="4" />;
    });

    return (
      <g key={key}>
        <path d={path.print()}
              fill="transparent"
              strokeWidth="2"
              opacity="0.4"
              stroke="white" />

        {circles}
      </g>
    );
  };

  ring = ({path}, key) => {
    if (key === 5) return path.points().map((point, key) => {
      const translate = this.translate(
        cord => Math.floor(1 * cord),
        point,
        [0, 8]
      );

      return (
        <text key={key}
              fontSize="14"
              fill="white"
              textAnchor="middle"
              transform={translate}>
          {this.labels[key]}
        </text>
      );
    });

    return (
      <path key={key} d={path.print()} fill="orange" opacity={0.1 * (key + 1)} />
    );
  };

  translate(map, cords, offsets = [0, 0]) {
    const translated = R.compose(
      R.join(","),
      R.zipWith(R.add, offsets),
      R.map(map),
    )(cords);

    return `translate(${translated})`;
  }

  render() {
    const merged = R.merge({
      data: [],
      width: 400,
      height: 400
    }, this.props);

    const {
      height,
      width
    } = merged; 

    const data = R.map(
      R.map(value => value * 23),
      merged.data
    );

    const paths = Radar({data, rings: 6, max: 140, r: 140, center: [0, 0]});

    const translate = this.translate(
      cord => cord / 2,
      [width, height]
    );

    const score = (R.compose(
      R.reduce(R.add, 0),
      R.values,
    )(this.props.data[0]) / this.labels.length).toPrecision(2);

    return (
      <svg style={{backgroundColor: "#2A2A2A"}}
           height={height}
           width={width}
           className="radar-chart">

        <g transform={translate}>
          {paths.rings.map(this.ring)}
          {paths.curves.map(this.curve)}
          <text textAnchor="middle"
                dominantBaseline="hanging"
                transform="translate(0,12)"
                fill="white"
                fontSize="32">
            {score}
          </text>
        </g>
      </svg>
    );
  }
};

import { withIdentifier } from 'codelyzer/util/astQuery';
import { Component } from '@angular/core';
import * as d3 from 'd3';
//declare const d3;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public force: any;
  public width = 960;
  height = 500;
  constructor() {

  }



  public data = {
    nodes: [{
      "name": "node1",
      "group": 1
    }, {
      "name": "node2",
      "group": 1
    }, {
      "name": "node3",
      "group": 1
    }, {
      "name": "node4",
      "group": 1
    }, {
      "name": "node5",
      "group": 1
    }, {
      "name": "node6",
      "group": 2
    }, {
      "name": "node7",
      "group": 2
    }, {
      "name": "nod8",
      "group": 2
    }, {
      "name": "node9",
      "group": 3
    }, {
      "name": "node10",
      "group": 3
    }, {
      "name": "node11",
      "group": 3
    }],
    links: [{
      "source": 0,
      "target": 1
    }, {
      "source": 0,
      "target": 2
    }, {
      "source": 0,
      "target": 3
    }, {
      "source": 0,
      "target": 4
    }, {
      "source": 1,
      "target": 2
    }, {
      "source": 1,
      "target": 3
    }, {
      "source": 1,
      "target": 4
    }, {
      "source": 2,
      "target": 3
    }, {
      "source": 2,
      "target": 4
    }, {
      "source": 0,
      "target": 5
    }, {
      "source": 5,
      "target": 6
    }, {
      "source": 5,
      "target": 7
    }, {
      "source": 0,
      "target": 8
    }, {
      "source": 0,
      "target": 9
    }, {
      "source": 0,
      "target": 10
    }, {
      "source": 8,
      "target": 7
    }]
  }
  ngOnInit() {

    this.createforcelayout();
  }


  public createforcelayout() {
    var width = 960,
      height = 500
    this.force = d3.forceSimulation()
      .force("charge", d3.forceManyBody().strength(-700).distanceMin(100).distanceMax(1000))
      .force("link", d3.forceLink().id(function (d: any) { return d.index }))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))
      .force("y", d3.forceY(0.001))
      .force("x", d3.forceX(0.001))
      

    var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .on('mousedown',()=>{
           d3.event.stopPropagation();
      })
      svg
      .call(d3.zoom()      
      .on("zoom",()=>{
         svg.attr("transform", d3.event.transform);
      }));
      

    var color = function (group) {
      if (group == 1) {
        return "#aaa"
      } else if (group == 2) {
        return "#fbc280"
      } else {
        return "#405275"
      }
    }


    this.force
      .nodes(this.data.nodes)
      .force("link", d3.forceLink(this.data.links).strength(1).distance(200))

    var link = svg.selectAll(".link")
      .data(this.data.links)
      .enter()
      .append("line")
      .attr('stroke', 'aqua')
      .attr("class", "link");

    var node = svg.selectAll(".node")
      .data(this.data.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .on('mousedown',()=>{
           d3.event.stopPropagation();
      })
      .on("dragstart", (d: any) => {
        if (!d3.event.active) this.force.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        console.log('dragstart');
      })
      .on("drag", (d: any) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
        console.log('drag');
      })
      .on("dragend", (d: any) => {
        if (!d3.event.active) this.force.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        console.log('dragend');
      });

    node.append('circle')
      .attr('r', 13)
      .attr('fill', function (d: any) {
        return color(d.group);
      });

    node.append("text")
      .attr("dx", -18)
      .attr("dy", 8)
      .style("font-family", "overwatch")
      .style("font-size", "8px")

      .text(function (d: any) {
        return d.name
      });

    this.force.on("tick", function () {
      link.attr("x1", function (d: any) {
        return d.source.x;
      })
        .attr("y1", function (d: any) {
          return d.source.y;
        })
        .attr("x2", function (d: any) {
          return d.target.x;
        })
        .attr("y2", function (d: any) {
          return d.target.y;
        });
      node.attr("transform", function (d: any) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    });
  }

  public dragstarted(d) {
    if (!d3.event.active) this.force.restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  public dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  public dragended(d) {
    d.fx = null;
    d.fy = null;
  }

}

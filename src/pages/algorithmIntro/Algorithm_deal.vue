<template>
  <div id="tree-container"></div>
</template>

<!--src="./script.js"-->
<script setup>

// import $ from 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js'
// import * as d3 from 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js';
import $ from 'jquery'
import * as d3 from 'd3';
import { reactive, onMounted } from "vue";



onMounted(() => {
  var json =

      {
        "name": "Grandmother Akkapeddi",
        "children": [{
          "name": "Person1",
          "children": [{
            "name": "Child1",
            "children": [{
              "name": "person3",
              "size": 3938
            }, {
              "name": "person4",
              "size": 3812
            }]
          }]
        }, {
          "name": "Person3",
          "children": [{
            "name": "Eleanor",
            "size": 17010
          }, {
            "name": "Amadeus",
            "children": [{
              "name": "Monday",
              "size": 1983
            }, {
              "name": "Coco",
              "size": 2047
            }, {
              "name": "Frida",
              "size": 1375
            }]
          }]
        }, {
          "name": "Person5",
          "children": [{
            "name": "Sam",
            "children": [{
              "name": "Kate",
              "size": 721
            }]
          }]
        }, {
          "name": "Person6",
          "children": [{
            "name": "Theo",
            "size": 8833
          }, {
            "name": "someotherwhitename",
            "size": 1732
          }, {
            "name": "Nandhi",
            "size": 3623
          }]
        }, {
          "name": "Person7",
          "children": [{
            "name": "Dragan",
            "size": 1082
          }]
        }, {
          "name": "Person8",
          "children": [{
            "name": "topher",
            "size": 1616
          }, {
            "name": "And",
            "size": 1027
          }, {
            "name": "Aan",
            "size": 3891
          },{
            "name": "mirchi",
            "children": [{
              "name": "add",
              "size": 593
            }, {
              "name": "pancake",
              "size": 330
            }]
          }]
        }, {
          "name": "Person9",
          "children": [{
            "name": "Sumac",
            "size": 2105
          }, {
            "name": "Sunday",
            "size": 1316
          }]
        }, {
          "name": "Aan",
          "children": [{
            "name": "Frank",
            "children": [{
              "name": "Theo",
              "size": 9354
            }, {
              "name": "San",
              "size": 1233
            }]
          }, {
            "name": "Ma",
            "size": 335
          }, {
            "name": "L",
            "children": [{
              "name": "Elle",
              "size": 3165
            }, {
              "name": "Saturday",
              "size": 2815
            }, {
              "name": "Mr.Bean",
              "size": 3366
            }]
          }]
        }]
      };

  var treeData = json;
  var totalNodes = 0;
  var maxLabelLength = 0;
// variables for drag/drop
  var selectedNode = null;
  var draggingNode = null;
// panning variables
  var panSpeed = 200;
  var panBoundary = 20; // Within 20px from edges will pan when dragging.
// Misc. variables
  var i = 0;
  var duration = 750;
  var root;

// size of the diagram
  var viewerWidth = $(document).width();
  var viewerHeight = $(document).height();
  var tree = d3.layout.tree()
      .size([viewerHeight, viewerWidth])
  var diagonal = d3.svg.diagonal()
      .projection(function(d) {
        return [d.y, d.x];
      });
  function pan(domNode, direction) {
    var speed = panSpeed;
    if (panTimer) {
      clearTimeout(panTimer);
      var translateCoords = d3.transform(svgGroup.attr("transform"));
      if (direction == 'left' || direction == 'right') {
        var translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
        var translateY = translateCoords.translate[1];
      } else if (direction == 'up' || direction == 'down') {
        translateX = translateCoords.translate[0];
        translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
      }
      var scaleX = translateCoords.scale[0];
      var scaleY = translateCoords.scale[1];
      var scale = zoomListener.scale();
      svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
      d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
      zoomListener.scale(zoomListener.scale());
      zoomListener.translate([translateX, translateY]);
      var panTimer = setTimeout(function() {
        pan(domNode, speed, direction);
      }, 50);
    }
  }
  var baseSvg = d3.select("#tree-container").append("svg")
      .attr("width", viewerWidth)
      .attr("height", viewerHeight)
      .attr("class", "overlay")
      .call(zoomListener);

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  function expand(d) {
    if (d._children) {
      d.children = d._children;
      d.children.forEach(expand);
      d._children = null;
    }
  }
  function centerNode(source) {
    var scale = zoomListener.scale();
    var x = -source.y0;
    var y = -source.x0;
    x = x * scale + viewerWidth / 2;
    y = y * scale + viewerHeight / 2;
    d3.select('g').transition()
        .duration(duration)
        .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
    zoomListener.scale(scale);
    zoomListener.translate([x, y]);
  }

  function toggleChildren(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else if (d._children) {
      d.children = d._children;
      d._children = null;
    }
    return d;
  }
  function click(d) {
    if (d3.event.defaultPrevented) return; // click suppressed
    d = toggleChildren(d);
    update(d);
    centerNode(d);
  }

  function update(source) {
    var levelWidth = [1];
    var childCount = function(level, n) {

      if (n.children && n.children.length > 0) {
        if (levelWidth.length <= level + 1) levelWidth.push(0);

        levelWidth[level + 1] += n.children.length;
        n.children.forEach(function(d) {
          childCount(level + 1, d);
        });
      }
    };
    childCount(0, root);
    var newHeight = d3.max(levelWidth) * 105;
    tree = tree.size([newHeight, viewerWidth]);
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);
    nodes.forEach(function(d) {
      d.y = (d.depth * (maxLabelLength * 10));
    });
    var node = svgGroup.selectAll("g.node")
        .data(nodes, function(d) {
          return d.id || (d.id = ++i);
        });
    var nodeEnter = node.enter().append("g")
        .call(dragListener)
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);
    nodeEnter.append("circle")
        .attr('class', 'nodeCircle')
        .attr("r", 0)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });
    nodeEnter.append("text")
        .attr("x", function(d) {
          return d.children || d._children ? -10 : 10;
        })
        .attr("dy", ".35em")
        .attr('class', 'nodeText')
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function(d) {
          return d.name;
        })
        .style("fill-opacity", 0);
    nodeEnter.append("circle")
        .attr('class', 'ghostCircle')
        .attr("r", 30)
        .attr("opacity", 0.2)
        .style("fill", "red")
        .attr('pointer-events', 'mouseover')
        .on("mouseover", function(node) {
          overCircle(node);
        })
        .on("mouseout", function(node) {
          outCircle(node);
        });
    node.select('text')
        .attr("x", function(d) {
          return d.children || d._children ? -30 : 30;
        })
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function(d) {
          return d.name;
        });
    node.select("circle.nodeCircle")
        .attr("r", 20.5)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "url(#img1)";
        });
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });
    nodeUpdate.select("text")
        .style("fill-opacity", 1);
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();
    nodeExit.select("circle")
        .attr("r", 0);
    nodeExit.select("text")
        .style("fill-opacity", 0);
    var link = svgGroup.selectAll("path.link")
        .data(links, function(d) {
          return d.target.id;
        });
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {
            x: source.x0,
            y: source.y0
          };
          return diagonal({
            source: o,
            target: o
          });
        });
    link.transition()
        .duration(duration)
        .attr("d", diagonal);
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {
            x: source.x,
            y: source.y
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .remove();
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
  var svgGroup = baseSvg.append("g");
  root = treeData;
  root.x0 = viewerHeight / 2;
  root.y0 = 0;
  update(root);
  centerNode(root);





  // function visit(parent, visitFn, childrenFn) {
  //   if (!parent) return;
  //   visitFn(parent);
  //   var children = childrenFn(parent);
  //   if (children) {
  //     var count = children.length;
  //     for (var i = 0; i < count; i++) {
  //       visit(children[i], visitFn, childrenFn);
  //     }
  //   }
  // }
  // visit(treeData, function(d) {
  //   totalNodes++;
  //   maxLabelLength = Math.max(d.name.length, maxLabelLength);
  //
  // }, function(d) {
  //   return d.children && d.children.length > 0 ? d.children : null;
  // });


// // sort the tree according to the node names
//
//   function sortTree() {
//     tree.sort(function(a, b) {
//       return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
//     });
//   }
// // Sort the tree initially incase the JSON isn't in a sorted order.
//   sortTree();

// TODO: Pan function, can be better implemented.





  function zoom() {
    svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }

  const zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

  function initiateDrag(d, domNode) {
    draggingNode = d;
    d3.select(domNode).select('.ghostCircle').attr('pointer-events', 'none');
    d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
    d3.select(domNode).attr('class', 'node activeDrag');

    svgGroup.selectAll("g.node").sort(function(a, b) { // select the parent and sort the path's
      if (a.id != draggingNode.id) return 1; // a is not the hovered element, send "a" to the back
      else return -1; // a is the hovered element, bring "a" to the front
    });
    // if nodes has children, remove the links and nodes
    if (nodes.length > 1) {
      // remove link paths
      var links = tree.links(nodes);
      var nodePaths = svgGroup.selectAll("path.link")
          .data(links, function(d) {
            return d.target.id;
          }).remove();
      // remove child nodes
      var nodesExit = svgGroup.selectAll("g.node")
          .data(nodes, function(d) {
            return d.id;
          }).filter(function(d, i) {
            if (d.id == draggingNode.id) {
              return false;
            }
            return true;
          }).remove();
    }

    // remove parent link
    var parentLink = tree.links(tree.nodes(draggingNode.parent));
    svgGroup.selectAll('path.link').filter(function(d, i) {
      if (d.target.id == draggingNode.id) {
        return true;
      }
      return false;
    }).remove();

    var dragStarted = null;
  }

// define the baseSvg, attaching a class for styling and the zoomListener



// console.log("querySelector id: ", document.querySelector('#tree-container'));
// console.log("querySelector id2: ", document.querySelector('tree-container'));
// console.log("id: ", document.getElementById("tree-container"))
// console.log("d3.select: ", d3.select("#tree-container"))
// console.log("viewerWidth: ", viewerWidth)
// console.log("viewerHeight: ", viewerHeight)
// console.log("zoomListener: ", zoomListener)
  console.log("baseSvg: ", baseSvg)


// Define the drag listeners for drag/drop behaviour of nodes.
  var dragListener = d3.behavior.drag()
      .on("dragstart", function(d) {
        if (d == root) {
          return;
        }
        var dragStarted = true;
        nodes = tree.nodes(d);
        d3.event.sourceEvent.stopPropagation();
        // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
      })
      .on("drag", function(d) {
        if (d == root) {
          return;
        }
        if (dragStarted) {
          var domNode = this;
          initiateDrag(d, domNode);
        }

        // get coords of mouseEvent relative to svg container to allow for panning
        var relCoords = d3.mouse($('svg').get(0));
        if (relCoords[0] < panBoundary) {
          var panTimer = true;
          pan(this, 'left');
        } else if (relCoords[0] > ($('svg').width() - panBoundary)) {

          panTimer = true;
          pan(this, 'right');
        } else if (relCoords[1] < panBoundary) {
          panTimer = true;
          pan(this, 'up');
        } else if (relCoords[1] > ($('svg').height() - panBoundary)) {
          panTimer = true;
          pan(this, 'down');
        } else {
          try {
            clearTimeout(panTimer);
          } catch (e) {

          }
        }

        d.x0 += d3.event.dy;
        d.y0 += d3.event.dx;
        var node = d3.select(this);
        node.attr("transform", "translate(" + d.y0 + "," + d.x0 + ")");
        updateTempConnector();
      }).on("dragend", function(d) {
        if (d == root) {
          return;
        }
        var domNode = this;
        if (selectedNode) {
          // now remove the element from the parent, and insert it into the image elements children
          var index = draggingNode.parent.children.indexOf(draggingNode);
          if (index > -1) {
            draggingNode.parent.children.splice(index, 1);
          }
          if (typeof selectedNode.children !== 'undefined' || typeof selectedNode._children !== 'undefined') {
            if (typeof selectedNode.children !== 'undefined') {
              selectedNode.children.push(draggingNode);
            } else {
              selectedNode._children.push(draggingNode);
            }
          } else {
            selectedNode.children = [];
            selectedNode.children.push(draggingNode);
          }
          // Make sure that the node being added to is expanded so user can see added node is correctly moved
          expand(selectedNode);
          sortTree();
          endDrag();
        } else {
          endDrag();
        }
      });

  function endDrag() {
    selectedNode = null;
    d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
    d3.select(domNode).attr('class', 'node');
    // now restore the mouseover event or we won't be able to drag a 2nd time
    d3.select(domNode).select('.ghostCircle').attr('pointer-events', '');
    updateTempConnector();
    if (draggingNode !== null) {
      update(root);
      centerNode(draggingNode);
      draggingNode = null;
    }
  }

// Helper functions for collapsing and expanding nodes.



  var overCircle = function(d) {
    selectedNode = d;
    updateTempConnector();
  };
  var outCircle = function(d) {
    selectedNode = null;
    updateTempConnector();
  };

  var updateTempConnector = function() {
    var data = [];
    if (draggingNode !== null && selectedNode !== null) {
      data = [{
        source: {
          x: selectedNode.y0,
          y: selectedNode.x0
        },
        target: {
          x: draggingNode.y0,
          y: draggingNode.x0
        }
      }];
    }
    var link = svgGroup.selectAll(".templink").data(data);

    link.enter().append("path")
        .attr("class", "templink")
        .attr("d", d3.svg.diagonal())
        .attr('pointer-events', 'none');

    link.attr("d", d3.svg.diagonal());

    link.exit().remove();
  };

// Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.


/////////////////////////////////////////////////
///////////////// IMAGE DEFS ////////////////////
/////////////////////////////////////////////////

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "img1")
      .attr("patternUnits", "objectBoundingBox")

      .attr("width", "25")
      .attr("height", "25")
      .append("image")

      .attr("xlink:href", "https://dl.dropboxusercontent.com/u/89221222/bean.png")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 40)
      .attr("height", 40);





});

// export default {
//   name: 'Algorithm',
//   // ...
// }
// require('@/pages/algorithmIntro/script.js')
// export default {
//
//   methods: {
//
//   },
//   mounted() {
//     const s = document.createElement('script');
//     s.type = 'module';
//     s.id = 'js1';
//     s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js';
//     document.body.appendChild(s);
//     const s2 = document.createElement('script');
//     s2.type = 'module';
//     s2.id = 'js2';
//     s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js';
//     document.body.appendChild(s2);
//     // const s3 = document.createElement('script');
//     // s3.type = 'module';
//     // s3.id = 'js3';
//     // s3.src = './src/pages/algorithmIntro/script.js';
//     // document.body.appendChild(s3);
//     // console.log(s)
//   },
//   destroyed() {
//     let s = document.getElementById("js1")
//     s.remove()
//     let s2 = document.getElementById("js2")
//     s2.remove()
//     // let s3 = document.getElementById("js3")
//     // s3.remove()
//   }
// }

// export default {
//   mounted() {
//     const script = document.createElement('script');
//     script.src = '/assets/script.js';
//     document.body.appendChild(script);
//   },
//   beforeDestroy() {
//     const scripts = document.querySelectorAll('script[src="/assets/script.js"]');
//     scripts.forEach((script) => {
//       document.body.removeChild(script);
//     });
//   },
// };

onMounted(() => {
  console.log("querySelector id: ", document.querySelector('#tree-container'));
  console.log("querySelector id2: ", document.querySelector('tree-container'));
});

</script>

<style scoped>
@import "./style.css";
#tree-container{
  width: 100%;
  height: 100%;
}
#tree-container svg{
  width: 100%;
  height: 100%;
}
</style>
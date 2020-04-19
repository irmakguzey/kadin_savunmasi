//  TODO: Google API

// Right now we are getting mock form results
// TODO: this should change
const XS = 'XS';
const S = 'S';
const M = 'M';
const L = 'L';
const XL = 'XL';

const Green = 'Green';
const Red = 'Red';
const Blue = 'Blue'

const formResponses = { 
  shirtSize: [XS, M, XL, S, L, XS, XL, S, L, M, S, M, S, XL, XS, S, S, L, S, S, XL, M, XL, S, XL, L, XS, XL, XL, XS, XL, S, XS, XS, XL, XL, S, XL, M, XS, S, XS, XL, XS, XS, M, XL, M, L, XL, XS, M, XS, M, M, L, M, M, XS, XL, S, XL, L, M, L, L, XS, XS, XL, S, XS, S, M, XS, XL, S, S, S, XS, M, L, M, S, S, S, S, L, M, XS, L, M, S, XL, XL, XL, M, M, XS, M, S, XL, XS, M, L, L, M, M, S, XL, XL, S, L, XS, S, S, XL, S, XS, XS, M, XL, XL, M, XS, S, S, M, XS, XL, S, L, XL, XL, XS, L, S, M, XL, L, M, M, M, M, M, XL, L, L, L, XL, M, S, L, XL, S, S, M, L, XS, L, XL, L, XL, L, M, XS, L, L, L, XL, S, S, XL, L, M, XS, XS, XL, M, L, M, XS, M, XL, XS, XL, M, XS, L, M, S, S],
  color: [Green, Red, Blue, Green, Green, Red, Blue, Red, Green, Red, Green, Red, Green, Blue, Green, Blue, Blue, Blue, Blue, Blue, Blue, Red, Red, Green, Red, Green, Green, Red, Green, Red, Blue, Red, Blue, Red, Red, Green, Green, Green, Blue, Blue, Green, Green, Red, Green, Red, Blue, Red, Green, Blue, Red, Red, Green, Green, Red, Red, Red, Red, Red, Blue, Green, Green, Green, Blue, Blue, Green, Blue, Red, Green, Blue, Red, Red, Green, Green, Red, Blue, Green, Green, Red, Green, Red, Red, Red, Red, Blue, Green, Blue, Red, Red, Red, Blue, Blue, Red, Red, Red, Green, Red, Blue, Red, Red, Blue, Green, Green, Blue, Red, Green, Blue, Green, Green, Green, Green, Green, Green, Red, Red, Red, Red, Blue, Green, Blue, Green, Green, Blue, Red, Green, Blue, Blue, Blue, Red, Blue, Blue, Blue, Red, Blue, Green, Red, Blue, Green, Red, Blue, Green, Green, Red, Blue, Green, Red, Blue, Red, Blue, Blue, Red, Red, Blue, Red, Green, Blue, Red, Blue, Red, Red, Red, Blue, Blue, Red, Blue, Red, Blue, Green, Green, Green, Green, Red, Green, Blue, Green, Red, Green, Red, Red, Red, Red, Red, Green, Blue, Green, Red, Red, Red, Blue, Green, Red, Red]
};

const numOfResponses = formResponses.shirtSize.length; // assumption is that there are equal number of answers for each question

// dict for colors and shirtsizes
const colorTypes = [Green, Red, Blue]
const shirtSizeTypes = [XS, S, M, L, XL];

var redraw; 

// This function draws the graph
function createGraph() {

  var g = new Dracula.Graph();
  var width = 1500;
  var height = 900;
  var mainNodesRadius = 30;
  var questionNodesRadiues = 10;


  // Functions for rendering the nodes of the graph
  var mainNodesRender = function(r, n) {
    var label = r.text(5, 5, n.label).attr({
      opacity: 1,
      'font-size': 20,
      'font-weight': '600',
    });
    var set = r.set().push(r.ellipse(5, 5, mainNodesRadius+10, mainNodesRadius).attr({
      'stroke-width': 3, 'stroke': '#696969'
    })).push(label);
    return set
  }

  var questionNodesRender = function(r, n) {
    var set = r.set().push(r.circle(10, 20, questionNodesRadiues).attr({
      opacity: 0.8, fill: '#696969',
    }))    
    return set
  }

  var edgeAttr = {
    'label-style' : {
      'font-size': 17,
      'font-weight': '600',
    },
    'arrow-style': {
      'arrow-end': 'oval[-wide[-long]]',
    },
    'stroke-width': 1,
    fill: '#696969',
    stroke: '#D3D3D3',
    // directed: true,
  }

  // Create the central node
  g.addNode('0', {
    label: numOfResponses.toString(),
    render: mainNodesRender
  });

  // Create the question nodes
  for (var i = 0; i < 2; i++) {
    g.addNode('q'+i, {render: questionNodesRender})
  }

  // First layer of questions
  // Create the answers for the question q0 - color type
  for (var i = 0; i < colorTypes.length; i++) {
    var numOfPeopleWithColor = getNumberOfPeoples(shirtSize='', color=colorTypes[i]);
    g.addNode('q0-'+i, {
      label: numOfPeopleWithColor.toString(),
      render: mainNodesRender
    })
  }

  // Create the answers for the question q0 - shirtSize type
  for (var i = 0; i < shirtSizeTypes.length; i++) {
    var numOfPeopleWithSize = getNumberOfPeoples(shirtSize=shirtSizeTypes[i], color='');
    g.addNode('q1-'+i, {
      label: numOfPeopleWithSize.toString(),
      render: mainNodesRender
    })
  }

  // Create the first layer edges
  g.addEdge('0', 'q0', Object.assign({label: "Color"}, edgeAttr))
  g.addEdge('0', 'q1', Object.assign({label: "Shirt Size"}, edgeAttr))

  for (var i = 0; i < colorTypes.length; i++) {
    g.addEdge('q0','q0-'+i, Object.assign({label: colorTypes[i]}, edgeAttr))
  }

  for (var i = 0; i < shirtSizeTypes.length; i++) {
    g.addEdge('q1','q1-'+i, Object.assign({label: shirtSizeTypes[i]}, edgeAttr))
  }

  // // Create the second layer questions
  // // Create questions for the colors first  
  for (var i = 0; i < colorTypes.length; i++) {
    g.addNode('q0-q'+i, {render: questionNodesRender})
  }
  // // The questions for the shirt size
  // for (var j = 0; j < shirtSizeTypes.length; j++) {
  //   g.addNode('q1-q'+j, {render: questionNodesRender})
  // }

  // Create second layer answers
  // answers to colors - shirtsize
  for (var i = 0; i < colorTypes.length; i++) {
    for (var j = 0; j < shirtSizeTypes.length; j++) {
      var numOfPeople = getNumberOfPeoples(shirtSizeTypes[j], color=colorTypes[i]);
      g.addNode('q0-q'+i+'-'+j, {
        label: numOfPeople.toString(), 
        render: mainNodesRender
      })
    }
  }
  // // answers to shirtsize - colors
  // for (var j = 0; j < shirtSizeTypes.length; j++) {
  //   for (var i = 0; i < colorTypes.length; i++) {
  //     var numOfPeople = getNumberOfPeoples(shirtSize=shirtSizeTypes[j], color=colorTypes[i]);
  //     g.addNode('q1-q'+j+'-'+i, {
  //       label: numOfPeople.toString(), 
  //       render: mainNodesRender
  //     })
  //   }
  // }

  // Create second layer edges
  // for color - shirtsize
  for (var i = 0; i < colorTypes.length; i++) {
    g.addEdge('q0-'+i, 'q0-q'+i, Object.assign({label: "Shirt Size"}, edgeAttr))
  }

  // for (var j = 0; j < shirtSizeTypes.length; j++) {
  //   g.addEdge('q1-'+j, 'q1-q'+j, Object.assign({label: "Color"}, edgeAttr))
  // }

  // edges to colors - shirtsize
  for (var i = 0; i < colorTypes.length; i++) {
    for (var j = 0; j < shirtSizeTypes.length; j++) {
      g.addEdge('q0-q'+i, 'q0-q'+i+'-'+j, Object.assign({label: shirtSizeTypes[j]}, edgeAttr))
    }
  }

  // for (var i = 0; i < colorTypes.length; i++) {
  //   for (var j = 0; j < shirtSizeTypes.length; j++) {
  //     g.addEdge('q1-q'+j, 'q1-q'+j+'-'+i, Object.assign({label: colorTypes[j]}, edgeAttr))
  //   }
  // } 

  
  var layouter = new Dracula.Layout.Spring(g);
  var renderer = new Dracula.Renderer.Raphael('#paper', g, width, height);

  redraw = function() {
    layouter.layout()
    renderer.draw()
  }
  hide = function(id) {
    g.nodes[id].hide()
  }
  show = function(id) {
    g.nodes[id].show()
  };
  redraw()

}




// This method returns the number of people with the given shortsize and color
function getNumberOfPeoples(shirtSize, color) {
  var numOfPeople = 0;
  
  if (shirtSize === '') { // Return the number of people with the given color
    for (var i = 0; i < numOfResponses; i++) {
      if (formResponses.color[i] == color) {
        numOfPeople += 1;
      }
    }
    return numOfPeople;
  }

  if (color === '') { // Return the number of people with the given color
    for (var i = 0; i < numOfResponses; i++) {
      if (formResponses.shirtSize[i] == shirtSize) {
        numOfPeople += 1;
      }
    }
    return numOfPeople;
  }
  
  for (var i = 0; i < numOfResponses; i++) {
    if (formResponses.shirtSize[i] == shirtSize && formResponses.color[i] == color) {
      numOfPeople += 1;
    }
  }
  return numOfPeople;
}
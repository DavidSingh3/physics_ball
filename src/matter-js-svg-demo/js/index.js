var url = 'https://raw.githubusercontent.com/progers/pathseg/master/pathseg.js';

loadGitHubScript(url).then(function () {

  // module aliases
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Composites = Matter.Composites,
      Common = Matter.Common,
      Svg = Matter.Svg,
      Vertices = Matter.Vertices;

  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
      element: document.body,
      engine: engine
  });

  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  var vertexSets = [],
      color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);
  
  $('#svg').find('path').each(function(i, path){
      // vertexSets.push(Svg.pathToVertices(path, 100));
      var v = Bodies.fromVertices(100+(i*80), 80, Svg.pathToVertices(path, 20), {
        render: {
          fillStyle: color,
          strokeStyle: color
        }
      }, true);
    console.log(v)
    vertexSets.push(v);
    // World.add(engine.world, v);
  });
  vertexSets.push(ground)

  // add all of the bodies to the world
  World.add(engine.world, vertexSets);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);

  });
var m = require('makerjs');

function MusicalSiren(scale, shape, toneHoleLength, toneHoleWidth, spaceBetweenRings, insideRingRadius, edgeRadius){

  this.scale = scale;
  this.shape = shape;
  this.toneHoleLength = toneHoleLength;
  this.toneHoleWidth = toneHoleWidth;
  this.spaceBetweenRings = spaceBetweenRings;
  this.insideRingRadius = insideRingRadius
  this.edgeRadius = edgeRadius
 
  this.models = {};
  this.paths = {};

  // Disc Properties
  var discName = "InvertedHarmonicSeries";

  // reverse harmonic series
  var holesPerRingTextInput = scale.split(','); // [2, 4, 6, 8, 10];//[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];

  var holesPerRing = [];
  // round every value so it is an integer

  // convert string input to numbers and then round to nearest int
  for (let index = 0; index < holesPerRingTextInput.length; index++) {
    holesPerRing[index] = Math.round(Number(holesPerRingTextInput[index]));      
  }

  //var genericSpacingFactor = 1.6;
 
  //var ringSpacing = this.toneHoleWidth * genericSpacingFactor;
  
  var overallRingWidth = this.toneHoleWidth + spaceBetweenRings;
  
  var centerHoleRadius = 1.0; //mm
  
  // 4 hole mount hole radius
  var fourHoleMountRadius = 4.0; //mm
  var fourHoleMountHoleRingRadiusFromCenter = 12.0; //mm
  var fourHoleMountHoleRadius = 2.0; //mm
  
  // 6 hole mount hole radius
  var sixHoleMountHoleRingRadiusFromCenter = 47.5 / 2.0; //mm
  var sixHoleMountHoleRadius = 5.2 / 2.0; //mm
  
  // add center point reference in case people want to drill center out or measure from center
  this.models['disc.mount.center'] = new m.models.Ring(centerHoleRadius);
    
  // add four hole mount to musical siren model
  this.models['disc.mount.4Hole'] = new m.models.BoltCircle(fourHoleMountHoleRingRadiusFromCenter, fourHoleMountHoleRadius, 4, 360.0 / 4.0);
  
  // add six hole mount to musical siren model
  this.models['disc.mount.6Hole'] = new m.models.BoltCircle(sixHoleMountHoleRingRadiusFromCenter, sixHoleMountHoleRadius, 6, 360.0 / 6.0);

  if(this.shape == "oval"){
    var circWidthOffset = -1 * (this.toneHoleLength / 2.0);
    
    for (var i = 0; i <= holesPerRing.length; i++){
      //this.models['ring'.concat((i + 1).toString())] = new m.models.BoltCircle(innerRingRadius + (circleRingSpacing * i), this.toneHoleCircleRadius, holesPerRing[i], 360.0 / holesPerRing[i]);
      var circle = m.model.move(new m.models.Oval(this.toneHoleLength, this.toneHoleWidth), [circWidthOffset, insideRingRadius + (overallRingWidth * i)]);
      
      this.models['oval.ring'.concat((i + 1).toString())] = new m.layout.cloneToRadial(circle, holesPerRing[i], 360.0 / holesPerRing[i]);
    }
   
    // add outer disc cut to musical siren model
    this.models['disc.outline'] = new m.models.Ring(insideRingRadius + (holesPerRing.length * overallRingWidth) + this.edgeRadius);
  }
  else if(this.shape == "rectangle"){
    var rectWidthOffset = -1 * (this.toneHoleLength / 2.0);

    // console.log(rectWidthOffset);
    for (var i = 0; i <= holesPerRing.length; i++){
      var rectangle = m.model.move(new m.models.Rectangle(this.toneHoleLength, this.toneHoleWidth), [rectWidthOffset, insideRingRadius + (overallRingWidth * i)]);

      this.models['rectangle.ring'.concat((i + 1).toString())] = new m.layout.cloneToRadial(rectangle, holesPerRing[i], 360.0 / holesPerRing[i]);
    }

    // add outer disc cut to musical siren model
    this.models['disc.outline'] = new m.models.Ring(insideRingRadius + (holesPerRing.length * overallRingWidth) + this.edgeRadius);
  }
  else if(this.shape == "triangle"){
    var trigWidthOffset = (this.toneHoleLength / 2.0);   

    for (var i = 0; i <= holesPerRing.length; i++){
      
      var trigCenterPointY = insideRingRadius + (overallRingWidth * i);
      
      var triangle = m.model.move(new m.models.ConnectTheDots(true, [-trigWidthOffset, trigCenterPointY, trigWidthOffset, (trigCenterPointY + this.toneHoleWidth / 2.0), trigWidthOffset, (trigCenterPointY - this.toneHoleWidth / 2.0)]));

      this.models['triangle.ring'.concat((i + 1).toString())] = new m.layout.cloneToRadial(triangle, holesPerRing[i], 360.0 / holesPerRing[i]);
    }

    // add outer disc cut to musical siren model
    this.models['disc.outline'] = new m.models.Ring(insideRingRadius + (holesPerRing.length * overallRingWidth) + this.edgeRadius);
  }
  else if(this.shape == "diamond"){
    var diamWidthOffset = (this.toneHoleLength / 2.0);   

    for (var i = 0; i <= holesPerRing.length; i++){
      
      var diamCenterPointY = insideRingRadius + (overallRingWidth * i);
      
      var diamond = m.model.move(new m.models.ConnectTheDots(true, [-diamWidthOffset, diamCenterPointY, 0, diamCenterPointY + this.toneHoleWidth / 2.0, diamWidthOffset, diamCenterPointY, 0, diamCenterPointY - this.toneHoleWidth / 2.0]));

      this.models['diamond.ring'.concat((i + 1).toString())] = new m.layout.cloneToRadial(diamond, holesPerRing[i], 360.0 / holesPerRing[i]);
    }

    // add outer disc cut to musical siren model
    this.models['disc.outline'] = new m.models.Ring(insideRingRadius + (holesPerRing.length * overallRingWidth) + this.edgeRadius);
  }
}


MusicalSiren.metaParameters = [
  { title: "scale", type: "text", value: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10"},
  { title: "tone hole shape", type: "select", value: ["circle", "rectangle", "triangle", "diamond"] },
  { title: "tone hole length (mm)", type: "range", min: 1, max: 25, step: 0.1, value: 3.0 },
  { title: "tone hole width (mm)", type: "range", min: 1, max: 15, step: 0.1, value: 3.0 },
  { title: "inter ring distance (mm)", type: "range", min: 1, max: 15, step: 0.1, value: 3.0 }
  //{ title: "reversed", type: "bool", value: false }
  //{ title: "Rectangle: width (mm)", type: "range", min: 1, max: 15, step: 0.1, value: 6.0 },
  //{ title: "Triangle: length (mm)", type: "range", min: 1, max: 15, step: 0.1, value: 6.0 },
  //{ title: "Triangle: width (mm)", type: "range", min: 1, max: 15, step: 0.1, value: 3.0 }
  // TODO calculate tone hole area and display
  // TODO make sure line parameters are correct for laser cutter expectations
];

//TODO add analysis that shows how tune every ring is and give ranked ordinal dropdown for best options first


module.exports = MusicalSiren;

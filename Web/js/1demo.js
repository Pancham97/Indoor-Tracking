var overlay;
function initialize() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(52.5498783, 13.425209099999961),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


  overlay = new DraggableOverlay(map,
                                 map.getCenter(),
                                 '<div class="overlay"><img src="https://u9zyjg-sn3302.files.1drv.com/y4m8v-hzGyqUSLwG9B_MPAboHWGH414AZNE12hIx6OG-Fe7CBlXh0_1Gk2_7mOOvbSrCftvw4EeXFQ61PCT_Zp4eKGqEbqTWJeeCPpDOsj02ZwjccQYPKpWhZEzjqh9QiHtZWN1dIi5fEClmbrR220zAiXG_KbUV4r1-cNcQi-9X3XdYUqaEEvpi6HdpehfbvKVaE0PfUNqbmsiuIzsW--xdQ?width=636&height=590&cropmode=none"></div>'
            );


}
DraggableOverlay.prototype = new google.maps.OverlayView();

DraggableOverlay.prototype.onAdd = function() {
  var container=document.createElement('div'),
      that=this;

  if(typeof this.get('content').nodeName!=='undefined'){
    container.appendChild(this.get('content'));
  }
  else{
    if(typeof this.get('content')==='string'){
      container.innerHTML=this.get('content');
    }
    else{
      return;
    }
  }
  container.style.position='absolute';
  container.draggable=true;
      google.maps.event.addDomListener(this.get('map').getDiv(),
                                       'mouseleave',
                                        function(){
          google.maps.event.trigger(container,'mouseup');
        }
      );


      google.maps.event.addDomListener(container,
                                       'mousedown',
                                   function(e){
        this.style.cursor='move';
        that.map.set('draggable',false);
        that.set('origin',e);

        that.moveHandler  = google.maps.event.addDomListener(that.get('map').getDiv(),
                                                             'mousemove',
                                                             function(e){
          var origin = that.get('origin'),
              left   = origin.clientX-e.clientX,
              top    = origin.clientY-e.clientY,
              pos    = that.getProjection()
                        .fromLatLngToDivPixel(that.get('position')),
              latLng = that.getProjection()
                        .fromDivPixelToLatLng(new google.maps.Point(pos.x-left,
                                                                    pos.y-top));
              that.set('origin',e);
              that.set('position',latLng);
              that.draw();
          });


        }
     );

      google.maps.event.addDomListener(container,'mouseup',function(){
        that.map.set('draggable',true);
        this.style.cursor='default';
        google.maps.event.removeListener(that.moveHandler);
      });


  this.set('container',container)
  this.getPanes().floatPane.appendChild(container);
};

function DraggableOverlay(map,position,content){
  if(typeof draw==='function'){
    this.draw=draw;
  }
  this.setValues({
                 position:position,
                 container:null,
                 content:content,
                 map:map
                 });
}



DraggableOverlay.prototype.draw = function() {
  var pos = this.getProjection().fromLatLngToDivPixel(this.get('position'));
  this.get('container').style.left = pos.x + 'px';
  this.get('container').style.top = pos.y + 'px';
};

DraggableOverlay.prototype.onRemove = function() {
  this.get('container').parentNode.removeChild(this.get('container'));
  this.set('container',null)
};


google.maps.event.addDomListener(window, 'load', initialize);

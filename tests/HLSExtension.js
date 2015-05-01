videojs.plugin('HLSExtension', function(options){
	//the compiled callTech function :(
	//added return
	function N(a, c, d) {
    if (a.h && !a.h.wa)
        a.h.I(function() {
            this[c](d)
        });
    else
        try {
            return a.h[c](d)
        } catch (e) {
  //          throw t.log(e), e;
        }
	}
	videojs.Player.prototype.getHLSBitrates = function(func){
		return N(this, 'getHLSBitrates',[func]);    		
	}
	videojs.Player.prototype.setHLSBitrate = function(bitrate){
		 return N(this, 'setHLSBitrate',bitrate);
	}
	videojs.Player.prototype.setHLSLevel = function(levelIndex){
		 N(this, 'setHLSLevel',levelIndex);
	}
	videojs.Player.prototype.enableHLSDynamicSwitching = function(){
		 N(this, 'enableHLSDynamicSwitching');
	}
	videojs.Flash.prototype.getHLSBitrates = function(args){
		var t = this;
		var del = function(){
			var e = t.el();
			if(e){    			
				var res = e.hls_getHLSBitrates();
				if(args && args.length>0 && args[0]){
					args[0](res);
				}
				return res;
			}
		}
		if(this.player().readyState()>=1){
			return del();
		}else{
			this.player().one('loadedmetadata',del);
		}
	}
	videojs.Flash.prototype.setHLSBitrate = function(bitrate){
		var e = this.el();
		if(e){    			
			var res = e.hls_setHLSBitrate(parseInt(bitrate,10));
		}
	}
	videojs.Flash.prototype.setHLSLevel = function(levelIndex){
		var e = this.el();
		if(e){    			
			e.hls_setHLSLevel(parseInt(levelIndex,10));	
		}
	}
	videojs.Flash.prototype.enableHLSDynamicSwitching = function(){
		var e = this.el();
		if(e){    			
			e.hls_enableHLSDynamicSwitching();
		}
	}
});
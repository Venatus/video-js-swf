(function(){
	var installedGlobal = false;
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
	videojsExtensionMethods = {
		player:{
			getHLSBitrates:function(func){
				return N(this, 'getHLSBitrates',[func]);    		
			},
			setHLSBitrate:function(bitrate){
		 		return N(this, 'setHLSBitrate',bitrate);
			},
			setHLSLevel:function(levelIndex){
		 		N(this, 'setHLSLevel',levelIndex);
			},
			enableHLSDynamicSwitching:function(){
		 		N(this, 'enableHLSDynamicSwitching');
			}			
		},
		flash:{
			getHLSBitrates:function(args){
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
			},
			setHLSBitrate:function(bitrate){
				var e = this.el();
				if(e){    			
					var res = e.hls_setHLSBitrate(parseInt(bitrate,10));
				}
			},
			setHLSLevel:function(levelIndex){
				var e = this.el();
				if(e){    			
					e.hls_setHLSLevel(parseInt(levelIndex,10));	
				}
			},
			enableHLSDynamicSwitching:function(){
				var e = this.el();
				if(e){    			
					e.hls_enableHLSDynamicSwitching();
				}
			}
		}
	}
	function install(options){
		if(installedGlobal) return;
		for(var i in videojsExtensionMethods){
			switch(i){
				case 'player':
					installOnObject(videojs.Player.prototype, videojsExtensionMethods[i], options);
				break;
				case 'flash':
					installOnObject(videojs.Flash.prototype, videojsExtensionMethods[i], options);
				break;
			}
		}
		installedGlobal = true;
	}
	function installOnObject(obj, meths, options){
		for(var i in meths){
			if(!obj[i]){
				obj[i] = meths[i];
			}
		}
	}

	videojs.plugin('HLSExtension', function(options){
		install(options);
	
	});
})()
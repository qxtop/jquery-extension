/* ip */    

$.fn.extend({
	toIpInput: function(){
	    return $(this).each(function(i){
	    	var prefix = parseInt(Math.random() * 10000);
	    	var ip = $(this).val();
	    	var name = $(this).attr('name');
	    	var attr_str = "";
	    	var disabled = this.disabled ? 'disabled' : '';
	    	if($(this).attr('key'))
	    	{
	    		attr_str += "key=" + $(this).attr('key');
	    	}
	    	
	    	ip1 = "";
	    	ip2 = "";
	    	ip3 = "";
	    	ip4 = "";
	    	if(!$.trim(ip) == '')
	    	{
	            var index = 0;
	            ip_arr = ip.split(".");   
	            ip1 = ip_arr[0] || '';
	            ip2 = ip_arr[1] || '';
	            ip3 = ip_arr[2] || '';
	            ip4 = ip_arr[3] || '';
	    	}
	    	
	    	var _o = $(this).clone().get(0);
	    	
	    	var p = $(this).parent().eq(0);
	    	$(this).after(_o);
	    	$(this).after("<input type='text' class='" +($(this).hasClass('bLeftRequire') ? 'bLeftRequire' : '')+ "' style='width:38px;height:21px; ime-mode:disabled;' value='" + ip1 + "' name='"+prefix+"__ip'  " +disabled+ "/>.<input type='text' style='width:38px;height:21px;ime-mode: disabled; ' value='" + ip2 + "' name='"+prefix+"__ip' " +disabled+ "/>.<input type='text' style='width:38px;height:21px;ime-mode: disabled;' value='" + ip3 + "' name='"+prefix+"__ip' " +disabled+ "/>.<input type='text'  style='width:38px;height:21px;ime-mode: disabled;' value='" + ip4 + "' name='"+prefix+"__ip' " +disabled+ "/>");
	    	
	    	for(var i in this)
    		{
    			if( (typeof this[i] == 'string' || typeof this[i] == 'function' ) && typeof _o[i] == 'undefined')
    			{
    				_o[i] = this[i];
    			}
    		}
	    	$(this).remove();
	    	
	    	$(_o).hide().focus(function(){
	    		$(_o).prevAll('input').last().focus();
	    	})

	    	$("input[name='"+prefix+"__ip']").keydown(function(a, e){ 
    	        e = e || window.event || a; 
    	        
    	        if(e.keyCode == 8 && $.trim(this.value) == '')
    	        {
    	        	//Backspace
    	        	var prev = $(this).prev();
    	        	var v = prev.val();
    	        	prev.val('');
    	            prev.focus().val(v);
    	        }
    	        setRealVal();  
    	    }).keyup(function(event){
    	    	setIp.call(this, event);
    	    }).blur(function(){
    	        if(this.value.length >= 3)
    	        {
    	            var vv = this.value.substr(0, 3);
    	            if(parseInt(vv) > 255)
    	            {
    	                vv = 255;
    	            }
    	            this.value = isNaN(parseInt(vv)) ? 0 : parseInt(vv);                                        
    	        }  
    	        setRealVal();  
	    	});
	    	function setIp(e){     
	    	    var v = this.value; 
	    	    if(e.keyCode == 190 || e.keyCode == 110) //按下 '.' 键
	    	    {
	    	        $(this).next().focus();
	    	        $(this).next().val($(this).next().val());
	    	        var val = isNaN(parseInt(v)) ? 0 : parseInt(v);
	    	        val = val < 0 ? -val : val;
		    	    this.value = val;
	    	    }
	    	    else if(v.length > 3)
	    	    {
	    	        var vv = v.substr(0, 3);
	    	        if(parseInt(vv) > 255)
	    	        {
	    	            vv = 255;
	    	        }  
	    	        $(this).next().focus().val(v.substr(3));
	    	        var val = isNaN(parseInt(vv)) ? 0 : parseInt(vv);  
	    	        val = val < 0 ? -val : val;
		    	    this.value = val;
	    	    }
	    	    
	    	    setRealVal();     
	    	}
	    	//对隐藏的input进行赋值
	    	function setRealVal()
	    	{
	    	    var v = "";          
	    	    $("input[name='"+prefix+"__ip']").each(function(){
	    	    	if(this.value != "")
	    	    	{
	    	    		v += "." + this.value;
	    	    	}
	    	        $("input[name='"+name+"']").val(v.substr(1));
	    	    }); 
	    	}
	    });
	}
});


$(function() {
	var fake_data = [{
		name:"dinner with food",
		date:"06/06/2016",
		location:"local",
		event_cat: "education" , 
	},
{
		name:"big party",
		date:"06/12/2016",
		location:"central",
		event_cat: "event" , 
	},
{
		name:"study french",
		date:"07/12/2016",
		location:"central",
		event_cat: "event" , 
	},
{
		name:"go fishing",
		date:"08/06/2016",
		location:"local",
		event_cat: "event" , 
	}
	];
    var start_date  = $( "#start_date" ).datepicker( {onSelect: function(dateText, inst) {
    	
    	start_date_field.val(dateText);
    	start_date.addClass("hidden");

    }
});
    var end_date = $( "#end_date" ).datepicker({onSelect: function(dateText, inst) {
    	
    	end_date_field.val(dateText);
    	end_date.addClass("hidden");

    }
});
    var start_date_field = $("#start_date_field");
    var end_date_field = $("#end_date_field");
    var cat = $('[name="event[]"]');
    var location = null;
    var main_section = $("#main");

    fake_data.map((data)=>{
    	main_section.append("<h1>name:"+data.name+"</h1>");
    	main_section.append("<p>datum:"+data.date+"</p>");
    	main_section.append("<p>plats:"+data.location+"</p>");
    	main_section.append("<p>event-type:"+data.event_cat+"</p>");
    })
    start_date_field.click(function(e){
      console.log(e);
    	start_date.removeClass("hidden");
    	end_date.addClass("hidden");
      e.stopPropagation();

    });

    end_date_field.click(function(e){
    
    	end_date.removeClass("hidden");
    	start_date.addClass("hidden");
      e.stopPropagation();

    });
    start_date.click(function(e){
      e.stopPropagation();
    })
    end_date.click(function(e){
      e.stopPropagation();
    })



$(document).click(function(){
  end_date.addClass("hidden");
  start_date.addClass("hidden");
})



    start_date_field.change(function(){
  
    	start_date.datepicker( "setDate", this.value );
    	start_date.mouseleave();

    })
    end_date_field.change(function(){
  
    	end_date.datepicker( "setDate", this.value );
    })
    var submit = $("#submit").on("click",function(){
   		var filtered_data;
   		location = $('[name="location"]:checked');

   		filter_data = fake_data.filter((data)=>{
   			if(data.location == location.val() || location.val() == "all" || !location.val()){
   				return data;
   			}
   		})
   
   			selected_events = [];
   			cat.filter((c)=>{ if(cat[c].checked == true){ selected_events.push(cat[c].value)}})
   			
   			if(selected_events.length != 0){
   				filter_data = filter_data.filter((data) => {
 					if( selected_events.indexOf(data.event_cat) != -1 ){
 						return data;
 					}
   				});
   			}
   			
   				selected_start_date = (start_date_field.val()) ? new Date(start_date_field.val()).getTime() / 1000 : new Date("1970-01-01").getTime() / 1000;
   				selected_end_date = (end_date_field.val()) ? new Date(end_date_field.val()).getTime() / 1000 : new Date("2045-01-01").getTime() / 1000;

   				filter_data = filter_data.filter((data) => {
   					check_date_data  = new Date(data.date).getTime()/1000;
   					if(check_date_data > selected_start_date && check_date_data < selected_end_date){
   						return data;
   					}
   				});

  
   
   			if(filter_data.length == 0 ){
   				main_section.html("no results found");
   			}else{

   				main_section.html("");
    			filter_data.map((data)=>{
    				main_section.append("<h1>name:"+data.name+"</h1>");
    				main_section.append("<p>datum:"+data.date+"</p>");
    				main_section.append("<p>plats:"+data.location+"</p>");
    				main_section.append("<p>event-type:"+data.event_cat+"</p>");
    			})
   			}

   		
    });



});

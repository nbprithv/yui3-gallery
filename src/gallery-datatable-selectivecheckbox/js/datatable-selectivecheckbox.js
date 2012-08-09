function _dtSelectiveCheckbox(config) {
	_dtSelectiveCheckbox.superclass.constructor.apply(this, arguments);
}
/*
	Formatter function for the checkbox column
	{   key:        'dtSelectiveCheckbox',
		allowHTML:  true, // to avoid HTML escaping
		label:      '<input type="checkbox" class="protocol-select-all" title="Toggle ALL records"/>',
		formatter:      dtSelectiveCheckboxFormatter,
		dtSelectiveCheckbox:{
			lColumn : 'pname',
			rData : 'FTP',
			condition : 'eq'
		}
	},
*/
function dtSelectiveCheckboxFormatter(o){
	if(o.column.dtSelectiveCheckbox){
		var scConfig = o.column.dtSelectiveCheckbox;
		var scCheckboxValue = '<input type="checkbox" class="protocol-select" title="Toggle ALL records"/>';
		var rCondition,lCondition;
		if(scConfig.lColumn){
			lCondition = o.data[scConfig.lColumn];
		}else if(scConfig.lData){
			lCondition = scConfig.lData;
		}
		if(scConfig.rColumn){
			rCondition = o.data[scConfig.rColumn];
		}else if(scConfig.rData){
			rCondition = scConfig.rData;
		}
		switch (scConfig.condition){
			case "gt":
				if(rCondition > lCondition){
					o.value = scCheckboxValue;
				}
			break;
			case "lt":
				if(rCondition < lCondition){
					o.value = scCheckboxValue;
				}
			break;
			case "eq":
				if(rCondition == lCondition){
					o.value = scCheckboxValue;
				}
			break;
		}
	}
}
Y.mix(_dtSelectiveCheckbox, {
	NS: "selectivecheckbox",
	NAME: "dataTableSelectiveCheckbox",
});
Y.extend(_dtSelectiveCheckbox,Y.Plugin.Base,{
	initializer: function(config){
		var dt = config.host;
	},
	selectAllCheckBox : function(){
	},
	getSelected : function(){
	}
});
Y.namespace("Plugin");
Y.Plugin.DataTableSelectiveCheckbox = _dtSelectiveCheckbox;


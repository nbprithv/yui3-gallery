function _dtSelectiveCheckbox(config) {
		_dtSelectiveCheckbox.superclass.constructor.apply(this, arguments);
	}
	Y.namespace("Plugin");
	var checkboxCount=0;
	var checkboxSelectedCount=0;
	var _dtSelectiveCheckboxFormatter = function (o){
		if(o.column.dtSelectiveCheckbox){
			var scConfig = o.column.dtSelectiveCheckbox;
			var scCheckboxValue = '<input type="checkbox" class="protocol-select" title="Toggle ALL records"/>';
			var rCondition,lCondition;
			if((!scConfig.lColumn && !scConfig.lData) || (!scConfig.rColumn && !scConfig.rData)){
				o.value = scCheckboxValue;
			}else{
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
					default:
					o.value = scCheckboxValue;
					break;
				}
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
			dt.after('init',function(e){
			});
			dt.after('render',function(e){
				var i=0;
				while(this.getRow(i)){
					var currentRow = this.getRow(i);
					var currentRecordId = currentRow.get('id');
					var currentRecord = this.getRecord(currentRecordId);
					var childNodes = currentRow.get('childNodes');
					childNodes.each(function(node){
						if(node.hasClass('yui3-datatable-col-dtSelectiveCheckbox') && node.hasChildNodes()){
							var domNode = node.getDOMNode();
							var checkbox = node.get('childNodes').pop();
							if(currentRecord.get('select') && checkbox.get('type') == 'checkbox'){
								checkbox.setAttribute('checked','checked');	
								checkboxSelectedCount++;
								checkboxCount++;
							}else if(checkbox.get('type') == 'checkbox'){
								checkboxCount++;
							}
						}
					});
					i++;
				}	
				if(checkboxCount == checkboxSelectedCount)
				Y.one('#dtSelectiveCheckbox-all').setAttribute('checked','checked');	
				});
			dt.delegate("click", function(e){
				var checked = e.target.checked || false;
				this.getRecord(e.target).set('select',checked);
				e.target.checked = checked;
			},".yui3-datatable-data .yui3-datatable-col-dtSelectiveCheckbox input", dt);
			dt.delegate("click", function(e){
				var i=0;
				var selectAllCheckBoxStatus = document.getElementById('dtSelectiveCheckbox-all').checked;
				while(this.getRow(i)){
					var currentRow = this.getRow(i);
					var currentRecordId = currentRow.get('id');
					var currentRecord = this.getRecord(currentRecordId);
					var childNodes = currentRow.get('childNodes');
					childNodes.each(function(node){
						if(node.hasClass('yui3-datatable-col-dtSelectiveCheckbox') && node.hasChildNodes()){
							var domNode = node.getDOMNode();
							var checkbox = node.get('childNodes').pop();
							if(checkbox.get('type') == 'checkbox'){
								if(selectAllCheckBoxStatus){
									checkbox.setAttribute('checked','true'); 
								}
								else{
									checkbox.removeAttribute('checked'); 
								}
							}
						}
					});
					i++;
				}
			},"#dtSelectiveCheckbox-all", dt);
		},
		selectAllCheckBox : function(){
		},
		getSelected : function(){
		}
	});
	Y.Plugin.DataTableSelectiveCheckbox = _dtSelectiveCheckbox;
	Y.Plugin.DataTableSelectiveCheckboxFormatter = _dtSelectiveCheckboxFormatter;

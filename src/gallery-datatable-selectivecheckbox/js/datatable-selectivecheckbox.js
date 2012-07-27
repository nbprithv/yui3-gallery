/*
* This wrapper code is added by the build system.
* It's only here for informational purposes.
*/
YUI.add('gallery-datatable-selectivecheckbox', function(Y) {
	Y.namespace('DataTableSelectiveCheckbox');
	function DataTableSelectiveCheckbox(config) {
		DataTableSelectiveCheckbox.superclass.constructor.apply(this, arguments);
	}
	Y.mix(DataTableSelectiveCheckbox,{
		NAME : 'dataTableSelectiveCheckbox',
		NS : 'selectivecheckbox',
		ATTRS : {
			lColumn : '',
			rColumn : '',
			condition : 'eq'
		}
	});
	DataTableSelectiveCheckbox =  {
			init : function(o){
				if(o.column.dtSelectiveCheckbox){
					var lColumn = o.column.dtSelectiveCheckbox.lColumn;
					console.log(o.column.dtSelectiveCheckbox);
					console.log(o.data[lColumn]);
				}
			},
			selectAllCheckBox : function(){
			},
			getSelected : function(){
			}
	};
	Y.DataTableSelectiveCheckbox = DataTableSelectiveCheckbox;
},'1.0.0',{requires:['datatable','node','event']});

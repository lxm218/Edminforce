/**
 * Created  on 3/19/16.
 */
DefaultRoutes.route('/test/picker', {
	name: "home",
	action: function(p) {
		App.render(p, {
			pageTitle: "test",
			headerNav: null,
			bodyTmpl: <UI.PickerTest/>
		})
	}
})


UI.PickerTest = React.createClass({


	getInitialState: function() {

		return{
			value1:'',
			value2:'',
			value3:''
		}
	},

	//管理变化的依赖性?  跟新cols?
	onChange(picker, value, displayValue){



	},

	updateValue(){ //新的数值  表单更新?


	},

	render() {

		let cols = [
			{
				textAlign: 'center',
				values: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
				//如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
			},
			{
				textAlign: 'center',
				values: ['杰伦', '磊', '明', '小鹏', '燕姿', '菲菲', 'Baby']
			},
			{
				textAlign: 'center',
				values: ['先生', '小姐']
			}
		]

		let initValue = ['赵','菲菲','小姐']



		return <div>



			{
				//<UI.Portal portalId="aaa">
				//
				//	<RC.BackDropArea style={{zIndex:999999999}}>
				//		fsdafasdfsdsdsd
				//	</RC.BackDropArea>
				//
				//</UI.Portal>
				//<UI.Portal2>
				//
				//</UI.Portal2>

			}




			<br/><br/><br/>


			<UI.Picker
				readonly={true}
				cols={cols}
				initValue={initValue}
				onChange={this.onChange}
			/>

			<br/><br/><br/>


			<UI.Picker
				readonly={true}
				cols={cols}
				initValue={initValue}
				onChange={this.onChange}
			/>

			<br/><br/><br/>

			<UI.PickerCity
				citiesData={UI.rawCitiesData}
			/>




			<UI.PickerDate />


		</div>

	}
})
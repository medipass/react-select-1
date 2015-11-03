import React from 'react';
import Select from 'react-select';

var CONTRIBUTORS = require('../data/contributors');

var Contributors = React.createClass({
	displayName: 'Contributors',
	propTypes: {
		hint: React.PropTypes.string,
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			value: 'jedwatson',
		};
	},
	onChange (value) {
		this.setState({
			value: value
		});
	},
	getOptions (input, callback) {
		input = input.toLowerCase();
		var options = CONTRIBUTORS.filter(i => {
			return i.github.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, 5),
			complete: options.length <= 5,
		};
		setTimeout(function() {
			console.log(data);
			callback(null, data);
		}, 500);
	},
	renderHint () {
		if (!this.props.hint) return null;
		return (
			<div className="hint">{this.props.hint}</div>
		);
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select.Async multi value={this.state.value} onChange={this.onChange} valueKey="github" labelKey="name" getOptions={this.getOptions} />
				{this.renderHint()}
			</div>
		);
	}
});

module.exports = Contributors;
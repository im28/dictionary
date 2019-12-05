import React, { Component } from 'react';
import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	Platform
} from 'react-native';

const { width } = Dimensions.get('window');

class List extends Component {

	render() {
		const {text} = this.props;

		return (
			<View style={styles.container}>
				<View style={styles.column}>
					<Text
						style={[styles.text]}>
					{text}
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: width - 50,
		flexDirection: 'row',
		padding:5,
		borderRadius: 5,
		backgroundColor: 'white',
		height: "auto",
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 5,
		marginBottom: 10,
		...Platform.select({
			ios: {
				shadowColor: 'rgb(50,50,50)',
				shadowOpacity: 0.8,
				shadowRadius: 2,
				shadowOffset: {
					height: 2,
					width: 0
				}
			},
			android: {
				elevation: 5
			}
		})
	},
	column: {
		flexDirection: 'row',
		padding:10,
	},
	text: {
		fontWeight: '500',
		fontSize: 22,
		marginVertical: 15,
		color:'#36b5b0'
	},
});

export default List;

import React, { Component } from "react";
import ReactDOM from "react-dom";
class Header extends React.Component {
	render() {
		return ( <header className="p-3 rows">
			<img className="col-1" src="https://cdn.rawgit.com/Deftwun/e3756a8b518cbb354425/raw/6584db8babd6cbc4ecb35ed36f0d184a506b979e/free-code-camp-logo.svg"/>FreeCodeCamp Camper List
		</header> );
	}
}

class App extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			users: [],
			mounted: null
		};
		this.onClick = this
			.onClick
			.bind( this );
	}
	onClick( event ) {

		var users = this.state.users;
		var id = event.target.id;
		if ( id == "recent" ) {
			users.sort( function ( a, b ) {

				return b.recent - a.recent;
			} );

			this.setState( { users: users } );
		}

		if ( id == "alltime" ) {
			users.sort( function ( a, b ) {

				return b.alltime - a.alltime;
			} );

			this.setState( { users: users } );
		} else {
			return;
		}

	}
	componentDidMount() {
		this.setState( { mounted: true } );
		$.ajax( {
			dataType: "json",
			url: "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
			success: function ( data ) {
				this.setState( { users: data } );
			}.bind( this )
		} );
	}

	render() {
		return ( <section className="container">
			<Header/>
			<table>
				<tr>
					<th>#</th>
					<th>Campername</th>
					<th onClick={this.onClick} id="recent">
						Points in past 30 days
						<i className="fas fa-arrow-down"/>
					</th>
					<th onClick={this.onClick} id="alltime">
						All time points
						<i className="fas fa-arrow-down"/>
					</th>
				</tr>
				{
					this
						.state
						.users
						.map( function ( user, i ) {
							const num = i + 1;
							const username = user.username;
							const img = user.img;
							const alltime = user.alltime;
							const recent = user.recent;
							return ( <tr>
								<th>{num}</th>
								<th><img src={img} style={{
									width: 25
								}}/>{username}
								</th>
								<th>{recent}</th>
								<th>{alltime}</th>
							</tr> );
						} )
				}
			</table>
		</section> );
	}
	componentWillUnmount() {
		this.setState( { mounted: false } );
	}
}

export default App;
ReactDOM.render( <App/>, document.getElementById( "root" ) );

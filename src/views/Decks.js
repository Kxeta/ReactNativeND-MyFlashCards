import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
import * as DecksActions from '../actions/deck';



class Decks extends Component {

  componentDidMount() {
    this.props.fetchDecks();
  }

  render(){
    const isEmpty = this.props.decks.deckList && this.props.decks.deckList.length === 0;
    return (
      <View style={{flex: 1, justifyContent: !isEmpty ? "flex-start" : "center"}}>
      {this.props.decks.isLoading
      ? <Text> Loading ...</Text>
      :
        this.props.decks.deckList && this.props.decks.deckList.length ? 
        this.props.decks.deckList.map((deck,key) => 
        <Text key={key}>{deck.name}</Text>
        )
        :
          <Text style={{textAlign: "center"}}>You don't have a deck yet... How about creating one on the next tab?</Text>
      }
      </View>
    );
  }
}

const mapStateToProps = decks => ({
  decks: decks.decks
});
const mapDispatchToProps = dispatch =>bindActionCreators(
  {
    fetchDecks: DecksActions.fetchDecks,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks);
